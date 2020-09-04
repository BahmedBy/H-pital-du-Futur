var info = new Map();
var idService;
var chefService;
function detailService(id_Service, div) {
    $.ajax({
        url: "/detailService",
        data: {idService: id_Service},
        beforeSend: function () {
            $(div).empty();

            $(div).append('<p class="h3 " id="back"><span class="fas fa-arrow-left mr-3"></span> Service Page</p><br />' +
                '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
            $(div).show();
            $("#back").click(function () {
                backtofirst(1)
            });
        },
        success: function (data) {
            idService = data.id;
            chefService = data.chefService;
            var add =
                '            <p class="h4">Service Information</p><br />' +
                '            <div class="container divcontenu border ">' +
                '                <div class="row divcontenu">' +
                '                    <div class="col-sm-3">' +
                '                        <label for="staticEmail" class="col-form-label">ID de Service</label></div>' +
                '                    <div class="col">' +
                '                        <input type="text" readonly class="form-control-plaintext" id="id" name="id"' +
                '                            value=" ' + data.id + ' ">' +
                '                    </div>' +
                '                </div>' + '<div class="row divcontenu">' +
                '                    <div class="col-sm-3">' +
                '                        <label for="staticEmail" class="col-form-label">Nom de Service</label></div>' +
                '                    <div class="col">' +
                '                        <input type="text" readonly class="form-control-plaintext" id="Nom" name="name"' +
                '                            value=" '+ data.nom +' ">' +
                '                    </div>' +
                '                    <div class="col-sm-2">' +
                '                        <button class="btn " type="button" name="edit" onclick="d(\'#Nom\')"><span class="fas fa-pen"></span></button>' +
                '                    </div>' +
                '                </div>' +
                '                <div class="row divcontenu">' +
                '                    <div class="col-sm-3 my-auto">' +
                '                        <label for="staticEmail" class="col-form-label">Chef de Service</label></div>' +
                '                    <div class="col-sm-1 my-auto">' +
                '                        <img src="' + data.chefService.photo + '" width="50"' +
                '                            class="mr-3 rounded-circle img-thumbnail shadow-sm">' +
                '                    </div>' +
                '                    <div class="col my-auto">' +
                '                        <input type="text" readonly class="form-control-plaintext" id="cs" value="' + data.chefService.nom + ' ' + data.chefService.prenom + '">' +
                '                    </div>' +
                '                    <div class="col-sm-2 my-auto">' +
                '                        <button class="btn " name="edit" type="button" onclick="changeChefService(\'#cs\')"><span' +
                '                                class="fas fa-pen"></span></button>' +
                '                    </div>' +

                '                </div>' +
                '            </div>';
            if (jQuery.isEmptyObject(data.chembres)) {
                add = add + ' <div  class="container divcontenu border ">\n' +
                    '                <div id="chembre">\n' +
                    '                <div class="row">\n' +
                    '                    <p class="h5 col ">Liste Chembre</p>\n' +
                    '                    <div class="col d-flex">\n' +
                    '                        <button class="btn btn-success ml-auto align-self-center" id="Affectechembre"\n' +
                    '                            style="margin-right: 2rem;"><span class="fas fa-plus mr-3"></span>Ajoute\n' +
                    '                            chembre</button></div>\n' +
                    '                </div></div>' +
                    '<p>no chembre dans les service</p></div>';
            } else {
                add = add + ' <p>list chembre</p><table class="table table-hover table-striped tablewidth separator"><tr>' +
                    '<th>Numero</th> <th>Etat</th><th></th></tr>';
                $.each(data.chembres, function (k, v) {
                    var plein = 'no';
                    if (v.plein)
                        plein = 'oui';

                    add = add + '   <tr id="' + v.numero + '">' +
                        ' <td>' + v.numero + '</td>' +
                        '     <td>' + plein + '</td>' +
                        ' <td>';
                    if (!v.plein)
                        add = add + ' <span onclick="supprrimeChmbre(\'' + v.numero + '\')"  class="far fa-times-circle" style="color: red; font-size:1.2rem;' +
                            ' cursor: pointer;"></span>';
                    add = add + '</td></tr>';
                });
                add = add + '</table></div>';
            }
            add = add + ' <div class=" divcontenu d-flex flex-row-reverse"> <div class="row p-2">\n' +
                '                    <button class="btn btn-danger  "  id="suppreme" data-toggle="modal"\n' +
                '                        data-target="#modelaffich" style="margin-left: 1rem"><span\n' +
                '                            class="far fa-trash-alt mr-3"></span>Suppreme</button></div></div></form>';
            $('#infomation').empty();
            $('#infomation').append(add);
            ajouteModel('#infomation');

            $("#suppreme").click(function () {
                    $("#Title").text("suppreme Membre");
                    $("#modelbody").empty();
                    $("#modelbody").append('<form action="/detailService" method="post"><input type="hidden" name="id" value="'+idService+'"/>' +
                      '<p class="h5">Êtes-vous sûr de vouloir supprimer cette service?</p>' +
                        '</form>')});
        },
        error: function (e) {
            alert(e.responseText);
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });
    $('#Affectechembre').click(function () {
        $('#chembre').append('<div class="row divcontenu"><label class="col-form-label col">Choisir Chembre:</label><select class="col form-control" id="chembreLibre"></select>' +
            '<div class="col-sm-2"><button class="btn " name="ok" id="ok" ><span class="fas fa-check" style="color:green"></span></button></div></div>');
        var chembre;
        var div = '#chembreLibre';
        $.ajax({
            url: "/ChembreLibre",
            success: function (data) {
                if (jQuery.isEmptyObject(data)) {
                    $(div).append('<option value="0" disabled>no chef service libre exsit</option>');
                }
                chembre = date;
                $.each(data, function (k, v) {
                    var o = new Option(v.nom + " " + v.prenom, v.id);

                    $(div).append(o);
                })

            },
            error: function (e) {
                alert(e.responseText);
                console.log("ERROR: ", e);
            },
            done: function (e) {
                console.log("DONE");
            }
        });
        $('#ok').click(function () {
            var numero = $('#chembreLibre').val();
            if ((numero != 0) || (numero != '')) {
                var v;
                $.each(chembre, function (k, p) {
                    if (p.numero === numero)
                        v = p;
                });
                var plein = 'no';
                if (v.plein)
                    plein = 'oui';
                $.ajax({
                    url: "/Affictechembre",
                    methode: "POST",
                    data: {
                        idService: idService,
                        numero: numero
                    },
                    error: function (e) {
                        alert(e.responseText);
                        console.log("ERROR: ", e);
                    },
                    done: function (e) {
                        console.log("DONE");
                    }
                });
                var table = $('#formid').find('table');
                if (typeof table === "undefined") {
                    $('#formid').append(' <table class="table table-hover table-striped tablewidth separator"><tr>' +
                        '<th>Numero</th> <th>Etat</th><th></th></tr></table>');
                }
                table.append(' <tr id="' + v.numero + '"><td>' + v.numero + '</td> <td>' + plein + '</td><td><span onclick="supprrimeChmbre(\''+ v.numero +'\')" class="far fa-times-circle" style="color: red; font-size:1.2rem;' +
                    '  cursor: pointer;"></span></td></tr>');

            }
        })
    })

}

function supprrimeChmbre(Chmbre) {
    Chmbre = "#" + Chmbre;
    console.log(Chmbre  );
    $(Chmbre).remove();
    $.ajax({
        url: "/Affictechembre",
        type: "POST",
        data: {
            idService: 0,
            numero: Chmbre
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

function d(div) {
    info.set($(div).attr('name'), $(div).val());
    $(div).removeAttr('readonly');
    $(div).removeClass('form-control-plaintext');
    $(div).addClass('form-control');
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="ok" onclick="update(\'' + div + '\')"><span class="fas fa-check" style="color:green"></span></button><button class="btn " name="no" onclick="cancel(\'' + div + '\')"><span class="fas fa-times" style="color:red"></span></button></div>')
}

function update(div) {

    $.ajax({
        url: "/updateService",
        type: "POST",
        data: {
            idService:idService,
            nom: $(div).val()
        },

        error: function (e) {
            alert(e.responseText);
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });
    $(div).attr('readonly', true);
    $(div).removeClass('form-control');
    $(div).addClass('form-control-plaintext');
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="edit" onclick="d(\'' + div + '\')"><span class="fas fa-pen"></span></button></div>');
}

function cancel(div) {
    $(div).attr('readonly', true);
    $(div).val(info.get($(div).attr('name')));
    $(div).removeClass('form-control');
    $(div).addClass('form-control-plaintext');
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="edit" onclick="d(\'' + div + '\')"><span class="fas fa-pen"></span></button></div>');
}

function changeChefService(div) {
    info.set('chefService', $(div).val());
    info.set('photo', $(div).parent().parent().find('.col-sm-1').find('img').attr('src'));
    var parent = $(div).parent().parent();
    parent.find('.col-sm-1').remove();
    parent.find('.col-sm-2').remove();
    $(div).parent().remove();
    parent.append('<div class="col"><select class=" form-control" id="cs"><option id="' + chefService.id + '" value="' + chefService + '" selected>' + chefService.nom + ' ' + chefService.prenom + '</option></select></div>');
    parent.append('<div class="col-sm-2"><button class="btn " name="ok" onclick="updateChefService(\'#cs\')"><span class="fas fa-check" style="color:green"></span></button><button class="btn " name="no" onclick="cancelChefService(\'#cs\')"><span class="fas fa-times" style="color:red"></span></button></div>')
    chesfServiceLibre('#cs');
}

function updateChefService(div) {
    var cfId = $(div).val();
    var optionId = '#' + cfId;
    var cfName = $(div).find(optionId).text();
    var photo = $(div).find(optionId).data('value');
    var parent = $(div).parent().parent();
    $(div).parent().remove();
    parent.find('.col-sm-2').remove();
    parent.append('<div class="col-sm-1 my-auto"><img src="' + photo + '" width="50"class="mr-3 rounded-circle img-thumbnail shadow-sm"></div>' +
        '<div class="col my-auto"><input type="text" readonly class="form-control-plaintext" id="cs" value="' + cfName + '"></div>')
    parent.append('<div class="col-sm-2"><button class="btn " name="edit" onclick="changeChefService(\'#cs\')"><span class="fas fa-pen"></span></button></div>');
    var data = {
        idService: idService,
        chefService: cfId
    };
    $.ajax({
        url: "/ChembreLibre",
        type: "POST",
        data: data,
        error: function (e) {
            alert(e.responseText);
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });

}

function cancelChefService(div) {
    var parent = $(div).parent().parent();
    $(div).parent().remove();
    parent.find('.col-sm-2').remove();
    parent.append('<div class="col-sm-1 my-auto"><img src="' + info.get('photo') + '" width="50"class="mr-3 rounded-circle img-thumbnail shadow-sm"></div>' +
        '<div class="col my-auto"><input type="text" readonly class="form-control-plaintext" id="cs" value="' + info.get('chefService') + '"></div>');
    parent.append('<div class="col-sm-2"><button class="btn " name="edit" onclick="changeChefService(\'#cs\')"><span class="fas fa-pen"></span></button></div>');
}
