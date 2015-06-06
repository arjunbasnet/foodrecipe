$(document).ready(function(){
  
  //modal window
  var modalWindow=$("#editRecipes").dialog({
                    autoOpen: false,
                    modal: true,
                    width:500,
                    resizable:false,
                    show: {
                        effect: "fadeIn",
                        duration: 500
                    },
                    hide: {
                      effect: "fadeOut",
                      duration: 500
                    }
    });
  
  var allRecipes=new Array(); //this holds all the information about receipes
  
  $.ajax({
        url:"fetchFunctions.php",
        data:{what:"recipes",how:"fetchAll"},
        type:'post',
        success:function(dataString){
            console.log(typeof(dataString));
            
            var data=JSON.parse(dataString);
            
            console.log(data);
            //to make things easier returned result is organized in an array for later use;
            var count=0,j=0;
            for(var i=0; i<data.length; i++){
                if (i>0) {
                    var prevRecipeId=data[i-1].receipe_id;
                    var currentRecipeId=data[i].receipe_id;
                    if (prevRecipeId==currentRecipeId) {
                        var ingrident={id:data[i].ingredient_id, name:data[i].ingredient_name};
                        allRecipes[j].ingredients.push(ingrident);
                    }
                    else{
                        j++;
                        allRecipes[j]={id:data[i].receipe_id, title: data[i].receipe_title, description: data[i].receipe_description, ingredients:[{id:data[i].ingredient_id, name:data[i].ingredient_name}]};
                        
                    }
                }
                else{
                    allRecipes[j]={id:data[i].receipe_id, title: data[i].receipe_title, description: data[i].receipe_description, ingredients:[{id:data[i].ingredient_id, name:data[i].ingredient_name}]};
                }
            }
            
            
            //this appends the results 
            console.log(allRecipes);
            for(var i=0; i<allRecipes.length; i++){
                var recipe=$('<div class="food-recipe">'
                                +'<div class="food-recipe-header"><span class="title">'+allRecipes[i].title+'</span><span class="buttons">'
                                +'<span class="hidden">'+allRecipes[i].id+'</span><button class="editBtn fa fa-pencil-square-o" style="font-size:18px"></button></span></div>'
                                +'<div class="food-recipe-content"><b>Description:  </b>'+allRecipes[i].description+'<ul class="ingredients"></ul>');
                var ingredients=allRecipes[i].ingredients;
                
                recipe.appendTo(".inner-container");
                
                if (ingredients[0].id!=null) {
                  
                  for(var j=0;j<ingredients.length;j++){
                    
                    var ingredient=$('<li>'+ingredients[j].name+'</li>');
                    $(".ingredients").last().append(ingredient);
                  
                  }
                }
            }
            
            //this buttons opens jQuery UI modal window for edit purpose
            $(".editBtn").click(function(){
              
              var recipeId=$(this).prev('span').html();
              
              //fetching all ingredients
              $.ajax({
                    url:"fetchFunctions.php",
                    type:"post",
                    data:{what:"ingredients",how:"fetchAll"},
                    success:function(dataString){
                      console.log(dataString);
                      var ingredients=JSON.parse(dataString);
                      console.log(ingredients);
                      
                      var tempIngredientsArray,startIngredients,endIngredients;
                      var prevBtn=$("#prevBtn");
                      var nextBtn=$("#nextBtn");
                      var ingredientsList=$("#selectIngredients");
                      
                      function navigate(start,end){
                        
                        startIngredients=start;
                        
                        if (ingredients.length<end) {
                          
                          end=ingredients.length;
                          endIngredients=ingredients.length;
                          tempIngredientsArray=ingredients.slice(start,end);
                          
                        }
                        else{
                          endIngredients=end;
                          
                          tempIngredientsArray=ingredients.slice(start,end);
                        }
                        
                        console.log(tempIngredientsArray);
                        console.log(typeof(tempIngredientsArray));
                        $("tr").remove(".trIngredients");
                        for(var i=0;i<tempIngredientsArray.length;i++){
                          
                          var ingredient=$('<tr class="trIngredients"><td class="hidden">'+tempIngredientsArray[i].ingredient_id+'</td>'
                                         +'<td>'+tempIngredientsArray[i].ingredient_name+'</td><td><a class="addBtn">ADD</a></td></tr>');
                          ingredient.appendTo(ingredientsList);                          
                        }
                        
                        //add buttons function for adding ingredients
                        $(".addBtn").click(function(){
                          
                          var addIngredients=$(this).parents("tr").clone();
                          addIngredients.removeClass();
                          addIngredients.find("a").removeClass("addBtn").addClass("removeBtn").html("Remove");
                          var id=addIngredients.find(".hidden").html();
                           
                          if (checkExistance(id)==false) {
                            addIngredients.appendTo("#selectedIngredients");
                          }
                          else{
                            alert("Ingredients already exists");
                          }
                          
                          //removes list from list
                          $(".removeBtn").click(function(){
                            
                            var selected=$("#selectedIngredients tr");
                            if (selected.length<3) {
                              alert("Don't try to delete all ingredients!");
                            }
                            else{
                              
                                $(this).parents("tr").remove();
                            }
                            
                            console.log($(this).parents("tr"));
                            
                          });
                          
                        });
                        
                        
                      }
                      
                      //functions to check existance of ids
                      function checkExistance(id) {
                        
                          var selectedIds=$("#selectedIngredients td.hidden");
                          console.log(selectedIds);
                          if(selectedIds.length!=0){
                            for(var k=0; k<selectedIds.length;k++){
                              
                              if (id==selectedIds[k].innerHTML) {
                                
                                   return true;
                              }
                            }
                            return false;
                          }
                          
                          return false;
                          
                      }
                      
                      //appends elements when modal window loads
                      navigate(0,6);
                      
                      //next buttons function for pagination
                      nextBtn.click(function(){
                        
                        if (endIngredients==ingredients.length) {
                          alert("end of array reached");
                        }
                        else{
                          navigate(endIngredients,endIngredients+6);
                        }
                        
                      });
                      
                      //prev buttons function for pagination
                      prevBtn.click(function(){
                        if (startIngredients==0) {
                          alert("first index of array reached");
                        }
                        else{
                          navigate(startIngredients-6,startIngredients);
                        }
                      });
                      
                      /*for(var i=0; i<ingredients.length;i++){
                        var ingredient=$('<tr><td class="hidden">'+ingredients[i].ingredient_id+'</td>'
                                         +'<td>'+ingredients[i].ingredient_name+'</td><td><a class="addBtn">ADD</a></td></tr>');
                        ingredient.appendTo("#selectIngredients");
                      }*/
                    }
                
                });
              
              //fetching specific recipe
              $.ajax({
                    url:"fetchFunctions.php",
                    type:"post",
                    data:{what:"recipes", how:"fetchBy",id:recipeId},
                    success:function(dataString){
                      var selectedRecipe=JSON.parse(dataString);
                      console.log(selectedRecipe);
                      $("tr").remove(".trSelected");
                      for(var i=0;i<selectedRecipe.length;i++){
                        
                        if(selectedRecipe[i].ingredient_id!=null){
                          var ingredient=$('<tr class="trSelected"><td class="hidden">'+selectedRecipe[i].ingredient_id+'</td>'
                                         +'<td>'+selectedRecipe[i].ingredient_name+'</td><td><a class="removeBtn">Remove</a></td></tr>');
                          ingredient.appendTo("#selectedIngredients");
                        }
                        if(i==0){
                          $("#name").val(selectedRecipe[0].receipe_title);
                          $("#description").val(selectedRecipe[0].receipe_description);
                        }
                      }
                      
                      //removes ingredients from selected list
                      $(".removeBtn").click(function(){
                        
                        var selected=$("#selectedIngredients tr");
                        if (selected.length<3) {
                          alert("Don't try to delete all ingredients!");
                        }
                        else{
                          
                            $(this).parents("tr").remove();
                        }
                        
                        console.log($(this).parents("tr"));
                        
                      });
                    }
              });
              
              
              
              //opens modal window with configuration specified in variable modalWindow
              modalWindow.dialog("open");
              
              //update records
              $("#updateRecordBtn").click(function(){
                
                var name=$("#name").val();
                var description=$("#description").val();
                if (name!=null) {
                    var selected=$("#selectedIngredients tr");
                    var n=0;
                    var ingredients=[];
                    for(var i=1;i<selected.length;i++){
                      ingredients[n]={
                                   id: selected[i].children[0].innerHTML,
                                   name: selected[i].children[1].innerHTML
                                   }
                       n++;
                    }
            
                    $.ajax({
                            url:"addeditFunctions.php",
                            type:"post",
                            data:{type:"receipe",action:"update", records:{id:recipeId,name:name,description:description,ingredients:ingredients}},
                            success:function(){
                                alet("Data successfully update");
                                location.reload();
                            }
                        });
                }
                else{
                  console.log("please enter name at");
                }
                
              
              });
              
            });
            
            //filter the displayed recipes by given name
            var filteredData=new Array();
            function filterRecipesByIngredient(name) {
                for (var i=0; i<allRecipes.length;i++) {
                    for(var j=0; j<allRecipes[i].ingredients.length;j++){
                        if (allRecipes[i].ingredients[j].name==name) {
                            filteredData.push(allRecipes[i]);
                        }
                    }
                }
            }
            
            filterRecipesByIngredient("sugar");
            console.log(filteredData);
        }
    });  
});