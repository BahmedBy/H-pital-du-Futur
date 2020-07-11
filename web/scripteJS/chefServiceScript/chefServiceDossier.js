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

        $("#ajouteDM").click(function () {
            $("#first").hide();
            $("#seconde").append('<div id="Ajoutee">' +
                '    <div>' +
                '      <p class="h4" id="backtofirst"><span class="fas fa-arrow-left mr-3"></span>Dossier Médical pages</p><br/>' +
                '    </div>' +
                '<form class="shadow  my-auto bg-white divcontenu" action="/AjoutePatient" enctype="multipart/form-data">' +
                '  <p class="h4" > Ajoute Patient</p><br/>' +
                '  <fieldset class="border formstyle" > ' +
                '       <p class="h4">Patient information</p> ' +
                '  <div class="form-group row">' +
                '    <label for="inputEmail3" class="col-sm-2 col-form-label" >Nom</label>' +
                '    <div class="col">' +
                '      <input type="text" class="form-control" id="inputEmail3" placeholder="Nom" name="Nom" required>' +
                '    </div>' +
                '     <label for="inputEmail3" class="col-sm-1 col-form-label" >Preom</label>' +
                '    <div class="col">' +
                '      <input type="text" class="form-control" id="inputEmail3" placeholder="Preom" name="Prenom" required>' +
                '    </div>' +
                '  </div>' +
                '    <div class="form-group row">' +
                '    <label for="inputPassword3" class="col-sm-2 col-form-label">Telphone Numbre</label>' +
                '    <div class="col-sm-10">' +
                '      <input type="number" class="form-control"  placeholder="Telphone Numbre" name="TelNumbre">' +
                '    </div>' +
                '  </div>' +
                '  <div class="form-group row">' +
                '    <label for="inputPassword3" class="col-sm-2 col-form-label">Date de naissance</label>' +
                '    <div class="col-sm-10">' +
                '      <input type="date" class="form-control"  id="DatedeNai" placeholder="Telphone Numbre" name="DatedeNai" required>' +
                '    </div>' +
                '  </div>' +
                '  <div  id="divTypeUser"  class="form-group row">' +
                '    <label for="inputPassword3" class="col-sm-2 col-form-label" required>Gender</label>' +
                '    <div class="col">' +
                '      <select  class="form-control" name="gender">' +
                '        <option value="Male">Male</option>' +
                '        <option value="Femme">Femme</option>' +
                '      </select>' +
                '    </div></div>' +
                '    <div class="form-group row">' +
                '      <div class="col col-form-label"><label for="inputPassword3" class="col- col-form-label">Cree Compte</label></div>' +
                '    <div class="custom-control custom-switch col col-form-label">' +
                '      <input type="checkbox" class="custom-control-input form-control" id="switch1" >' +
                '      <label class="custom-control-label col" for="switch1" id="switch1label">No</label>' +
                '  <input type="hidden" id="creatCompte" name="creatCompte" value="0">' +
                '    </div>' +
                '  </div>' +
                '  <div id="compte"></div>' +
                '      <div class="input-group mb-3 row">' +
                '  <label class="col-sm-2 col-form-label">Photo</label>' +
                '  <div class="custom-file">' +
                '    <input type="file" class="custom-file-input form-control" >' +
                '    <label class="custom-file-label " for="inputGroupFile01">Choose Photo</label>' +
                '  </div>' +
                '  <div class="input-group-prepend">' +
                '    <span class="input-group-text fas fa-file-upload"></span>' +
                '  </div>' +
                '</div></fieldset>' +
                '  <fieldset class="border formstyle" > ' +
                '       <p class="h4">Dossier Médical information</p> ' +
                '  <div class="form-group row">' +
                '    <label for="inputPassword3" class="col-sm-2 col-form-label" >Groupage</label>' +
                '   <div class="col">' +
                '      <select  class="form-control" name="groupage" required>' +
                '        <option value="O+">O<sup>+</sup></option>' +
                '        <option value="O-">O<sup>-</sup></option>' +
                '        <option value="A+">A<sup>+</sup></option>' +
                '        <option value="A-">A<sup>-</sup></option>' +
                '        <option value="B+">B<sup>+</sup></option>' +
                '        <option value="B-">B<sup>-</sup></option>' +
                '        <option value="AB+">AB<sup>+</sup></option>' +
                '        <option value="AB-">AB<sup>-</sup></option>' +
                '      </select>' +
                '    </div>' +
                '  </div>' +
                '    ' +
                '     </fieldset>' +
                '       <div class="form-group row">' +
                '      <div class="col col-form-label"><label for="inputPassword3" class="col- col-form-label">Admis dane le service</label></div>' +
                '    <div class="custom-control custom-switch col col-form-label">' +
                '      <input type="checkbox" class="custom-control-input form-control" id="switch2" name="Admistoin">' +
                '      <label class="custom-control-label col" for="switch2" id="switch2label">No</label>' +
                '  <input type="hidden" id="isAdmistoin" name="isAdmistoin" value="0">' +
                '    </div>' +
                '  </div>' +
                '  <fieldset class="border formstyle" id="Admistoin">' +
                '  </fieldset>' +
                '<div class="form-group formstyle">' +
                '      <input class="btn btn-success float-right" type="submit" value="Ajoute" name="submit">' +
                '      </div>' +
                '</form>' +
                '' +
                '</div>');
            $('#Admistoin').hide();
            $("#seconde").show();
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
            $("#backtofirst").click(function () {
                backtofirst(1);
            });
            $('#switch2').change(function () {
                if (this.checked) {
                    getChembreLibre("#Admistoin");
                    $('#Admistoin').show();
                    $('#switch2label').text("Oui");

                    $('#isAdmistoin').val("1");
                } else {
                    $('#Admistoin').hide();
                    $('#Admistoin').empty();
                    $('#switch2label').text("No");
                    $('#isAdmistoin').val("0");
                }
            })
            $('#switch1').change(function () {
                if (this.checked) {
                    $('#compte').append('<div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Email</label><div class="col-sm-10"><input type="Email" class="form-control" id="inputPassword3" placeholder="Email@a.com" name="email" required></div> </div>');
                    $('#switch1label').text("Oui");
                    $('#creatCompte').val("1");
                } else {
                    $('#compte').empty();
                    $('#switch1label').text("No");
                    $('#creatCompte').val("0");
                }
            })


        })
    }
);
function affiche(id) {
    $("#first").hide();
    detailPartionChefService(id,"seconde");
}