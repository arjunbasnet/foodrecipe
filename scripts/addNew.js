$(document).ready(function(){
    
    //submitting records to server
    
    $("#newRecordType").change(function(){
        
        newType=$("#newRecordType option:selected").val();
        disableIngredientsList(newType);
        
    });
    
    function disableIngredientsList(newType) {
        if (newType=="receipe") {
            $("#ingredientsList").addClass("enabled");
             $("#ingredientsList").removeClass("disabled");
        }
        else{
            $("#ingredientsList").removeClass("enabled");
            $("#ingredientsList").addClass("disabled");
        }
    }
    
    //submits records to server
    $("#submitRecordBtn").click(function(e){
        e.preventDefault();
        var name=$("#name").val();
        var description=$("#description").val();
        var newType=$("#newRecordType option:selected").val()
        
        //ajax for adding receipes
        if (newType=="receipe") {
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
                    data:{type:newType,action:"add", records:{name:name,description:description,ingredients:ingredients}},
                    success:function(){
                        console.log("Data successfully added");   
                    }
                });
        }
        
        //default ajax is for adding ingredients
        $.ajax({
                    url:"addeditFunctions.php",
                    type:"post",
                    data:{type:newType,action:"add", records:{name:name,description:description}},
                    success:function(){
                        console.log("Data successfully added");   
                    }
            });
        
    });
    
    //fetching ingredients
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
                  
                  //removes ingredient from list
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
                  
                })
                
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
                  console.log("end of array reached");
                }
                else{
                  navigate(endIngredients,endIngredients+6);
                }
                
              });
              
              //prev buttons function for pagination
              prevBtn.click(function(){
                if (startIngredients==0) {
                  console.log("first index of array reached");
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
    
})