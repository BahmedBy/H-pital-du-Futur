$(document).ready(function () {
    $("#resultBlock").hide();
    $("#seconde").hide();

    $("#selector").change(function () {
        $("#type").empty();
        if ($(this).val() == "id") {

            $("#type").append('<div class="col"><label for="id" class="col-form-label float-left ">Id:</label></div><div class="col"><input type="text" name="id" id="id" class="form-control mb-2 mr-sm-2"></div></div>');
        }
        else {
            $("#type").append('<div class="col"><label for="id" class="col-form-label float-left ">nom:</label></div><div class="col"><input type="text" name="nom" id="nom" class="form-control mb-2 mr-sm-2"></div><div class="col"><label for="id" class="col-form-label float-left ">prenom:</label></div><div class="col"> <input type="text" name="prenom" id="prenom" class="form-control mb-2 mr-sm-2"></div>');
        }

    });

    $("#cherché").click(function () {
        var data;

        if ($("#selector").val() == "id")
        {
            data = {id: $("#id").val()}}
        else {
            data = {
                nom: $("#nom").val(),
                prenom: $("#prenom").val()
            }
        }
        getPatient("resultBlock", data);
    });
});
function affiche(id) {
    $("#first").hide();
    detailPartionChefService(id,"seconde");
}