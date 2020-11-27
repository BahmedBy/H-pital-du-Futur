$(document).ready(function () {
    $("#seconde").hide();
    $('tr').click(function () {
        var id = $(this).data('value');
        var type = $(this).data('type');

        if (typeof id != "undefined")
            var data = {
                id: id,
                type: type
            };
        $("#first").hide();

        detail(data,"seconde");
    });

    $("#ajoute").click(function () {
        $("#seconde").append(' <div>' +
            '      <p class="h4" id="back"><span class="fas fa-arrow-left mr-3"></span>Membre pages</p><br/>' +
            '    </div>' +
            '    <form class="shadow  my-auto bg-white divcontenu" action="/ChefServiceAjouteMembre">' +
            '      <div class="container divcontainer ">' +
            '        <p class="h4" id="Membrepages">Medecin</p>' +
            '<div id="Medecin"></div>' +
            '</div>' +
            ' <div class="container divcontainer "i>' +
            '<p class="h4" id="Membrepages" id="Infermiere">Infermiere</p>' +
            '<div id="Infermiere"></div>' +
            '</div>' +
            '    <div class="form-group formstyle"> ' +
            '       <input class="btn btn-success float-right" type="submit" value="Ajoute" name="submit"> ' +
            '       </div> ' +
            '</form>');
        $("#first").hide();
        $("#seconde").show();
        $("#back").click(function () {
                backtofirst(1)
            }
        );
        $(':input[type="submit"]').prop('disabled', true);
        getPersoneMidical("Medecin");
        getPersoneMidical("Infermiere");

    })
});

function getPersoneMidical(type) {
    if (!jQuery.isEmptyObject(type)) {
        var id = "#" + type;
        $.ajax({
            url: "/ChefService/" + type + "Libre",
            beforeSend: function () {
                $(id).append('<div class="divanimation"><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
            },
            success: function (data) {
                var add;
                if (jQuery.isEmptyObject(data)) {

                    add = '<div class="divanimation"><p class="h4"><div class="mainAnimation">' +
                        '<p class="h5 text-center">No ' + type + ' Libre </p>' +
                        '</div>';
                }
                else {
                    $(':input[type="submit"]').prop('disabled', false);
                    add = ' <div class="row border-bottom border-top font-weight-bold divrow">' +
                        '    <div class="col-1">#</div> <div class="col-sm">Id</div>' +
                        '<div class="col-sm">Photo</div><div class="col-sm">Nom</div><div class="col-sm">Prenom </div> '
                    if (type === "Medecin")
                        add = add + '<div class="col-sm">Sepiciality </div>';
                    add = add + '</div>';

                    $.each(data, function (k, v) {
                            add = add + '<label for="' + v.id + '" class="row divrow border-bottom"><div class="col-1 my-auto">' +
                                '<input type="checkbox" name="' + type + '" id="' + v.id + '" value="' + v.id + '"/>' +
                                '    </div>' +
                                '        <div class="col-sm my-auto">' + v.id +
                                '</div>' +
                                '      <div class="col-sm my-auto" >' +
                                '      <img src="' + v.photo + '" width="50" height="50"  class="rounded-circle  shadow-sm">' +
                                '    </div>' +
                                '        <div class="col-sm my-auto">' + v.nom +
                                '</div>' +
                                '        <div class="col-sm my-auto">' +
                                v.prenom +
                                ' </div>';
                            if (type === "Medecin")
                                add = add + '<div class="col-sm my-auto">' + v.sepiciality + ' </div>';
                            add = add + '</label>';

                        }
                    );
                    add = add + '</div>';

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