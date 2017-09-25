<?php 
//Autorise certains sites (ici tous) à faire des requêtes cross domain
header("Access-Control-Allow-Origin: *"); 

require "flight/Flight.php"; 
require "autoload.php";

Flight::route("/api", function(){

    $festival_id = $_GET["festival_id"];

    $festivals = 
    [
        "0" => [
            "name" => "Electrobeach",
            "lat" => 1.5213,
            "lng" => 2.563
        ],
        "1" => [
            "name" => "Hellfest",
            "lat" => 3.4813,
            "lng" => 12.147
        ],
    ];

    echo json_encode( $festivals[ $festival_id ] ); //transforme une variable en json

});

Flight::route("/api/departements", function(){

    $pdo = new PDO( 
        "mysql:host=localhost;dbname=courwebservice",
        "root",
        "root"
    );

    $query = "SELECT DISTINCT ville_departement FROM villes_france_free";
    $result = $pdo->query( $query );

    $departments = $result->fetchAll(PDO::FETCH_COLUMN);
    
    echo json_encode( $departments );

});

Flight::route("/api/ville", function(){

    $departement_id = Flight::request()->query["departement_id"];

    $pdo = new PDO( 
        "mysql:host=localhost;dbname=courwebservice",
        "root",
        "root"
    );

    $query = 
        "SELECT ville_id, ville_nom
        FROM villes_france_free 
        WHERE ville_departement=:departement_id
        ORDER BY ville_nom_reel";

    $prep = $pdo->prepare( $query );
    $prep->execute( [
        "departement_id" => $departement_id
    ] );

    $result = $prep->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode( $result );

});

/*
Flight::route("/user/login", function(){

    $username = Flight::request()->query["username"];
    $password = Flight::request()->query["password"];

    $user = new User();
    $user->setUsername( $username );
    $user->setPassword( $password );

    $bddManager = new BddManager();
    $repo = $bddManager->getUserRepository();
    $findedUser = $repo->getUserByUsername( $user );

    $status = [
        "success" => "",
        "error" => "",
        "user" => ""
    ];

    if( $findedUser == false ){
        $status["success"] = false;
        $status["error"] = "Identifiant incorrect";
    }
    else if( $findedUser->getPassword() != $user->getPassword() ){
        $status["success"] = false;
        $status["error"] = "Mot de passe incorrect";
    }
    else {
        $status["success"] = true;
        $status["user"] = $findedUser;
    }

    echo json_encode( $status );

});
*/

Flight::route("POST /user/login", function(){

    $username = Flight::request()->data["username"]; //$_POST["username"]
    $password = Flight::request()->data["password"]; //$_POST["password"]

    $pdo = new PDO( 
        "mysql:host=localhost;dbname=courwebservice",
        "root",
        "root"
    );

    $query = "SELECT * FROM users WHERE username=:username";
    $prep = $pdo->prepare( $query );
    $prep->execute([
        "username" => $username
    ]);
    $result = $prep->fetch( PDO::FETCH_ASSOC );//soit tableau soit false
    
    $status = [
        "success" => false,
        "errors" => [],
        "user" => []
    ];

    if( $result == false ){
        $status["success"] = false;
        $status["errors"] = "Utilisateur non trouvé";
    }
    else if( $password != $result["password"]){
        $status["success"] = false;
        $status["errors"] = "Mot de passe incorrect";
    }
    else {
        $status["success"] = true;
        $status["user"] = $result;
    }

    echo json_encode( $status );

});

Flight::route("/user/signup", function(){

});

Flight::start();