<?php 
require "flight/Flight.php";

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

Flight::start();