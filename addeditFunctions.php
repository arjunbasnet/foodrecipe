<?php
    require "functions.php";
    require_once('FirePHPCore/FirePHP.class.php');
    ob_start();
    $firephp =FirePHP::getInstance(true);
    $var = "Hello there";
 
    $firephp->log($var);
   
    $type=$_POST['type'];
    $action=$_POST['action'];
    $data=$_POST['records'];
    $firephp->log($type." : ".$action);
    $firephp->log($data,"array"); 
    if($type=="ingredient" && $action=="add"){
        addNewIngredient($data);
    }
    elseif($type=="ingredient" && $action=="update"){
        updateIngredientWithId($data);
    }
    elseif($type=="receipe" && $action=="add"){
        $firephp->log("this if condition is met");
        addNewReceipe($data);

    }
    elseif($type=="receipe" && $action=="update"){
        updateReceipeWithId($data);
    }
    
    //functions handling adding records to databases and updating exsisting records
    function addNewIngredient($data){
        $query='INSERT INTO ingredients (ingredient_name, ingredient_description) VALUES ("'.$data["name"].'","'.$data["description"].'")';
        addeditWithQuery($query);
    }
    
    function updateIngredientWithId($data){
        $query="UPDATE ingredients SET ingredient_name=".$data['name'].", ingredient_description".$data['description']." WHERE ingredient_id=".$data['id'];
        addeditWithQuery($query);
    }
    
    function addNewReceipe($data){
        $firephp =FirePHP::getInstance(true);
        $firephp->log("I am called");
        $query='INSERT INTO receipes (receipe_title, receipe_description) VALUES ("'.$data["name"].'","'.$data["description"].'")';
        $currentReceipeId=addeditWithQuery($query); //insert records into receipes table and gets id of recent added record
        $length =count($data['ingredients']);
        if($length!=0){
            for($i=0;$i<$length;$i++){
                $query='INSERT INTO receipes_ingredients_refs (receipe_fid,ingredient_fid) VALUES("'.$currentReceipeId.'","'.$data["ingredients"][$i]["id"].'")';
                addeditWithQuery($query);
            }
        }
    }
    
    function updateReceipeWithId($data){
        $query="UPDATE ingredients SET ingredient_name=".$data['name'].", ingredient_description".$data['description']." WHERE ingredient_id=".$data['id'];
        addeditWithQuery($query);
        
        $length =count($data['ingredients']);
        
        if($length!=0){
            for($i=0;$i<$length;$i++){
                $query='INSERT INTO receipes_ingredients_refs (receipe_fid,ingredient_fid) VALUES("'.$data['id'].'","'.$data["ingredients"][$i]["id"].'")';
                if(recipeHasIngredients($data['id'],$data["ingredients"][$i]["id"])==false){
                    addeditWithQuery($query);
                }
            
            }
        }
        
        removeNonExistanceIngredients($data);
    }
    
    function recipeHasIngredients($recipeId,$ingredientId){
        $query="SELECT * FROM receipes_ingredients_refs WHERE receipe_fid=".$recipeId;
        $result=fetchWithQuery($query);
        while($row=mysqli_fetch_assoc($result)){
            if($row['ingredient_fid']==$ingredientId){
                return true;
            }
        }
        return false;
    }
    
    //removes ingredients removed by users
    function removeNonExistanceIngredients($data){
        
        $query="SELECT * FROM receipes_ingredients_refs WHERE receipe_fid=".$data['id'];
        $result=fetchWithQuery($query);
        
        while($row=mysqli_fetch_assoc($result)){
            
            if(clientHasIngredients($row['ingredient_fid'],$data)==false){
                $deleteQuery="DELETE FROM receipes_ingredients_refs WHERE refs_id=".$row['refs_id'];
                deleteWithQuery($deleteQuery);
                //echo $row['ingredient_fid']."needs to be deleted";
            }
        }
        
       
        
    }
    
    function clientHasIngredients($serverIngredientsId,$data){
        $length =count($data['ingredients']);
        for($i=0;$i<$length;$i++){
            //var_dump($row['ingredient_fid']);
            //var_dump($data["ingredients"][$i]["id"]);
            if($data["ingredients"][$i]["id"]===$serverIngredientsId){
                //do nothing
                return true;
            }
            
        }
        return false;
    }
    

?>