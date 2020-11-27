$(document).ready(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    $('#dss').empty();
    var minDate= year + '-' + month + '-' + day;


    $('#dateInput').attr('min', minDate);
    $('#dateInput').val(minDate);
    $('#dateInput').change(function() {
        $("#dateRendewVous").empty();
        $("#dateRendewVous").html($(this).val());
        RendezVousofDate($(this).val())
    })

});
function RendezVousofDate(date) {
    {
        var id="#redezvous";
        $(id).empty();
        console.log(id);
        $.ajax({
            url: "/RedezVousMedecin",
            data:{date:date},

            beforeSend:function(){
                $(id).append('<div class="divanimation"><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
            },
            success: function (rendez) {
                console.log(rendez);
                var add;
                if (jQuery.isEmptyObject(rendez)) {

                    add= '<p class="h5 text-center">no Rendez vous en  '+date+' </p>';
                }
                else {

                    add=
                        '<div >\n' +
                        '                        <div class="row  divcontenu ">\n' +

                        '                            <div class="col my-auto ">\n' +
                        '                                <p class="h5">partient </p>\n' +
                        '                            </div>\n' +

                        '                            <div class="col  my-auto ">\n' +
                        '                                <p class="h5"> Date</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="col  my-auto ">\n' +
                        '                                <p class="h5"> Temp</p>\n' +
                        '                            </div>\n' +

                        '                        </div>\n' +
                        '                        <div class="w-100 border"></div>'
                ;
                    $.each(rendez, function (k, v) {

                        add = add + '  <div class="row my-auto divcontenu divrow" onclick="affiche(\''+v.patient.id+'\',\'seconde\')">\n' +
                            '                            <div class="col ">\n' +
                            '                                <div class="row">\n' +
                            '                                    <div class="col my-auto">\n' +
                            '                                        <img src="' + v.patient.photo + '" width="50" height="50"\n' +
                            '                                             class="rounded-circle  shadow-sm ">\n' +
                            '                                    </div>\n' +
                            '                                    <div class="col my-auto">\n' +
                            '                                        <p class="h6 row">' + v.patient.nom + '</p>\n' +
                            '                                        <p class="h6 row">' + v.patient.prenom + '</p>\n' +
                            '                                        <p class="text-info font-italic row">Id:' + v.patient.id + '</p>' +
                            '                                    </div>\n' +
                            '                                </div>\n' +
                            '                            </div>\n' +

                            '                            <div class="col  my-auto ">\n' +
                            '                                <p class="h5"> ' + v.date+ '</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="col  my-auto ">\n' +
                            '                                <p class="h5"> ' + v.time + '</p>\n' +
                            '                            </div>\n' +
                            '                        <div class="w-100 border"></div> ';



                });
                }
                $(id).empty();
                $(id).append(add);
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
function affiche(id) {
    $("#first").hide();
    detailPartionChefService(id,"seconde");
    $("#back").empty();
    $("#back").append('<span class="fas fa-arrow-left mr-3"></span> Rebdez-vous Page')
}

