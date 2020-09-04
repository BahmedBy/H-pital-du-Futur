$(document).ready(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();

    var minDate= year + '-' + month + '-' + day;

    $('#dateInput').attr('min', minDate);
    $('#dateInput').change(function() {
        $("#dateRendewVous").innerText=this.val();
        RendezVousofDate(this.val())
    })

});
function RendezVousofDate(date) {
    if(typeof date!="undefined")
    {
        var id="#ListRendzVous";
        $("#id").empty();

        $.ajax({
            url: "/Rendez-vousofdate",
            data:{date:date},

            beforeSend:function(){
                $(id).append('<div class="divanimation"><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
            },
            success: function (rendez) {
                var add;
                if (jQuery.isEmptyObject(rendez)) {

                    add='<div class="divanimation"><p class="h4"><div class="mainAnimation">'+
                        '<p class="h5 text-center">N\'exit pas Rendez-vous en'+date+' </p>'+
                        '</div>';
                }
                else {

                    add=
                        '<div id="ListRendzVous">\n' +
                        '                        <div class="row  divcontenu ">\n' +

                        '                            <div class="col-3 my-auto ">\n' +
                        '                                <p class="h5">partient </p>\n' +
                        '                            </div>\n' +
                        '                            <div class="col-3 my-auto ">\n' +
                        '                                <p class="h5">Medcin</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="col  my-auto ">\n' +
                        '                                <p class="h5"> Date</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="col  my-auto ">\n' +
                        '                                <p class="h5"> Temp</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="col  my-auto ">\n' +
                        '\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <div class="w-100 border"></div>'
                ;
                    $.each(data, function (k, v) {
                        add = add + '  <div class="row my-auto">\n' +
                            '                            <div class="col-3 ">\n' +
                            '                                <div class="row">\n' +
                            '                                    <div class="col my-auto">\n' +
                            '                                        <img src="' + rendez.patient.photo + '" width="50" height="50"\n' +
                            '                                             class="rounded-circle  shadow-sm ">\n' +
                            '                                    </div>\n' +
                            '                                    <div class="col my-auto">\n' +
                            '                                        <p class="h6 row">' + rendez.patient.nom + '</p>\n' +
                            '                                        <p class="h6 row">' + rendez.patient.prenom + '</p>\n' +
                            '                                        <p class="text-info font-italic row">Id:' + rendez.patient.id + '</p>' +
                            '                                    </div>\n' +
                            '                                </div>\n' +
                            '                            </div>\n' +
                            '                            <div class="col-3 my-auto ">\n' +
                            '                                <div class="row">\n' +
                            '                                    <div class="col">\n' +
                            '                                        <img src="' + rendez.medecin.photo + '" width="50" height="50"\n' +
                            '                                             class="rounded-circle  shadow-sm ">\n' +
                            '                                    </div>' +
                            '                                    <div class="col">' +
                            '                                        <p class="h6 row">' + rendez.medecin.nom + '</p>\n' +
                            '                                        <p class="h6 row">' + rendez.medecin.prenom + '</p>\n' +
                            '                                    </div>\n' +
                            '                                </div>\n' +
                            '                            </div>\n' +
                            '                            <div class="col  my-auto ">\n' +
                            '                                <p class="h5"> ' + rendez.date.day + '/' + rendez.date.month + '/' + rendez.date.year + '</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="col  my-auto ">\n' +
                            '                                <p class="h5"> ' + rendez.time.hours + ':' + rendez.time.minutes + '</p>\n' +
                            '                            </div>\n' +
                            '                            <div class="col  my-auto ">\n' +
                            '                                <button class="btn"><span style="color: rgb(104, 229, 238);"><i class="fas fa-pen"></i></span>\n' +
                            '                                </button>\n' +
                            '                                /\n' +
                            '                                <button class="btn"><span style="color: red;"><i class="far fa-trash-alt"></i></span>\n' +
                            '                                </button>\n' +
                            '                            </div>\n' +
                            '                        </div>\n' +
                            '                        <div class="w-100 border"></div>';



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
        } )}
}

