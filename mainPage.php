<!DOCTYPE html>
<head>
    <title>Food Receipes</title>
    <link rel="stylesheet" href="css/mainPage.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <script src="scripts/mainPage.js"></script>
</head>
<body>
<?php
session_start();
if(isset($_SESSION['user'])){
	$usr=$_SESSION['user'];
	$_SESSION['lastactive']=time();
}
else{
	header('Location:index.php');
}
?>
    <div class="wrapper">
        <div class="header">
			<h3>Welcome <? echo $usr ?>&nbsp;&nbsp;&nbsp;<label id="logout"><a href="mainPage.php?logout">Log Out</a></label></h3>
		</div>
        <div class="main-content">
            <div class="tabs-title"></div>
            <div class="tabs-menu">
                <ul>
                    <li class="fa fa-list-ul" id="listRecipes"></li>
                    <li class="fa fa-pencil-square" id="addNew"></li>
                </ul>
            </div>
            <div class="tabs-container">
                
            </div>
        </div>
    </div>
<?php
if(isset($_GET['logout'])){
	session_destroy();
	session_unset();
	header("Location: index.php");
}
if(isset($_POST['active'])){
	$_SESSION['lastactive']=time();
	unset($_POST['active']);
}
elseif(isset($_SESSION['lastactive']) &&(time()-$_SESSION['lastactive']>900)){
	session_unset();
	session_destroy();
}
?>
</body>
</html>