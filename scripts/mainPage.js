$(document).ready(function(){
    $(".tabs-container").load("listReceipes.html");
    
    $("#listRecipes").click(function(){
        $(".tabs-menu ul").addClass("active");
        $("#listRecipes").addClass("active");
        $("#addNew").removeClass("active");
        location.reload();
    });
    
    $("#addNew").click(function(){
      
      $("#addNew").addClass("active");
      $("#listRecipes").removeClass("active");
      $(".tabs-container").load("addNew.html");  
    })
})