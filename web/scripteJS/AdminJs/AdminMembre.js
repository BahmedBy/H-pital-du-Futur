$(document).ready(function () {
    $('#resultBlock').hide();
    $("#ajoute").click(function () {
        $("#first").hide();
        $("#seconde").append('  <div>' +
            '<p class="h4" id="Membrepages"><span class="fas fa-arrow-left mr-3"></span>Membre pages</p><br/>' +
            '</div>' +
            '<form class="shadow  my-auto bg-white divcontenu" action="AdminAjouteMembre" method="post" enctype="multipart/form-data">' +
            '            <p class="h4"> Ajoute Membre</p><br/>' +
            '            <div class="form-group row">' +
            '                <label for="inputEmail3" class="col-sm-2 col-form-label">Nom</label>' +
            '                <div class="col">' +
            '                    <input type="text" class="form-control" id="inputEmail3" placeholder="Nom" name="nom" required>' +
            '                </div>' +
            '                <label for="inputEmail3" class="col-sm-1 col-form-label">Preom</label>' +
            '                <div class="col">' +
            '                    <input type="text" class="form-control" placeholder="Preom" name="prenom" required>' +
            '                </div>' +
            '            </div>' +
            '            <div class="form-group row">' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Email</label>' +
            '                <div class="col-sm-10">' +
            '                    <input type="Email" class="form-control" id="inputPassword3" placeholder="Email@a.com" name="email" required>' +
            '                </div>' +
            '            </div>' +
            '            <div class="form-group row">' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Telphone Numbre</label>' +
            '                <div class="col-sm-10">' +
            '                    <input type="number" class="form-control" placeholder="Telphone Numbre" name="telNumbre">' +
            '                </div>' +
            '            </div>' +
            '            <div class="form-group row">' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Date de naissance</label>' +
            '                <div class="col-sm-10">' +
            '                    <input type="date" class="form-control" id="DatedeNai" required placeholder="Date de naissance"' +
            '                           name="DatedeNai">' +
            '                </div>' +
            '            </div>' +
            '            <div id="divTypeUser" class="form-group row">' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Gender</label>' +
            '                <div class="col">' +
            '                    <select class="form-control" name="gender">' +
            '                        <option value="Male">Male</option>' +
            '                        <option value="Femme">Femme</option>' +
            '                    </select>' +
            '                </div>' +
            '                <label for="inputPassword3" class="col-sm-2 col-form-label">Type</label>' +
            '                <div class="col">' +
            '                    <select class="form-control" id="TypeUser" name="typeUser">' +
            '                        <option value="ChefService">Chef Service</option>' +
            '                        <option value="Medecin">Medecin</option>' +
            '                        <option value="Infermiere">Infermiere</option>' +
            '                    </select>' +
            '                </div>' +
            '            </div>' +
            '            <div class="input-group mb-3 row">' +
            '                <label class="col-sm-2 col-form-label">Photo</label>' +
            '                <div class="custom-file">' +
            '                    <input type="file" class="custom-file-input" name="photo">' +
            '                    <label class="custom-file-label ">Choose Photo</label>' +
            '                </div>' +
            '                <div class="input-group-prepend">' +
            '                    <span class="input-group-text fas fa-file-upload"></span>' +
            '                </div>' +
            '            </div>' +
            '            <div class="form-group formstyle">' +
            '                <input class="btn btn-success float-right" type="submit" value="Ajoute" name="submit">' +
            '            </div>' +
            '        </form></div>');
        $("#Membrepages").click(function () {
            $("#seconde").empty();
            $("#first").show();
        });
        DatedeNai();

        $("#TypeUser").change(
            function () {

                var value = $(this).val();
                if (value == "Medecin") {
                    $("#divTypeUser").after('<div class="form-group row" id="Sepciality" name="Sepciality"><label for="inputPassword3" class="col-sm-2 col-form-label">Sepciality</label><div class="col-sm-10"><input type="text" class="form-control"  id="DatedeNai" placeholder="Sepciality" name="Sepciality"></div></div>')
                } else {
                    $("#Sepciality").remove();
                }
            }
        );
    });
    $("#selector").change(function () {
        $("#type").empty();
        if ($(this).val() == "id") {

            $("#type").append('<div class="col"><label for="id" class="col-form-label float-left ">Id:</label></div><div class="col"><input type="text" name="id" id="id" class="form-control mb-2 mr-sm-2"></div></div>');
        }
        else {
            $("#type").append('<div class="col"><label for="id" class="col-form-label float-left ">nom:</label></div><div class="col"><input type="text" name="nom" id="id" class="form-control mb-2 mr-sm-2"></div><div class="col"><label for="id" class="col-form-label float-left ">prenom:</label></div><div class="col"> <input type="text" name="prenom" id="id" class="form-control mb-2 mr-sm-2"></div>');
        }

    });
    $("#obtenirCS").click(function () {
        var type = $(this).val();
        getPersoneMedical(type)
    });
    $("#obtenirM").click(function () {
        var type = $(this).val();
        getPersoneMedical(type)
    });

    $("#obtenirI").click(function () {
        var type = $(this).val();

        getPersoneMedical(type)
    });

    $("#chercher").click(function () {
        var data;
        console.log(';;');
        if ($("#selector").val() == "id") {
            var id=$("#id").val();
            if(typeof id!="undefined")
            data = {id: $("#id").val()}
        }
        else {
            var nom=$("#nom").val();
            var prenom=$("#prenom").val();
            if((typeof nom!="undefined")&&(typeof prenom!="undefined"))
            data = {
                nom:nom,
                prenom:prenom
            }
        }
        $('#resultBlock').show();
        if(typeof data!="undefined")
        grtMembre("resultBlock", data);
    });

});

function DatedeNai() {
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
}

function getPersoneMedical(type) {
    var id = "#" + type;
    $.ajax({
        url: "/personeMedical",
        data: {
            "type": type,
        },
        beforeSend: function () {
            $(id).empty();
            $(id).append('<div class="divanimation"><p class="h4">List' + type + '</p><div class="mainAnimation">' +
                '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
        },
        success: function (data) {
            $(id).empty();
            if (jQuery.isEmptyObject(data)) {
                $(id).append('<div class="divanimation"><p class="h4">List' + type + '</p><div class="mainAnimation">' +
                    '<p class="h5 text-center">No chef service dans l\'hopitel</p>' +
                    '</div>')
            }
            else {
                var add = '<p class="h4">List chef service</p><table class="table table-hover rounded my-5 shadow-sm table-borderedless" id="table" >' +
                    '<tr >' +
                    '<th style="width: 10%">#</th>' +
                    '<th style="width: 15%">Id</th>' +
                    '<th style="width: 15%">Photo</th>' +
                    '<th>nom</th>' +
                    '<th>Prenom</th>';
                if (type === "Medecin")
                    add = add + '<th>sepiciality</th>';
                add = add + '</tr>'

                var co = 1;
                $.each(data, function (k, v) {
                        add = add + ' <tr data-value="' + v.id + '" data-type="' + v.type + '" >' +
                            '<td class="align-middle ">' + co + '</td>' +
                            '<td class="align-middle ">' + v.id + '</td>' +
                            '<td class="align-middle "><img src="' + v.photo + '" width="50" height="50"  class="rounded-circle  shadow-sm"></td>' +
                            '<td class="align-middle " >' + v.nom + '</td>' +
                            '<td class="align-middle ">' + v.prenom + '</td>';
                        if (type === "Medecin")
                            add = add + ' <td class="align-middle ">' + v.speiciality + '</td>';
                        add = add + '</tr>';
                        co++;
                    }
                );

                add = add + '</table>';
                $(id).append(add);
                $('tr').click(function () {
                    alert($(this).data('type'));
                    var id = $(this).data('value');
                    var type = $(this).data('type');

                    if (typeof id != "undefined"){
                        var data = {
                            id: id,
                            type: type
                        };
                    $("#first").hide();
                    detail(data, "seconde");}
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
    });

}

function grtMembre(resulat, data) {
    var id = '#' + resulat;
    if (typeof data != 'undefined') {
        $.ajax({
            url: "/searchMembre",
            data: data,
            beforeSend: function () {
                $(id).empty();
                $(id).append('<div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
            },
            success: function (data) {
                $(id).empty();
                if (jQuery.isEmptyObject(data)) {
                    $(id).append('<div class="divanimation"><p class="h4"> Résultat</p><div class="mainAnimation">' +
                        '<p class="h5 text-center">Aucun résultat trouvé</p>' +
                        '</div>')
                }
                else {
                    var add = '<p class="h4">List chef service</p><table class="table table-hover rounded my-5 shadow-sm table-borderedless" id="table" >' +
                        '<tr >' +
                        '<th style="width: 10%">#</th>' +
                        '<th style="width: 15%">Id</th>' +
                        '<th style="width: 15%">Photo</th>' +
                        '<th>nom</th>' +
                        '<th>Prenom</th>';
                    '<th>type</th>';
                    add = add + '</tr>'

                    var co = 1;
                    $.each(data, function (k, v) {
                            add = add + ' <tr data-value="' + v.id + '" >' +
                                '<td class="align-middle ">' + co + '</td>' +
                                '<td class="align-middle ">' + v.id + '</td>' +
                                '<td class="align-middle "><img src="' + v.photo + '" width="50" height="50"  class="rounded-circle  shadow-sm"></td>' +
                                '<td class="align-middle " >' + v.nom + '</td>' +
                                '<td class="align-middle ">' + v.prenom + '</td>';
                            '<td class="align-middle ">' + v.type + '</td>';

                            add = add + '</tr>';
                            co++;
                        }
                    );
                    add = add + '</table>';


                }
                $(id).append(add);
                $('tr').click(function () {

                    affiche($(this).data('value'));
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