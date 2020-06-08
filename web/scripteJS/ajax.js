
function getListChefServiceNotafict(){
  console.log("yes");
    $.ajax({
        url: "/chefserviceNotAficte",
        success: function (data) {
            $.each(data, function(k,v) {
               console.log("fff");
              $("#chefServiceLibre").append(
                  '<option>'+v+'</option>'
                );
            })
        },
        error : function(e) {
            alert(e.responseText);
            console.log("ERROR: ", e);

        },
        done : function(e) {
            console.log("DONE");
        }
    })}