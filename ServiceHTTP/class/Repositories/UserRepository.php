<?php 
class UserRepository extends Repository {

    function getUserByUsername( User $user ){

        $query = "SELECT * FROM users WHERE username=:username";

        $req = $this->connection->prepare( $query );
        $req->execute( [
            "username" => $user->getUsername()
        ] );

        $result = $req->fetch(PDO::FETCH_ASSOC);
        
        if( empty( $result ) ){
            return false;
        }
        else {
            return new User( $result );
        }

    }

}