$(document).ready(function () {
$("#domandList").click(function () {
    console.log("fff");
    $("#first").hide();
    var id="#seconde";
    $.ajax({
        url: "/demomde",

        beforeSend: function () {
            $(id).empty();

            $(id).append('<p class="h3" id="back"><span class="fas fa-arrow-left mr-3"></span> Patient Page</p><br />' +
                '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
            $(id).show();
            $("#back").click(function (){backtofirst(1)});

        }
        ,
        success: function (data) {
            var add="";
            console.log(data);
            $.each(data,function (k,v) {
                add=add+'<div class="divcontenu">' +
                    '<div class="border">' +
                    '<div >' +
                    '<p class="h4 border-bottom text-center divcontenu">type: '+v.type+'</p>' +
                    '</div>' +
                    '<div class=" divcontenu border-bottom">' +
                    '<p class="h5 " >Medecin</p><br/>' +
                    '<div class="row ">' +
                    '<div class="col-sm-3">' +
                    '<img src="'+v.medecin.photo+'" alt="..." width="150" class="mr-3 rounded-circle img-thumbnail shadow-sm">' +
                    '</div>' +
                    '<div class="col my-auto">' +
                    '                  <p class="h5">ID: '+v.medecin.id+'</p>' +
                    '                  <p class="h5">Nom et prenom:'+v.medecin.nom+' '+v.medecin.prenom+'</p>' +
                    '                ' +
                    '</div></div>' +
                    '</div>' +
                    '<div class="divcontenu border-bottom">' +
                    '<p class="h5 " >Patient</p><br/>' +
                    '<div class="row ">' +
                    '<div class="col-sm-3">' +
                    '<img src="'+v.patient.photo+'" alt="..." width="150" class="mr-3 rounded-circle img-thumbnail shadow-sm">' +
                    '</div>' +
                    '<div class="col my-auto">' +
                    '                  <p class="h5">ID: '+v.patient.id+'</p>' +
                    '                  <p class="h5">Nom et prenom:'+v.patient.nom+' '+v.patient.prenom+'</p>' +
                    '</div></div>' +
                    '</div>' +
                    '<div class=" divcontenu ">' +
                    '   <p class="h5 " >cotenu:</p><br/>' +
                    '<div class="border divcontenu">' +
                    '                 <p>'+v.contenu+'</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="form-group divcontenu d-flex flex-row-reverse">' +
                    '<div class="row p-2">' +
                    '<button class="btn btn-success " name="Accepte" onclick="Accepte('+v.id+',\''+v.type+'\','+v.patient.id+','+v.patient.dossierMedical.id+')" type="button" data-toggle="modal"' +
                    '            data-target="#modelaffich"><span class="fas fa-check mr-3"></span>Accepte</button>' +
                    '                    <button class="btn btn-danger  " type="button" name="refuse" onclick="refuse('+v.id+','+v.type+','+v.patient.id+','+v.patient.dossierMedical.id+')" data-toggle="modal"' +
                    '                        data-target="#modelaffich" style="margin-left: 1rem"><span class="fas fa-times mr-3"></span>refuse</button>' +
                    '                </div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            });
            $("#infomation").empty();
            $("#infomation").append(add);


        }});
    ajouteModel("#seconde");

});

});
function Accepte(id,type,idPatient,idDossier) {
    if (type=="demandeHospitalisation") {
        $("#Title").text("Admis Patient");
        $("#modelbody").empty();
        $("#modelbody").append('<form action="/AdmisPatient"><input type="hidden" name="idDemonde" value="' + id + '"> <input type="hidden" name="idPatient" value="' + idPatient + '"  >' +
            '<input type="hidden" name="idDossier" value="' + idDossier + '"  ><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Date</label><div class="col"> <input type="date" readonly class="form-control-plaintext" id="date"  name="date"> </div></div><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Hour</label><div class="col"><input type="time" readonly class="form-control-plaintext" id="hour" name="hour"> </div></div> <div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Chembre</label>' +
            '<div class="col"><select  class="form-control" name="chembre" id="chembre" required></select></div> </div> <div class="form-group"><label for="exampleFormControlTextarea1">Remarque</label><textarea class="form-control" id="exampleFormControlTextarea1" name="remarque" rows="3"></textarea></div></form>')
        getChembreLibre("#chembre");
    }else {
        $("#Title").text("géré un sortir");
        $("#modelbody").empty();
        $("#modelbody").append('<form action="/SortirPatient"><input type="hidden" name="idDemonde" value="' + id + '"> <input type="hidden" name="idPatient" value="' + idPatient + '"  >' +
            '<input type="hidden" name="idDossier" value="' + idDossier + '"  ><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Date</label><div class="col"> <input type="date" readonly class="form-control-plaintext" id="date"  name="date"> </div></div><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Hour</label><div class="col"><input type="time" readonly class="form-control-plaintext" id="hour" name="hour"> </div></div>' +
            ' <div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Type</label>' +
            ' <div class="col"><select  class="form-control" name="type" id="type" required><option value="remis">remis de la maladie</option><option value="Décédés">Décédés</option><option value="autre">Autres</option></select> </div></div> <div class="form-group"><label for="exampleFormControlTextarea1">Remarque</label><textarea class="form-control" name="remarque" id="exampleFormControlTextarea1" rows="3"></textarea></div></form>')
   dateinit()
    }
}
function getChembreLibre(div) {

    if (!jQuery.isEmptyObject(div)) {
        $(div).append('<p class="h4">Admis patient</p> <div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Date</label><div class="col"> <input type="text" readonly class="form-control-plaintext" id="date"  name="Date"> </div></div><div class="form-group row"><label for="staticEmail" class="col-sm-2 col-form-label">Hour</label><div class="col"><input type="text" readonly class="form-control-plaintext" id="hour" name="hour"> </div></div> <div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Chembre</label><div class="col"><select  class="form-control" name="chembre" id="chembre" required></select></div> </div> <div class="form-group"><label for="exampleFormControlTextarea1">Remarque</label><textarea class="form-control" id="exampleFormControlTextarea1" name="remarque" rows="3"></textarea></div>');
   dateinit();
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
    }}
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
    $('#date').val(today);
    $('#hour').val(hour);

}