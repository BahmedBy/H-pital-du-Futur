$(document).ready(function () {
    $("#ajoute").click( function (){
        $("#origincotent").hide();
        $("#AjoutePersone").append('  <div>\n' +
            '<p class="h4" id="Membrepages"><span class="fas fa-arrow-left mr-3"></span>Membre pages</p><br/>\n' +
            '</div>\n' +
            '<form class="shadow  my-auto bg-white divcontenu" action="AdminAjouteMembre" method="post" enctype="multipart/form-data">\n' +
            '            <p class="h4"> Ajoute Membre</p><br/>\n' +
            '            <div class="form-group row">\n' +
            '                <label for="inputEmail3" class="col-sm-2 col-form-label">Nom</label>\n' +
            '                <div class="col">\n' +
            '                    <input type="text" class="form-control" id="inputEmail3" placeholder="Nom" name="nom" required>\n' +
            '                </div>\n' +
            '                <label for="inputEmail3" class="col-sm-1 col-form-label">Preom</label>\n' +
            '                <div class="col">\n' +
            '                    <input type="text" class="form-control" placeholder="Preom" name="prenom" required>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="form-group row">\n' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Email</label>\n' +
            '                <div class="col-sm-10">\n' +
            '                    <input type="Email" class="form-control" id="inputPassword3" placeholder="Email@a.com" name="email" required>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="form-group row">\n' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Telphone Numbre</label>\n' +
            '                <div class="col-sm-10">\n' +
            '                    <input type="number" class="form-control" placeholder="Telphone Numbre" name="telNumbre">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="form-group row">\n' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Date de naissance</label>\n' +
            '                <div class="col-sm-10">\n' +
            '                    <input type="date" class="form-control" id="DatedeNai" required placeholder="Date de naissance"\n' +
            '                           name="DatedeNai">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div id="divTypeUser" class="form-group row">\n' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Gender</label>\n' +
            '                <div class="col">\n' +
            '                    <select class="form-control" name="gender">\n' +
            '                        <option value="Male">Male</option>\n' +
            '                        <option value="Femme">Femme</option>\n' +
            '                    </select>\n' +
            '                </div>\n' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Type</label>\n' +
            '                <div class="col">\n' +
            '                    <select class="form-control" id="TypeUser" name="typeUser">\n' +
            '                        <option value="ChefService">Chef Service</option>\n' +
            '                        <option value="Medecin">Medecin</option>\n' +
            '                        <option value="Infermiere">Infermiere</option>\n' +
            '                    </select>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="input-group mb-3 row">\n' +
            '                <label class="col-sm-2 col-form-label">Photo</label>\n' +
            '                <div class="custom-file">\n' +
            '                    <input type="file" class="custom-file-input" name="photo">\n' +
            '                    <label class="custom-file-label ">Choose Photo</label>\n' +
            '                </div>\n' +
            '                <div class="input-group-prepend">\n' +
            '                    <span class="input-group-text fas fa-file-upload"></span>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="form-group formstyle">\n' +
            '                <input class="btn btn-success float-right" type="submit" value="Ajoute" name="submit">\n' +
            '            </div>\n' +
            '        </form></div>');
        $("#Membrepages").click(function (){
            $("#AjoutePersone").empty();
            $("#origincotent").show();
        });
      DatedeNai();

        $("#TypeUser").change(
            function () {

                var value = $(this).val();
                if (value == "Medecin") {
                    $("#divTypeUser").after('<div class="form-group row" id="Sepciality" name="Sepciality"><label for="inputPassword3" class="col-sm-2 col-form-label">Sepciality</label><div class="col-sm-10"><input type="text" class="form-control"  id="DatedeNai" placeholder="Sepciality" name="Sepciality"></div></div>')
                } else {
                    $("#Sepciality").remove();
                }
            }
        );
    });
    $("#selector").change(function () {
        $("#type").empty();
        if ($(this).val() == "id") {

            $("#type").append('<div class="col"><label for="id" class="col-form-label float-left ">Id:</label></div><div class="col"><input type="text" name="id" id="id" class="form-control mb-2 mr-sm-2"></div></div>');
        }
        else {
            $("#type").append('<div class="col"><label for="id" class="col-form-label float-left ">nom:</label></div><div class="col"><input type="text" name="nom" id="id" class="form-control mb-2 mr-sm-2"></div><div class="col"><label for="id" class="col-form-label float-left ">prenom:</label></div><div class="col"> <input type="text" name="prenom" id="id" class="form-control mb-2 mr-sm-2"></div>');
        }

    });
    $("#obtenirCS").click( function (){
        var type=$(this).val();
       getPersoneMedical(type)});
    $("#obtenirM").click( function (){
    var type=$(this).val();
    getPersoneMedical(type)});

    $("#obtenirI").click( function (){ var type=$(this).val();

 getPersoneMedical(type)});

});

function DatedeNai() {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var maxDate = year + '-' + month + '-' + day;
    $('#DatedeNai').attr('max', maxDate);
}
function getPersoneMedical(type) {
    var id = "#" + type;
    $.ajax({
        url: "/personeMedical",
        data: {
            "type": type,
        },
        beforeSend:function(){
            $(id).empty();
            $(id).append('<div class="divanimation"><p class="h4">List'+type+'</p><div class="mainAnimation">' +
                '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
        },
        success: function (data) {
            $(id).empty();
            if (jQuery.isEmptyObject(data)) {
                $(id).append('<div class="divanimation"><p class="h4">List'+type+'</p><div class="mainAnimation">'+
                    '<p class="h5 text-center">No chef service dans l\'hopitel</p>'+
                    '</div>')
            }
            else {
                var add='<p class="h4">List chef service</p><table class="table table-hover rounded my-5 shadow-sm table-borderedless" id="table" >' +
                    '<tr >' +
                    '<th style="width: 10%">#</th>' +
                    '<th style="width: 15%">Id</th>' +
                    '<th style="width: 15%">Photo</th>' +
                    '<th>nom</th>' +
                    '<th>Prenom</th>';
                if (type==="Medecin")
                    add=add+'<th>sepiciality</th>';
                add=add+'</tr>'

                var co=1;
            $.each(data, function (k, v) {
                 add= add+' <tr data-value="'+v.id+'" >' +
                    '<td class="align-middle ">'+co+'</td>' +
                    '<td class="align-middle ">'+v.id+'</td>' +
                    '<td class="align-middle "><img src="'+v.photo+'" width="50" height="50"  class="rounded-circle  shadow-sm"></td>' +
                    '<td class="align-middle " >'+v.nom+'</td>' +
                    '<td class="align-middle ">'+v.prenom+'</td>';
                    if (type==="Medecin")
                    add=add+' <td class="align-middle ">'+v.speiciality+'</td>';
                add=add+'</tr>';
                co++;
            }
            );

            add=add+'</table>';
                $(id).append(add)
                $('tr').click(function () {
                    alert($(this).data('value'));
                })
            }
        },
        error: function (e) {
            alert(e.responseText);
            console.log("ERROR: ", e);

        },
        done: function (e) {
            console.log("DONE");
        }
    })
}