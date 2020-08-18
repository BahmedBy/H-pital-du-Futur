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

                $(div).append('<p class="h3 " id="back"><span class="fas fa-arrow-left mr-3"></span> Home Page</p><br />\n' +
                    '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
                $(div).show();
             $("#back").click(backtofirst(1));
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
                    '                </div>\n' +
                    '                <div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Prenom</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Prenom" value="' + data.prenom + '">\n' +
                    '                  </div>\n' +
                    '                </div>';
                if (data.active === true)
                    add = add + '<div class="row">\n' +
                        '                  <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>\n' +
                        '                  <div class="col">\n' +
                        '                    <input type="text" readonly class="form-control-plaintext" id="Email" value="' + data.email + '">\n' +
                        '                  </div></div>';
                add = add + '<div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">numero Telephone</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="numeroTelephone"\n' +
                    '                      value="' + data.numeroTel + '"> </div>\n' +
                    '                </div>\n' +
                    '                <div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">date de naissance</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="datedenaissance"\n' +
                    '                      value="' + data.dateNaissance + '"> </div>\n' +
                    '                </div>\n' +
                    '                <div class="row">\n' +
                    '                  <label for="staticEmail" class="col-sm-3 col-form-label">Gender</label>\n' +
                    '                  <div class="col">\n' +
                    '                    <input type="text" readonly class="form-control-plaintext" id="Gender" value="' + data.gender + '">\n' +
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


                    add2 = add2 + ' </div>\n' +
                        '            </div>\n' +
                        '            <div></div>\n' +
                        '          </div>';
                } else
                    add2 = '<div class="divcontenu border"><p class="h5">Patient n\'est pas hospitalise</p></div>';
                add = add + add2 + ' <div class="row d-flex flex-row-reverse "><div class="p-2 ">' +
                    '<button class="btn btn-info" id="etatHistorique" type="button" ><span class="fas fa-history s mr-3"></span>l\'état historique</button>';
                if (viver === "oui") {
                    if ((hospitalise) && (data.chembre.service.id === idService)) {
                        add = add + ' <button class="btn btn-warning" type="button" id="etatActuel" style=" margin-left: 1rem;"><span class="fas fa-file-medical-alt mr-3"></span>Etat Actuel </button>\n' +
                            '            <button class="btn btn-success" type="button" id="AjouteEtat" style="margin-left: 1rem;"><span class="fas fa-notes-medical  mr-3"></span>Ajoute un état</button>\n';
                    }
                    else
                        add = add + '<button class="btn btn-success" type="button" id="AjouteEtat" style="margin-left: 1rem;"><span class="fas fa-notes-medical mr-3"></span>Ajoute un état</button>';
                    add = add + '  </div></div></div></div>';
                }
                $("#infomation").empty();
                $("#infomation").append(add);
                $("#infomation").after('<div id="AjouteEtatdiv"></div><div id="etatHistoriquediv"></div><div id="etatActueldiv"></div>mymy');
                $("#etatHistoriquediv").hide();
                $("#AjouteEtatdiv").hide();
                $("#etatActueldiv").hide();
                $("#etatHistorique").click(function () {
                    $("#etatHistoriquediv").empty(); $("#etatHistoriquediv").show();
                    $("#etatHistoriquediv").append('<div class="shadow tablewidth my-auto bg-white divcontenu "><div id="etatHistoriqueAffich">\n' +
                        ' <p class="h5">L\'état historique</p><br/></div></div>');
                    getHistoriqueEtar("etatHistoriqueAffich", idDossier);
                });
                $("#AjouteEtat").click(function () {
                    $("#AjouteEtatdiv").empty(); $("#AjouteEtatdiv").show();
                    $("#AjouteEtatdiv").append('<div class="shadow tablewidth my-auto bg-white divcontenu "><div>\n' +
                        ' <p class="h5">Ajoute un Etat</p><br/></div><div><form >\n' +
                        '                    <fieldset class="divcontenu border" id="ajouteEtatFrom">\n' +
                        '                        <p class="h5">Etat Information</p>\n' +
                        '<input type="hidden" name="idDossier" value="' + idDossier + '"  >' +
                        '                        <div class="form-group row">\n' +
                        '                            <label for="date" class="col-sm-3 col-form-label" > La Date :</label>\n' +
                        '                            <div class="col-sm-2">\n' +
                        '                                <input readonly type="date" class="form-control-plaintext" id="date" name="date"' +
                        '                                    required>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="form-group row">\n' +
                        '                            <label for="hour" class="col-sm-3 col-form-label"> Le Temp :</label>\n' +
                        '                            <div class="col-sm-2">\n' +
                        '                                <input readonly type="time" class="form-control-plaintext" id="hour" name="temp"' +
                        '                                    required>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="form-group row">\n' +
                        '                            <label for="staticEmail" class="col-sm-3 col-form-label"> La temperaterur :</label>\n' +
                        '                            <div class="col-sm-2">\n' +
                        '                                <input type="number" class="form-control" id="temperaterur" name="temperaterur" value="0.0" step="0.1"\n' +
                        '                                    required>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="form-group row">\n' +
                        '                            <label for="pulsation" class="col-sm-3 col-form-label">La pulsation :</label>\n' +
                        '                            <div class="col-sm-2">\n' +
                        '                                <input type="number" class="form-control" id="pulsation" name="pulsation" value="0.0" step="0.1">\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="form-group row">\n' +
                        '                            <label for="tension" class="col-sm-3 col-form-label">La tension :</label>\n' +
                        '                            <div class="col-sm-2 ">\n' +
                        '                                <input type="number" class="form-control" id="tension" name="tension" value="0.0" step="0.1">\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </fieldset>          <div class="row d-flex flex-row-reverse ">\n' +
                        '                        <div class="p-2 ">\n' +
                        '                            <button type="button" class="btn btn-outline-dark" id="Ajouterapport"><span\n' +
                        '                                    class="fas fa-plus mr-3"></span>Ajoute Rapport </button>\n' +
                        '                            <button type="submit" class="btn btn-success "><span class="far fa-save mr-3"></span> Save\n' +
                        '                            </button></div>\n' +
                        '                    </div>\n' +
                        '                </form></div>');
                    var d = new Date();
                    var date = d.getDate() + '\\' + d.getMonth() + '\\' + d.getFullYear();
                    var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                    $('#date').val(date);
                    $('#hour').val(hour);
                    var co=0;
                        $("#Ajouterapport").click(function () {
                           co++;
                            $("#ajouteEtatFrom").after(' <fieldset class="divcontenu border"><p class="h5">Rapport '+co+'</p><div class="form-group"> <label for="Type" class="col-sm-3 col-form-label">Type :</label><select class="form-control custom-select  col-sm-4" name="type" id="Type"><option>Ordonnance </option><option selected>Remarque</option></select></div>' +
                                ' <div class="form-group"><label for="Contenu" class="col-sm-3 col-form-label">Contenu :</label><textarea class="form-control" id="Contenu" name="contenu" rows="3"></textarea></div></fieldset>')
                });});
                $("#etatActuel").click(function () {
                    $("#etatActueldiv").empty(); $("#etatActueldiv").show();
                    $("#etatActueldiv").append('<div class="shadow tablewidth my-auto bg-white divcontenu "><div>\n' +
                        ' <p class="h5">L\'état Actuel</p><br/></div><div></div>')
                });
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

    function getHistoriqueEtar(div, idDossier) {
        if (typeof idDossier != 'undefined') {
            var id = '#' + div;
            $.ajax({
                url: "/MedecinEtatHistorique",
                data: {idDossier: idDossier},
                beforeSend: function () {

                },
                success: function (data) {
                    var add = '';
                    if (jQuery.isEmptyObject(data))
                        add = '<p>n\'état exsit</p>';
                    else
                        $.each(data, function (k, v) {
                            add = add + '<div class=" border rounded border-secondary bg-muted divcontenu centerdiv " id="' + v.id + '" onclick="detail(' + v.id + ')">' +
                                '<div class=" row " ><div class="col">' +
                                v.date + ' ' + v.time +
                                '</div><div class="col-sm-1"><i class="fas fa-arrow-circle-right" style="font-size: 1.5rem;"></i>' +
                                '  </div></div> <div class="divcontenu" id="detail"></div></div>'
                        });
                    $(id).append(add);

                },
                error: function (e) {
                    alert(e.responseText);
                    console.log("ERROR: ", e);

                }

            })
        }
    }

    function detail(iddiv) {
        if (typeof idDossier != 'undefined') {
            var id = "#" + iddiv;
            $(id).find(".row").addClass("border-secondary  border-bottom");
            $(id).find(".row").css("padding-bottom", "0.5rem");
            $(id).find("i").css("transform", "rotate(90deg)");
            var fon = "hideDetail('" + iddiv + "')";
            $(id).attr("onclick", fon);
            
        }
    }

    function hideDetail(iddiv) {
        if (typeof idDossier != 'undefined') {
            var id = "#" + iddiv;
            $(id).find(".row").removeClass("border-secondary border-bottom");
            $(id).find(".row").css("padding-bottom", "");
            $(id).find("i").css("transform", "rotate(0deg)");
            $(id).attr("onclick", "detail('" + iddiv + "')");
            $(id).find("#detail").empty();
        }
    }
    function etatInformatiom() {

    }


}