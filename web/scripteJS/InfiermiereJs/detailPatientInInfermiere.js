var idPatient;
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

                $(div).append('<p class="h3 " id="back"><span class="fas fa-arrow-left mr-3"></span> Home Page</p><br />' +
                    '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
                $(div).show();
                $("#back").click(
                    backtofirst(1)
                );
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
                            '<button class="btn btn-secondary " id="réserver" type="button" ><span class="fas fa-plus mr-3"></span>réserver rendez-vous</button>';
                }
                $("#infomation").empty();
                $("#infomation").append(add);
                $("#réserver").onclick(function () {
                    this.remove();
                    $("#seconde").append('<div class="shadow tablewidth my-auto bg-white divcontenu id="MedecinList">' +
                        '<p>Chiosir Medecin</p> </div>')
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
        });}
    function MedecinService(b) {
        if(b)
        {
            var id="#MedecinList";
            $.ajax({
                url: "/Infermiere/medecinofService",
                beforeSend:function(){
                    $(id).append('<div class="divanimation"><div class="mainAnimation">' +
                        '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
                },
                success: function (data) {
                    var add;
                    if (jQuery.isEmptyObject(data)) {

                        add='<div class="divanimation"><p class="h4"><div class="mainAnimation">'+
                            '<p class="h5 text-center">N\'exit pas medcine dans service </p>'+
                            '</div>';
                    }
                    else {
                        $(':input[type="submit"]').prop('disabled', false);
                        add='<form action="/ReserverRendezVous" method="post"> ' +
                            '<input type="hidden" name="idPatient" value="' + idPatient + '"  ><div class="row border-bottom border-top font-weight-bold divrow">' +
                            '    <div class="col-1">#</div> <div class="col-sm"></div><div class="col-sm">Id</div>' +
                            '<div class="col-sm">Photo</div><div class="col-sm">Nom</div><div class="col-sm">Prenom </div> <div class="col-sm">'
                        if (type==="Medecin")
                            add=add+'<div class="col-sm">Sepiciality </div>';
                        add=add+'</div></div>';

                        $.each(data, function (k, v) {
                                add= add+'<label for="'+v.id+'" class="row divrow border-bottom"><div class="col-1 my-auto">' +
                                    '<input type="radio" name="medecin" id="'+v.id+'" value="'+v.id+'" required/>' +
                                    '    </div>'+
                                    '        <div class="col-sm my-auto">' +v.id+
                                    '</div>' +
                                    '      <div class="col-sm my-auto" >' +
                                    '      <img src="'+v.photo+'" width="50" height="50"  class="rounded-circle  shadow-sm">' +
                                    '    </div>' +
                                    '        <div class="col-sm my-auto">' +v.nom+
                                    '</div>' +
                                    '        <div class="col-sm my-auto">' +
                                    v.prenom +
                                    ' </div>' ;
                                if (type==="Medecin")
                                    add=add+'<div class="col-sm my-auto">'+v.sepiciality+' </div>';
                                add=add+  '</label>';

                            }
                        );
                        add=add+'</div><div class="row border-bottom border-top font-weight-bold divrow">' +
                            '<div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Date</label><div class="col"> <input type="date"  class="form-control" id="date"  name="date" required> </div>' +
                            '</div>' +
                            ' <div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Type</label> +\n' +
                            '<div class="col"><select  class="form-control" name="timp" id="time" required></select>' +
                            '   <div class="form-group formstyle">' +
                            '<input class="btn btn-success float-right" type="submit" value="réserver" name="submit">' +
                            '</div>' +
                            '</form>';
                        var d = new Date();
                        console.log(d.getDate());
                        var date = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
                        $('#date').attr('min', date);

                    }
                    $(id).empty();
                    $(id).append(add);
                    $('input[type=radio][name=medecin]').change(function() {
                        var medcin=$('input[type=radio][name=medecin]').val();
                        var date=$('#date').val();
                        if ((date!='')&&(medcin!=''))
                        templibre(date,medcin)
                    });
                    $('#date').change(function() {
                        var medcin=$('input[type=radio][name=medecin]').val();
                        var date=$('#date').val();
                        if ((date!='')&&(medcin!=''))
                            templibre(date,medcin)
                    })
                },
                error: function (e) {
                    alert(e.responseText);
                    console.log("ERROR: ", e);

                },
                done: function (e) {
                    console.log("DONE");
                }
            } )}
        }
        function templibre(idMedcin,date) {
            $('#time')
                .find('option')
                .remove();
            $.ajax({
                url: "/Templibre",
                data:{
                  idPatient: idPatient,
                  idMedcin:idMedcin,
                  date:date
                },
                success: function (data) {
                    if (jQuery.isEmptyObject(data)){
                        var o = new Option("no temp libre");
                        o.attr("disabled",true);
                        $("#time").append(o);
                    }
                    else
                    $.each(data, function (k, v) {
                        var o = new Option(v);
                        var photo='url("' + v.photo + '")';
                        $("#time").append(o);
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



