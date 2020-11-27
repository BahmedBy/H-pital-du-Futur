$(document).ready(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    $('#dss').empty();
    var minDate = year + '-' + month + '-' + day;

    $('#dateInput').attr('min', minDate);
    $('#dateInput').val(minDate);
    $('#dateInput').change(function () {
        $("#dateRendewVous").empty();
        $("#dateRendewVous").html($(this).val());
        RendezVousofDate($(this).val())
    })

});

function RendezVousofDate(date) {
    {
        var id = "#redezvous";
        $(id).empty();
        console.log(id);
        $.ajax({
            url: "/Rendez-vousofdate",
            data: {date: date},

            beforeSend: function () {
                $(id).append('<div class="divanimation"><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
            },
            success: function (rendez) {
                console.log(rendez);
                var add;
                if (jQuery.isEmptyObject(rendez)) {

                    add = '<p class="h5 text-center">no Rendez vous en  ' + date + ' </p>';
                }
                else {

                    add =
                        '<div >' +
                        '                        <div class="row  divcontenu ">' +

                        '                            <div class="col-3 my-auto ">' +
                        '                                <p class="h5">partient </p>' +
                        '                            </div>' +
                        '                            <div class="col-3 my-auto ">' +
                        '                                <p class="h5">Medcin</p>' +
                        '                            </div>' +
                        '                            <div class="col  my-auto ">' +
                        '                                <p class="h5"> Date</p>' +
                        '                            </div>' +
                        '                            <div class="col  my-auto ">' +
                        '                                <p class="h5"> Temp</p>' +
                        '                            </div>' +
                        '                            <div class="col  my-auto ">' +
                        '' +
                        '                            </div>' +
                        '                        </div>' +
                        '                        <div class="w-100 border"></div>'
                    ;
                    $.each(rendez, function (k, v) {

                        add = add + '  <div class="row divcontenu my-auto" id="' + v.id + '" data-value="' + v.medecin.id + '" data-patient="' + v.patient.id + '">' +
                            '                            <div class="col-3 ">' +
                            '                                <div class="row">' +
                            '                                    <div class="col my-auto">' +
                            '                                        <img src="' + v.patient.photo + '" width="50" height="50"' +
                            '                                             class="rounded-circle  shadow-sm ">' +
                            '                                    </div>' +
                            '                                    <div class="col my-auto">' +
                            '                                        <p class="h6 row">' + v.patient.nom + '</p>' +
                            '                                        <p class="h6 row">' + v.patient.prenom + '</p>' +
                            '                                        <p class="text-info font-italic row" >Id:' + v.patient.id + '</p>' +
                            '                                    </div>' +
                            '                                </div>' +
                            '                            </div>' +
                            '                            <div class="col-3 my-auto">' +
                            '                                <div class="row">' +
                            '                                    <div class="col my-auto">' +
                            '                                        <img src="' + v.medecin.photo + '" width="50" height="50"' +
                            '                                             class="rounded-circle  shadow-sm ">' +
                            '                                    </div>' +
                            '                                    <div class="col my-auto">' +
                            '                                        <p class="h6 row">' + v.medecin.nom + '</p>' +
                            '                                        <p class="h6 row">' + v.medecin.prenom + '</p>' +
                            '                                    </div>' +
                            '                                </div>' +
                            '                            </div>' +
                            '                            <div class="col  my-auto ">' +
                            '                                <input name="date" type="date" class="form-control-plaintext" readonly value="' + v.date + '">' +
                            '                            </div>' +
                            '                            <div class="col  my-auto "> ' +
                            '                               <input  name="time" class="form-control-plaintext" readonly value="' + v.time + '">' +
                            '                            </div>' +
                            '                            <div class="col my-auto " value="btn">' +
                            '                                <button class="btn"><span style="color: rgb(104, 229, 238);" onclick="Modify(' + v.id + ')"><i class="fas fa-pen"></i></span>' +
                            '                                </button>' +
                            '                                /' +
                            '                                <button class="btn"><span style="color: red;" onclick="Annuler(' + v.id + ')"><i class="far fa-trash-alt"></i></span>' +
                            '                                </button>' +
                            '                            </div>' +
                            '                        </div>' +
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
        })
    }
}

var info = new Map();

function Modify(idRendez) {
    id = "#" + idRendez;
    var temp = $(id).find('input[name=time]');
    var date = $(id).find('input[name=date]');
    date.removeAttr('readonly');
    date.removeClass('form-control-plaintext');
    date.addClass('form-control');
    tempval = temp.val();
    dateval = date.val();
    parent = temp.parent();
    parent.empty();
    parent.append('<select class="form-control custom-select" name="temp"><option>' + tempval + '</option></select>');
    $(id).find('[value=btn]').empty();
    $(id).find('[value=btn]').append('<button class="btn " name="ok" onclick="update(' + idRendez + ')"><span class="fas fa-check" style="color:green"></span></button><button class="btn " name="no" onclick="cancel(' + idRendez + ')"><span class="fas fa-times" style="color:red"></span></button>');
    var patient = $(id).data('patient');
    var medecin = $(id).data('value');
    var data = {
        idPatient: patient,
        idMedcin: medecin,
        date: dateval
    };
    var oldValue = {
        date: dateval,
        temp: tempval
    };
    info.set(idRendez, oldValue);
    TempLibre(data);
    date.change(function () {
        $(id).find('select[name=temp]').empty();
        data.date = $(this).val();
        TempLibre(data)
    })

}

function Annuler(idRendez) {
    id = "#" + idRendez;
    $(id).next().remove();
    $.ajax({
        url: "/deletRendezVous",
        data: {idRendezVous: idRendez},
        success: function (rendez) {
        },
        error: function (e) {
            alert(e.responseText);
            console.log("ERROR: ", e);

        },
        done: function (e) {
            console.log("DONE");
        }
    });
    $(id).next().remove();
    $(id).remove();
}

function update(idRendez) {
    id = "#" + idRendez;
    var temp = $(id).find('select[name=temp]');
    var date = $(id).find('input[name=date]');
    tempval = temp.val();
    dateval = date.val();
    parent = temp.parent();
    parent.empty();
    parent.append('<input  name="time" class="form-control-plaintext" readonly value="' + tempval + '">')
    date.attr('readonly', true);
    date.removeClass('form-control');
    date.addClass('form-control-plaintext');
    $(id).find('[value=btn]').empty();
    $(id).find('[value=btn]').append('<button class="btn"><span style="color: rgb(104, 229, 238);" onclick="Modify(' + idRendez + ')"><i class="fas fa-pen"></i></span></button>' +
        '/<button class="btn"><span style="color: red;" onclick="Annuler(' + idRendez + ')"><i class="far fa-trash-alt"></i></span></button>');
    $.ajax({
        url: "/UpdateRendezVous",
        type:"post",
        data: {
            id: idRendez,
            date: dateval,
            temp: tempval
        }
    })
}

function cancel(idRendez) {
    id = "#" + idRendez;
    var temp = $(id).find('select[name=temp]');
    var date = $(id).find('input[name=date]');
    parent = temp.parent();
    parent.empty();
    parent.append('<input  name="time" class="form-control-plaintext" readonly value="' + info.get(idRendez).temp + '">')
    date.attr('readonly', true);
    date.removeClass('form-control');
    date.addClass('form-control-plaintext');
    date.val(info.get(idRendez).date);
    $(id).find('[value=btn]').empty();
    $(id).find('[value=btn]').append('<button class="btn"><span style="color: rgb(104, 229, 238);" onclick="Modify(' + idRendez + ')"><i class="fas fa-pen"></i></span></button>' +
        '/<button class="btn"><span style="color: red;" onclick="Annuler(' + idRendez + ')"><i class="far fa-trash-alt"></i></span></button>');

}

function gettempLibre(data) {
    return $.ajax({
        url: "/Templibre",
        data: data,

    });

}

function TempLibre(data) {
    var option = '';
    gettempLibre(data).done(function (data) {
        if (jQuery.isEmptyObject(data))
            option = '<option desible>no temp libre</option>';
        else
            $.each(data, function (k, v) {
                option = option + '<option>' + v + '</option>';
            });
        $(id).find('select[name=temp]').append(option);

    });
}