<?php 
class BddManager {

    private $connection;
    private $userRepository;

    function __construct(){
        $this->connection = Connection::getConnection()->getPdo();
        $this->userRepository = new UserRepository( $this->connection );
    }

    function getUserRepository(){
        return $this->userRepository;
    }

    function setUserRepository( $repo ){
        $this->userRepository = $repo;
    }

    function getPdo(){
        return $this->con->getPdo();
    }

}