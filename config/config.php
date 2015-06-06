<?php
function connect(){
	$con=mysqli_connect("localhost", "root", "", "receipes");
	if(!$con)
		die("Couldn't connect to mysql server");
	return($con);
}
function disconnect($con){
	mysqli_close($con);
}

?>