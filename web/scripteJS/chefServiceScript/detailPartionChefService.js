function detailPartionChefService(idPation, divResulte) {
    var div = "#" + divResulte;
    var idDossier;
    var hospitalise;
    if (typeof idPation != "undefined")
        $.ajax({
            url: "/allPatientInformation",
            data: {id: idPation},
            beforeSend: function () {
                $(div).empty();

                $(div).append('<p class="h3 ">Dossier Médical Page</p><br />\n' +
                    '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
                $(div).show();

            },
            success: function (data) {

                var add = '<div class="divcontenu">\n' +
                    '          <p class="h4">Patient Information</p><br />\n' +
                    '          <div class="container divcontenu border">\n' +
                    '            <div class="row">\n' +
                    '              <div class="col-sm-3">\n' +
                    '                <img src="' + data.photo + '" alt="..." width="140"\n' +
                    '                  class="mr-3 rounded-circle img-thumbnail shadow-sm">\n' +
                    '              </div>\n' +
                    '              <div class="col">\n' +
                    '                <div class=" row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Id</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Id" value="' + data.id + '">\n' +
                    '                  </div>\n' +
                    '                </div>\n' +
                    '                <div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Nom</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Nom" value="' + data.nom + '">\n' +
                    '                  </div>\n' +
                    '                  <div class="col-sm-2">\n' +
                    '                    <button class="btn " name="edit" onclick="d(\'#Nom\')"><span class="fas fa-pen"></span></button>\n' +
                    '                  </div>\n' +
                    '                </div>\n' +
                    '                <div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Prenom</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Prenom" value="' + data.prenom + '">\n' +
                    '                  </div>\n' +
                    '                  <div class="col-sm-2">\n' +
                    '                    <button class="btn  " name="edit" onclick="d(\'#Prenom\')"><span class="fas fa-pen"></span></button>\n' +
                    '                  </div>\n' +
                    '                </div>';
                if (data.active === true)
                    add = add + '<div class="row">\n' +
                        '                  <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>\n' +
                        '                  <div class="col">\n' +
                        '                    <input type="text" readonly class="form-control-plaintext" id="Email" value="' + data.email + '">\n' +
                        '                  </div>\n' +
                        '                  <div class="col-sm-2">\n' +
                        '                    <button class="btn  " name="edit" onclick="d(\'#Email\')"><span class="fas fa-pen"></span></button>\n' +
                        '                  </div></div>';
                add = add + '<div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">numero Telephone</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="numeroTelephone"\n' +
                    '                      value="' + data.numeroTel + '"> </div>\n' +
                    '                  <div class="col-sm-2">\n' +
                    '                    <button class="btn  " name="edit" onclick="d(\'#numeroTelephone\')"><span class="fas fa-pen"></span></button>\n' +
                    '                  </div>\n' +
                    '                </div>\n' +
                    '                <div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">date de naissance</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="datedenaissance"\n' +
                    '                      value="' + data.dateNaissance + '"> </div>\n' +
                    '                  <div class="col-sm-2">\n' +
                    '                    <button class="btn  " name="edit" onclick="d(\'#datedenaissance\')"><span class="fas fa-pen"></span></button>\n' +
                    '                  </div>\n' +
                    '                </div>\n' +
                    '                <div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Gender</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Gender" value="' + data.gender + '">\n' +
                    '                  </div>\n' +
                    '                  <div class="col-sm-2">\n' +
                    '                    <button class="btn " name="edit" onclick="d(\'#Gender\')"><span class="fas fa-pen"></span></button>\n' +
                    '                  </div>\n' +
                    '                </div>\n' +
                    '              </div>\n' +
                    '            </div>\n' +
                    '          </div>\n' +
                    '          <div class="divcontenu border">\n' +
                    '            <p class="h5">Dossier Medical</p>\n' +
                    '            <div class="container">\n' +
                    '              <div class="row">\n' +
                    '                <label for="staticEmail" class="col-sm-3 col-form-label">Gropage</label>\n' +
                    '                <div class="col">\n' +
                    '                  <input type="text" readonly class="form-control-plaintext" id="datedenaissance"\n' +
                    '                    value="' + data.dossierMedical.groupage + '"> </div>\n' +
                    '                <div class="col-sm-2">\n' +
                    '                  <button class="btn  " name="edit" onclick="d(\'#datedenaissance\')"><span class="fas fa-pen"></span></button>\n' +
                    '                </div>\n' +
                    '              </div>\n' +
                    '              <div class="row">\n' +
                    '                <label for="staticEmail" class="col-sm-3 col-form-label">viver</label>\n' +
                    '                <div class="col">\n';
                var viver;
                idDossier = data.dossierMedical.id;
                if (data.dossierMedical.mort)
                    viver = "no";
                else
                    viver = "oui";
                add = add + '  <input type="text" readonly class="form-control-plaintext" id="datedenaissance"\n' +
                    '                    value="' + viver + '"> </div>\n' +
                    '                <div class="col-sm-2">\n' +
                    '                  <button class="btn " name="edit" onclick="d(\'#datedenaissance\')"><span class="fas fa-pen"></span></button>\n' +
                    '                </div>\n' +
                    '              </div>\n' +
                    '            </div>\n' +
                    '          </div>\n';
                hospitalise = data.hospitalise;
                var add2;

                if (hospitalise) {
                    add2 = ' <div class="divcontenu border">\n' +
                        '            <p class="h5">Servce hopitalise</p>\n' +
                        '            <div class="container">\n' +
                        '              <div class="row">\n' +
                        '                <label for="staticEmail" class="col-sm-3 col-form-label">Nom de service</label>\n' +
                        '                <div class="col">\n' +
                        '                  <input type="text" readonly class="form-control-plaintext" id="datedenaissance"\n' +
                        '                    value="' + data.chembre.service.nom + '"> </div>\n' +
                        '              </div>\n' +
                        '              <div class="row">\n' +
                        '                <label for="staticEmail" class="col-sm-3 col-form-label">Chembre</label>\n' +
                        '                <div class="col">\n' +
                        '                  <input type="text" readonly class="form-control-plaintext" id="datedenaissance"\n' +
                        '                    value="' + data.chembre.numero + '"> </div>\n';

                    if (data.chembre.service.id === idService)
                        add2 = add2 + '<div class="col-sm-2">\n' +
                            '                  <button class="btn  " name="edit" onclick="d(\'#datedenaissance\')"><span class="fas fa-pen"></span></button>\n' +
                            '                </div>';
                    add2 = add2 + ' </div>\n' +
                        '            </div>\n' +
                        '            <div></div>\n' +
                        '          </div>';
                } else
                    add2 = '<div class="divcontenu border"><p class="h5">Patient n\'est pas hospitalise</p></div>';
                add = add + add2;
                if (viver === "oui") {
                    if ((hospitalise) && (data.chembre.service.id === idService)) {
                        add = add + '   <div class="form-group divcontenu">\n' +
                            '            <div class="row float-right">\n' +
                            '            <button class="btn btn-secondary " id="sortir" type="button" data-toggle="modal" data-target="#modelaffich"><span class="fas fa-plus mr-3"></span>Sortir</button>\n' +
                            '            <button class="btn btn-danger  " type="button" id="suppreme"  data-toggle="modal" data-target="#modelaffich" style="margin-left: 1rem;"><span class="far fa-trash-alt mr-3"></span>Suppreme</button>\n' +
                            '          </div></div>';
                    }
                    else
                        add = add + '   <div class="form-group divcontenu">\n' +
                            '            <div class="row float-right">\n' +
                            '            <button class="btn btn-secondary " id="entre" type="button" data-toggle="modal" data-target="#modelaffich"><span class="fas fa-plus mr-3"></span>Admis dans le servie</button>\n' +
                            '            <button class="btn btn-danger  " type="button" id="suppreme"  data-toggle="modal" data-target="#modelaffich"  id="suppreme" style="margin-left: 1rem;"><span class="far fa-trash-alt mr-3"></span>Suppreme</button>\n' +
                            '          </div></div>';
                    add = add + '  </div></div><div>';
                }
                $("#infomation").empty();
                $("#infomation").append(add);
                $(div).append('      <div class="modal fade" id="modelaffich" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\n' +
                    '          <div class="modal-dialog modal-dialog-centered" role="document">\n' +
                    '            <div class="modal-content">\n' +
                    '              <div class="modal-header">\n' +
                    '                <h5 class="modal-title" id="Title"></h5>\n' +
                    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                    '                  <span aria-hidden="true">&times;</span>\n' +
                    '                </button>\n' +
                    '              </div>\n' +
                    '              <div class="modal-body" id="modelbody">' +
                    '              </div>' +
                    '              <div class="modal-footer">\n' +
                    '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
                    '                <button type="submit" class="btn btn-primary">Save changes</button>\n' +
                    '              </div>\n' +
                    '            </div>\n' +
                    '          </div>\n' +
                    '        </div>')

                $("#sortir").click(function () {

                    $("#Title").text("géré un sortir");
                    $("#modelbody").empty();
                    $("#modelbody").append('<form action="/SortirPatient"><input type="hidden" name="idPatient" value="' + idPation + '"  >' +
                        '<input type="hidden" name="idDossier" value="' + idDossier + '"  ><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Date</label><div class="col"> <input type="text" readonly class="form-control-plaintext" id="date"  name="date"> </div></div><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Hour</label><div class="col"><input type="text" readonly class="form-control-plaintext" id="hour" name="hour"> </div></div>' +
                        ' <div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Type</label>' +
                        ' <div class="col"><select  class="form-control" name="typr" id="typr" required><option value="remis">remis de la maladie</option><option value="Décédés">Décédés</option><option value="autre">Autres</option></select> </div></div> <div class="form-group"><label for="exampleFormControlTextarea1">Remarque</label><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div></form>')
                    var d = new Date();
                    console.log(d.getDate());
                    var date = d.getDate() + '\\' + d.getMonth() + '\\' + d.getFullYear();
                    var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                    $('#date').val(date);
                    $('#hour').val(hour);
                });
                $("#entre").click(function () {
                    $("#Title").text("Admis Patient");
                    $("#modelbody").empty();
                    $("#modelbody").append('<form action="/AdmisPatient"><input type="hidden" name="idPatient" value="' + idPation + '"  >' +
                        '<input type="hidden" name="idDossier" value="' + idDossier + '"  ><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Date</label><div class="col"> <input type="text" readonly class="form-control-plaintext" id="date"  name="date"> </div></div><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Hour</label><div class="col"><input type="text" readonly class="form-control-plaintext" id="hour" name="hour"> </div></div> <div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Chembre</label>' +
                        '<div class="col"><select  class="form-control" name="chembre" id="chembre" required></select></div> </div> <div class="form-group"><label for="exampleFormControlTextarea1">Remarque</label><textarea class="form-control" id="exampleFormControlTextarea1" name="remarque" rows="3"></textarea></div></form>')
                    getChembreLibre("#chembre");
                });
                $("#suppreme").click(function () {
                    $("#Title").text("Suppreme Patient");
                    $("#modelbody").empty();
                    $("#modelbody").append('<form action="/suprimeDessierMedical"><div class="custom-control custom-radio">\n' +
                        '<input type="hidden" name="idPatient" value="' + idPation + '"  >' +
                        '<input type="hidden" name="idDossier" value="' + idDossier + '"  >' +
                        '<input type="hidden" name="sortir" id="gerirSortir" value="0" >' +
                        '  <input type="radio" name="suprime" value="0"  id="customRadio" class="custom-control-input" checked >' +
                        '  <label class="custom-control-label" for="customRadio">desactive just le dossier medical</label>\n' +
                        '</div>' +
                        '<div class="custom-control custom-radio">\n' +
                        '  <input type="radio" name="suprime" value="1" id="customRadioDisabled" class="custom-control-input" >\n' +
                        '  <label class="custom-control-label" for="customRadioDisabled">supprime tout l\'information</label>\n' +
                        '</div><div id="fromSrotir"></div></form>');
                    $('input[type=radio][name=suprime]').change(function () {
                        if (this.value == '0') {
                            $("#suprime").empty();
                        }
                        else if (this.value == 'transfer') {
                            if (hospitalise) {
                                $("#suprime").append('<p class="h5">il doit gérir un sortir avant la suppristion </p> <div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Date</label><div class="col"> <input type="text" readonly class="form-control-plaintext" id="date"  name="date"> </div></div><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Hour</label><div class="col"><input type="text" readonly class="form-control-plaintext" id="hour" name="hour"> </div></div> <div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Type</label>');
                                $("#gerirSortir").val('1');
                                var d = new Date();
                                console.log(d.getDate());
                                var date = d.getDate() + '\\' + d.getMonth() + '\\' + d.getFullYear();
                                var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                                $('#date').val(date);
                                $('#hour').val(hour);
                            }
                        }
                    });


                })


            },
            error: function (e) {
                alert(e.responseText);
                console.log("ERROR: ", e);

            }
            ,
            done: function (e) {
                console.log("DONE");
            }
        });


}

function getChembreLibre(div) {
    alert(jQuery.isEmptyObject(div));
    if (!jQuery.isEmptyObject(div)) {
        $(div).append('<p class="h4">Admis patient</p> <div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Date</label><div class="col"> <input type="text" readonly class="form-control-plaintext" id="date"  name="Date"> </div></div><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Hour</label><div class="col"><input type="text" readonly class="form-control-plaintext" id="hour" name="hour"> </div></div> <div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Chembre</label><div class="col"><select  class="form-control" name="chembre" id="chembre" required></select></div> </div> <div class="form-group"><label for="exampleFormControlTextarea1">Remarque</label><textarea class="form-control" id="exampleFormControlTextarea1" name="remarque" rows="3"></textarea></div>');
        var d = new Date();
        console.log(d.getDate());
        var date = d.getDate() + '\\' + d.getMonth() + '\\' + d.getFullYear();
        var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        $('#date').val(date);
        $('#hour').val(hour);
        $.ajax({
            url: "/ChefService/ChembreLibre",
            success: function (data) {
                if (jQuery.isEmptyObject(data))
                    $("#chembre").append('<option disabled>no chembre libre</option>');
                $.each(data, function (k, v) {
                    var o = new Option(v);
                    $("#chembre").append(o);
                })

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


}