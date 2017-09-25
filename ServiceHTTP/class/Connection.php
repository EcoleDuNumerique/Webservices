<?php 
class Connection {

    static $connection = null;
    private $pdo;

    private function __construct(){
        $this->pdo = new PDO(
            "mysql:host=localhost;dbname=courwebservice",
            "root",
            "root"
        );
    }

    static function getConnection(){
        if(!self::$connection)
            self::$connection = new Connection();

        return self::$connection;
    }

    function getPdo(){
        return $this->pdo;
    }

}