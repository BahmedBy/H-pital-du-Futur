var idDossier;
var hospitalise;
var idPatient;
function detailPartionChefService(idPation, divResulte) {
    var div = "#" + divResulte;

    $(div).empty();
    $(div).show();
    if (typeof idPation != "undefined")
        $.ajax({
            url: "/allPatientInformation",
            data: {id: idPation},
            beforeSend: function () {
                $(div).append('<p class="h3 " id="back"><span class="fas fa-arrow-left mr-3"></span> Home Page</p><br />' +
                    '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
                $(div).show();
             $("#back").click(function (){backtofirst(1)});
            },
            success: function (data) {
                idPatient=data.id;
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
                add = add + add2 + ' <div class="row d-flex flex-row-reverse "><div class="p-2 ">' +
                    '<button class="btn btn-info" id="etatHistorique" type="button" ><span class="fas fa-history s mr-3"></span>l\'état historique</button>';
                if (viver === "oui") {
                    if ((hospitalise) && (data.chembre.service.id === idService)) {
                        add = add + ' <button class="btn btn-warning" type="button" id="etatActuel" style=" margin-left: 1rem;"><span class="fas fa-file-medical-alt mr-3"></span>Etat Actuel </button>' +
                            '            <button class="btn btn-success" type="button" id="AjouteEtat" style="margin-left: 1rem;"><span class="fas fa-notes-medical  mr-3"></span>Ajoute un état</button>';
                    }
                    else
                        add = add + '<button class="btn btn-success" type="button" id="AjouteEtat" style="margin-left: 1rem;"><span class="fas fa-notes-medical mr-3"></span>Ajoute un état</button>';
                    add = add + '  </div></div></div></div>';
                }
                $("#infomation").empty();
                $("#infomation").append(add);
                $("#infomation").after('<div id="AjouteEtatdiv"></div><div id="etatHistoriquediv"></div><div id="etatActueldiv"></div>');
                $("#etatHistoriquediv").hide();
                $("#AjouteEtatdiv").hide();
                $("#etatActueldiv").hide();
                $("#etatHistorique").click(function () {
                    $("#etatHistoriquediv").empty(); $("#etatHistoriquediv").show();
                    $("#etatHistoriquediv").append('<div class="shadow tablewidth my-auto bg-white  "><div id="etatHistoriqueAffich" class="divcontenu">' +
                        ' <p class="h5">L\'état historique</p><br/></div></div>');
                    getHistoriqueEtar("etatHistoriqueAffich", idDossier);
                });
                $("#AjouteEtat").click(function () {
                    $("#AjouteEtatdiv").empty(); $("#AjouteEtatdiv").show();
                    $("#AjouteEtatdiv").append('<div class="shadow tablewidth my-auto bg-white "><div class="divcontenu">' +
                        ' <p class="h5">Ajoute un Etat</p><br/></div><div><form action="/AjouteEtat" method="post" class="divcontenu">' +
                        '                    <fieldset class="divcontenu border" id="ajouteEtatFrom">' +
                        '                        <p class="h5">Etat Information</p>' +
                        '<input type="hidden" name="idDossier" value="' + idDossier + '"  >' +
                        '                        <div class="form-group row">' +
                        '                            <label for="date" class="col-sm-3 col-form-label" > La Date :</label>' +
                        '                            <div class="col-sm-2">' +

                        '                                <input readonly type="date" class="form-control-plaintext" id="dateEtat" name="date"' +
                        '                                    required>' +
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="form-group row">' +
                        '                            <label for="hour" class="col-sm-3 col-form-label"> Le Temp :</label>' +
                        '                            <div class="col-sm-2">' +
                        '                                <input readonly type="time" class="form-control-plaintext" id="hour" name="temp"' +
                        '                                    required>' +
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="form-group row">' +
                        '                            <label for="staticEmail" class="col-sm-3 col-form-label"> La temperaterur :</label>' +
                        '                            <div class="col-sm-2">' +
                        '                                <input type="number" class="form-control" id="temperaterur" name="temperaterur" value="0.0" step="0.1"' +
                        '                                    required>' +
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="form-group row">' +
                        '                            <label for="pulsation" class="col-sm-3 col-form-label">La pulsation :</label>' +
                        '                            <div class="col-sm-2">' +
                        '                                <input type="number" class="form-control" id="pulsation" name="pulsation" value="0.0" step="0.1">' +
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="form-group row">' +
                        '                            <label for="tension" class="col-sm-3 col-form-label">La tension :</label>' +
                        '                            <div class="col-sm-2 ">' +
                        '                                <input type="number" class="form-control" id="tension" name="tension" value="0.0" step="0.1">' +
                        '                            </div>' +
                        '                        </div>' +
                        '                    </fieldset>          <div class="row d-flex flex-row-reverse ">' +
                        '                        <div class="p-2 ">' +
                        '                            <button type="button" class="btn btn-outline-dark" id="Ajouterapport"><span' +
                        '                                    class="fas fa-plus mr-3"></span>Ajoute Rapport </button>' +
                        '                            <button type="submit" class="btn btn-success "><span class="far fa-save mr-3"></span> Save' +
                        '                            </button></div>' +
                        '                    </div>' +
                        '                </form></div>');
                    dateinit();
                    var co=0;
                        $("#Ajouterapport").click(function () {
                           co++;
                           var domande;
                           if (hospitalise) domande="Sortir";else domande="Hospitalisation";
                            $("#ajouteEtatFrom").append(' <fieldset class="divcontenu border"><p class="h5">Rapport '+co+'</p><div class="form-group"> <label for="Type" class="col-sm-3 col-form-label">Type :</label><select class="form-control custom-select  col-sm-4" name="type" id="Type"><option value="Ordonnance">Ordonnance </option><option value="demande'+domande+'">demande '+domande+' </option><option value="Remarque" selected>Remarque</option></select></div>' +
                                ' <div class="form-group"><label for="Contenu" class="col-sm-3 col-form-label">Contenu :</label><textarea class="form-control" id="Contenu" name="contenu" rows="3"></textarea></div></fieldset>')
                });});
                $("#etatActuel").click(function () {
                    $("#etatActueldiv").empty(); $("#etatActueldiv").show();

                    $("#etatActueldiv").append('<div class="tablewidth my-auto bg-white  "><div class="divcontenu"  id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div> </div>');
                    var myVar = setInterval(demendeEtat, 2000);
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
                            add = add + '<div class=" border rounded border-secondary bg-muted divcontenu centerdiv " id="' + v.id + '" >' +
                                '<div class=" row " ><div class="col">' +
                                v.date + ' ' + v.time +
                                '</div><div class="col-sm-1"><i class="fas fa-arrow-circle-right" onclick="detailEtat(\'' + v.id + '\')" style="font-size: 1.5rem; cursor: pointer"></i>' +
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




function dateinit() {
    var d = new Date();
    var day = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);

    var today = d.getFullYear()+"-"+(month)+"-"+(day) ;
    var h = new Date();
    var houre=h.getHours();
    var minut=h.getMinutes();
    var Seconds=h.getSeconds();
    if (houre<10)
        houre="0"+houre;
    if (minut<10)
        minut="0"+minut;
    if (Seconds<10)
        Seconds="0"+Seconds;
    var hour = houre + ":" +minut + ":" + Seconds;
    console.log(hour);
    $('#dateEtat').val(today);
    $('#hour').val(hour);

}
}
function etatInformatiom(div ,idEtat) {
    if (typeof idEtat != "undefined")
        $.ajax({
            url: "/EtatInformation",
            data: {idEtat: idEtat},
            beforeSend: function () {
                console.log(div);
                $(div).append('  <div class="tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
                $(div).show();

            },
            success: function (data) {
                $(div).append('<div  class="divcontenu">' +
                    '                    <fieldset class="divcontenu border" >' +
                    '                        <p class="h5">Etat Information</p>' +
                    '                        <div class="form-group row">' +
                    '                            <label for="date" class="col-sm-3 col-form-label" > La Date :</label>' +
                    '                            <div class="col-sm-2">' +
                    '                                <input readonly type="date" class="form-control-plaintext" id="dateEtat" name="date"' +
                    '                                    required value="'+data.date+'">' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="form-group row">' +
                    '                            <label for="hour" class="col-sm-3 col-form-label"> Le Temp :</label>' +
                    '                            <div class="col-sm-2">' +
                    '                                <input readonly type="time" class="form-control-plaintext" id="hour" name="temp"' +
                    '                                    required value="'+data.time+'">' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="form-group row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label"> La temperaterur :</label>' +
                    '                            <div class="col-sm-2">' +
                    '                                <input type="number" readonly class="form-control-plaintext" id="temperaterur" name="temperaterur" value="'+data.tempeture+'" ' +
                    '                                    required>' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="form-group row">' +
                    '                            <label for="pulsation" class="col-sm-3 col-form-label">La pulsation :</label>' +
                    '                            <div class="col-sm-2">' +
                    '                                <input type="number" readonly class="form-control-plaintext" id="pulsation" name="pulsation" value="'+data.pulsation+'" >' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="form-group row">' +
                    '                            <label for="tension" class="col-sm-3 col-form-label">La tension :</label>' +
                    '                            <div class="col-sm-2 ">' +
                    '                                <input type="number" readonly class="form-control-plaintext" id="tension" name="tension" value="'+data.tonsion+'" >' +
                    '                            </div>' +
                    '                        </div>' +
                    '                    </fieldset> </div>');
                var add;
                var co=1;
                $.each(data.raports,function (k,v) {
                    add='<div class="divcontenu border"'+
                        '    <p class="h4">Medecin :</p><br />\n' +
                        '            <div class="row ">\n' +
                        '                <div class="col-4">\n' +
                        '                    <img src="'+v.medecin.photo+'" alt="..." width="150"\n' +
                        '                         class="mr-3 rounded-circle img-thumbnail shadow-sm">\n' +
                        '                </div>\n' +
                        '                <div class="col my-auto">\n' +
                        '                    <p class="h5">nom et prenom :Dr.'+v.medecin.nom+''+v.medecin.prenom+'</p>\n' +
                        '                    <p class="h5">speiciality: '+v.medecin.speiciality+'</p>\n' +
                        '                    <p class="h5">service :  '+v.medecin.service.nom+'</p></div></div>\n' +
                        '        </div>' +
                        '        <div class=" divcontenu border shodow">\n' +
                        '<p class="h5">Rapport n'+co+'</p><br />'+
                        '            <p class="h5">type:'+v.type+'</p>\n' +
                        '            <p class="h5">contenu:</p><br />\n' +
                        '            <p class="h5 text-left  divcontenu border tablewidth align-left">'+v.contenu+
                        '            </p>\n' +
                        '        </div>\n' +
                        '    </div>'

                })
                $(div).find('#infomation').remove();
                $(div).find('fieldset').append(add);

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
function detailEtat(iddiv) {

    if (typeof idDossier != 'undefined') {
        var id = "#" + iddiv;
        $(id).find(".row").addClass("border-secondary  border-bottom");
        $(id).find(".row").css("padding-bottom", "0.5rem");
        $(id).find("i").css("transform", "rotate(90deg)");
        var fon = "hideDetail('" + iddiv + "')";
        $(id).find("i").attr("onclick", fon);
        etatInformatiom(id,iddiv);


    }}



function hideDetail(iddiv) {
    if (typeof idDossier != 'undefined') {
        console.log(1);
        var id = "#" + iddiv;
        $(id).find(".row").removeClass("border-secondary border-bottom");
        $(id).find(".row").css("padding-bottom", "");
        $(id).find("i").css("transform", "rotate(0deg)");
        var fon = "detailEtat('" + iddiv + "')";
        $(id).find("i").attr("onclick",fon );
        $(id).find('fieldset').empty();
        $(id).find('fieldset').parent().remove();
    }
}