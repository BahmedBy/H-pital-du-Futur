  $(document).ready(function(){
    $("#AjoutePersone").hide();
    $("#Membrepages").click(function(){
      $("#origincotent").show();
      $("#AjoutePersone").hide();
    });
    
     $("#ajoute").click(function(){
      $("#origincotent").hide();
      $("#AjoutePersone").show();
    });
   $("#TypeUser").change(
    function(){

      var value=$(this).val();
      if (value=="Medcin") { 
       $("#divTypeUser").after('<div class="form-group row" id="Sepciality" name="Sepciality"><label for="inputPassword3" class="col-sm-2 col-form-label">Sepciality</label><div class="col-sm-10"><input type="text" class="form-control"  id="DatedeNai" placeholder="Sepciality" name="Sepciality"></div></div>')
      }else{
        $("#Sepciality").remove();
      }
    }
    );
  

    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
     
    var maxDate = year + '-' + month + '-' + day;  
    $('#DatedeNai').attr('max', maxDate);


    $("#selector").change(function(){
     $("#type").empty();
        if($(this).val()=="id"){
    
    $("#type").append('<div class="col"><label for="id" class="col-form-label float-left ">Id:</label></div><div class="col"><input type="text" name="id" id="id" class="form-control mb-2 mr-sm-2"></div></div>' );}
    else{
        $("#type").append('<div class="col"><label for="id" class="col-form-label float-left ">nom:</label></div><div class="col"><input type="text" name="nom" id="id" class="form-control mb-2 mr-sm-2"></div><div class="col"><label for="id" class="col-form-label float-left ">prenom:</label></div><div class="col"> <input type="text" name="prenom" id="id" class="form-control mb-2 mr-sm-2"></div>');
    }                 
      
                         });
});
 function DatedeNai (){
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;    
    $('#DatedeNai').attr('max', maxDate);
}
 function  getPersoneMedical(type) {
     $.ajax({
         url: "/chefserviceNotAficte",
         data:{
          "type":type,
         },
         success: function (data) {
             $.each(data, function(k,v) {
                 console.log("fff");

             })
         },
         error : function(e) {
             alert(e.responseText);
             console.log("ERROR: ", e);

         },
         done : function(e) {
             console.log("DONE");
         }
     })

 }