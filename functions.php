<?php
require_once('config/config.php');
require_once('FirePHPCore/FirePHP.class.php');
    ob_start();
	
	function fetchWithQuery($query){
         $con = connect();
         $result = mysqli_query($con, $query);
	 disconnect($con);
	return $result;
        }
        
    function selectUserWithUserName($username){
    	$query = "Select * from Users where Users.Users_name = '".$username."'";
    	$result = fetchWithQuery($query);
    	$rows = $result->num_rows;
    	if($rows == 0)
    		return false;
    	else 
    		return mysqli_fetch_assoc($result);
    }
    
    //user authentications
    function authenticateUser($username, $password){
    	$user = selectUserWithUserName($username);
    	if(!$user)
    		return false;
    	else if($user['Password'] != $password)
    		return false;	
    	return $user;
    }
    
	function addeditWithQuery($query){
	 $firephp=FirePHP::getInstance(true);
	 $con=connect();
	 $response=mysqli_query($con,$query);
	 //var_dump($con);
	 
	 if($response==true){
		  echo "Query was successful";
		  return mysqli_insert_id($con);
	 }
	 else{
		  echo "Something went wrong " + mysqli_error($con);
	 }
	 disconnect($con);
	}
	
	function deleteWithQuery($query){
	 
		  $con=connect();
		  
		  $response=mysqli_query($con,$query);
		  //var_dump($con);
		  
		  if($response==true){
			   echo "Query was successful";
		  }
		  else{
			   echo "Something went wrong " + mysqli_error($con);
		  }
	 }
    
?>