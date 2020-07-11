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

                $(div).append('<p class="h3 ">Home Page</p><br />' +
                    '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
                $(div).show();

            },
            success: function (data) {

                var add = '<div class="divcontenu">' +
                    '          <p class="h4">Patient Information</p><br />' +
                    '          <div class="container divcontenu border">' +
                    '            <div class="row">' +
                    '              <div class="col-sm-3">' +
                    '                <img src="' + data.photo + '" alt="..." width="140"' +
                    '                  class="mr-3 rounded-circle img-thumbnail shadow-sm">' +
                    '              </div>' +
                    '              <div class="col">' +
                    '                <div class=" row">' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Id</label>' +
                    '                  <div class="col">' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Id" value="' + data.id + '">' +
                    '                  </div>' +
                    '                </div>' +
                    '                <div class="row">' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Nom</label>' +
                    '                  <div class="col">' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Nom" value="' + data.nom + '">' +
                    '                  </div>' +
                    '                </div>' +
                    '                <div class="row">' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Prenom</label>' +
                    '                  <div class="col">' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Prenom" value="' + data.prenom + '">' +
                    '                  </div>' +
                    '                </div>';
                if (data.active === true)
                    add = add + '<div class="row">' +
                        '                  <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>' +
                        '                  <div class="col">' +
                        '                    <input type="text" readonly class="form-control-plaintext" id="Email" value="' + data.email + '">' +
                        '                  </div></div>';
                add = add + '<div class="row">' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">numero Telephone</label>' +
                    '                  <div class="col">' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="numeroTelephone"' +
                    '                      value="' + data.numeroTel + '"> </div>' +
                    '                </div>' +
                    '                <div class="row">' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">date de naissance</label>' +
                    '                  <div class="col">' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="datedenaissance"' +
                    '                      value="' + data.dateNaissance + '"> </div>' +
                    '                </div>' +
                    '                <div class="row">' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Gender</label>' +
                    '                  <div class="col">' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Gender" value="' + data.gender + '">' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '            </div>' +
                    '          </div>' +
                    '          <div class="divcontenu border">' +
                    '            <p class="h5">Dossier Medical</p>' +
                    '            <div class="container">' +
                    '              <div class="row">' +
                    '                <label for="staticEmail" class="col-sm-3 col-form-label">Gropage</label>' +
                    '                <div class="col">' +
                    '                  <input type="text" readonly class="form-control-plaintext" id="datedenaissance"' +
                    '                    value="' + data.dossierMedical.groupage + '"> </div>' +
                    '              </div>' +
                    '              <div class="row">' +
                    '                <label for="staticEmail" class="col-sm-3 col-form-label">viver</label>' +
                    '                <div class="col">';
                var viver;
                idDossier = data.dossierMedical.id;
                if (data.dossierMedical.mort)
                    viver = "no";
                else
                    viver = "oui";
                add = add + '  <input type="text" readonly class="form-control-plaintext" id="datedenaissance"' +
                    '                    value="' + viver + '"> </div>' +
                    '                <div class="col-sm-2">' +
                    '                  <button class="btn " name="edit" onclick="d(\'#datedenaissance\')"><span class="fas fa-pen"></span></button>' +
                    '                </div>' +
                    '              </div>' +
                    '            </div>' +
                    '          </div>';
                hospitalise = data.hospitalise;
                var add2;

                if (hospitalise) {
                    add2 = ' <div class="divcontenu border">' +
                        '            <p class="h5">Servce hopitalise</p>' +
                        '            <div class="container">' +
                        '              <div class="row">' +
                        '                <label for="staticEmail" class="col-sm-3 col-form-label">Nom de service</label>' +
                        '                <div class="col">' +
                        '                  <input type="text" readonly class="form-control-plaintext" id="datedenaissance"' +
                        '                    value="' + data.chembre.service.nom + '"> </div>' +
                        '              </div>' +
                        '              <div class="row">' +
                        '                <label for="staticEmail" class="col-sm-3 col-form-label">Chembre</label>' +
                        '                <div class="col">' +
                        '                  <input type="text" readonly class="form-control-plaintext" id="datedenaissance"' +
                        '                    value="' + data.chembre.numero + '"> </div>';


                    add2 = add2 + ' </div>' +
                        '            </div>' +
                        '            <div></div>' +
                        '          </div>';
                } else
                    add2 = '<div class="divcontenu border"><p class="h5">Patient n\'est pas hospitalise</p></div>';
                add = add + add2;
                if (viver === "oui") {
                    if (((!hospitalise) || ((hospitalise) && (data.chembre.service.id === idService)) && (
                        data.dossierMedical.suppreme)))
                        add = add + '<div class="form-group divcontenu">' +
                            '<div class="row float-right">' + '<div class="form-group divcontenu">' +
                            '<div class="row float-right">' +
                            '<button class="btn btn-secondary " id="etat" type="button" ><span class="fas fa-plus mr-3"></span>réserver rendez-vous</button>';
                }
                $("#infomation").empty();
                $("#infomation").append(add);
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