<?php
    require "functions.php";
    
    $what=$_POST['what'];
    $how=$_POST['how'];
    
    if($what=="recipes" && $how=="fetchAll"){
        
        getAllRecipes();
    }
    elseif($what=="recipes" && $how=="fetchBy"){
        
        $id=$_POST['id'];
        getSpecificRecipe($id);
    }
    elseif($what=="ingredients" && $how="fetchAll"){
        getAllIngredients();
    }

    
    function getAllRecipes(){
        $query="SELECT receps.receipe_id, receps.receipe_title, receps.receipe_description,ingrd.ingredient_id,ingrd.ingredient_name FROM"
        ."`receipes` AS receps LEFT JOIN `receipes_ingredients_refs` AS receps_ingrd ON receps.receipe_id=receps_ingrd.receipe_fid LEFT JOIN"
        . "`ingredients` AS ingrd ON receps_ingrd.ingredient_fid=ingrd.ingredient_id";
        $result=fetchWithQuery($query);
        $data=array();
        while($row=mysqli_fetch_assoc($result)){
            $data[]=$row;
        }
        
        echo json_encode($data);
    }
  
    
    function getSpecificRecipe($recipe){
        $query="SELECT receps.receipe_id, receps.receipe_title, receps.receipe_description,ingrd.ingredient_id,ingrd.ingredient_name "
        ."FROM `receipes` AS receps LEFT JOIN `receipes_ingredients_refs` AS receps_ingrd ON receps.receipe_id=receps_ingrd.receipe_fid LEFT JOIN"
        ."`ingredients` AS ingrd ON receps_ingrd.ingredient_fid=ingrd.ingredient_id WHERE receps.receipe_id=".$recipe;
    
        $result=fetchWithQuery($query);
        $data=array();
        while($row=mysqli_fetch_assoc($result)){
            $data[]=$row;
        }
        echo json_encode($data);
    }
    
    function getAllIngredients(){
        $query = "SELECT * FROM `ingredients`";
        
        $result=fetchWithQuery($query);
        $data=array();
        while($row=mysqli_fetch_assoc($result)){
            $data[]=$row;
        }
        echo json_encode($data);
    }
?>