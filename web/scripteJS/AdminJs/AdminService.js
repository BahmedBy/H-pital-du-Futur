var servces;
$(document).ready(function () {
    $("#seconde").hide();
    $("#thered").hide();

    $("#ajoute").click(function () {
        $("#first").hide();
        ajouteServiceForm("#seconde")
        $("#seconde").show();
    });
    $("tr").click(function () {
        $("#first").hide();
        var service = $(this).data('value');
        if (typeof service != "undefined")
            detailService(service,"#seconde");
    });
    $("#getchembreList").click(function () {
        $("#first").hide();

        $("#seconde").append('<div>' +
            '<p class="h4" id="back"><span class="fas fa-arrow-left mr-3"></span>Servces pages</p><br/>' +
            '</div>' +
            '<div class="shadow tablewidth my-auto bg-white divcontenu">' +
            '<div class="row ">' +
            ' <div class="col">' +
            '<p class="h4">List chembre</p></div>' +
            '<div class="col d-flex">' +
            '<button class="btn btn-success ml-auto align-self-center" id="ajoutechembre" style="margin-right: 2rem;"><span class="fas fa-plus mr-3"></span>Ajoute chembre</button></div>' +
            '</div>' +
            '<div id="chembreList" class="tablewidth my-auto bg-white divcontenu"></div></div>');
        $.ajax({
            url: "/listChembre",
            beforeSend: function () {
                $("#chembreList").append('<div class="divanimation"><p class="h4">List chembre </p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
            },
            success: function (data) {
                if (jQuery.isEmptyObject(data)) {
                    $("#chembreList").append('<div class="divanimation"><p class="h4">List chembre</p><div class="mainAnimation">' +
                        '<p class="h5 text-center">No chembre dans l\'hopitel</p>' +
                        '</div>')
                }
                else {
                    var add = '<table class="table table-hover rounded my-5 shadow-sm table-borderedless" id="table" >' +
                        '<tr >' +
                        '<th style="width: 10%">#</th>' +
                        '<th>Numero</th>' +
                        '<th>Plein</th>' +
                        '<th>service</th>';
                    +'<th> </th>';
                    var co = 1;
                    $.each(data, function (k, v) {
                        var button='';
                            add = add + ' <tr id="' + v.numero + '" >' +
                                '<td class="align-middle ">' + co + '</td>' +
                                '<td class="align-middle ">' + v.numero + '</td>';
                            if (v.plein === true)
                                add = add + '<td class="align-middle success">yes</td>';
                            else {
                                add = add + '<td class="align-middle success" class="align-middle success">No</td>';
                                  button='<td><span class="fas fa-pen" onclick="editchembre(\''+ v.numero + '\')" style=" cursor: pointer;"></span> / ' +
                                      '<span class="far fa-times-circle" style="color:red; cursor: pointer;" onclick="deleteChembre(\''+ v.numero + '\')"></span></td>';
                            }
                            if (jQuery.isEmptyObject(v.service))
                                add = add + '<td value="service" class="align-middle success">no affectée</td>';
                            else
                                add = add + '<td value="service" class="align-middle success">' + v.service.nom + '</td>';
                            add = add +button+ '</tr>';
                            co++;
                        }
                    );
                    add = add + '</table>';
                    $("#chembreList").empty();
                    $("#chembreList").append(add);
                    $("#back").click(function () {
                        backtofirst(1)
                    });

                }
            },
            error: function (e) {
                alert(e.responseText);
                console.log("ERROR: ", e);
            },
            done: function (e) {
                console.log("DONE");
            }
        })
        $("#ajoutechembre").click(function () {
            $("#first").hide();
            $("#seconde").hide();
            if (jQuery.isEmptyObject(servces))
                servces = '<option desible>no service exit</option>';
            $("#thered").append('<p class="h4" id="backtoChebre"><span class="fas fa-arrow-left mr-3"></span>ChembreList</p><form class="shadow  my-auto bg-white divcontenu" action="/AjouteChembres">' +
                '<p class="h4" > Ajoute chembre</p><br/>' +
                '<div id="chembreadd">' +
                '<div class="form-group row"  >' +
                '<label for="inputEmail3" class="col-sm-2 col-form-label">Numero chembre</label>' +
                '<div class="col">' +
                '<input type="text" class="form-control" id="inputEmail3" placeholder="Numero chembre" name="Numerochembre">' +
                '</div>' +
                '<label for="inputEmail3" class="col-sm-1 col-form-label" >service</label>' +
                '<div class="col">' +
                '<select  class="form-control" name="service">' +
                '<option value="null" selected>no affecter</option>' +
                '<optgroup label="servces" id="servcesListOption"></optgroup>' + servces +
                '</select>' +
                '</div>' +
                '<div class="col-0">' +
                '<button class="btn ml-auto align-self-center" type="button" onclick="plus()" style="margin-right: 2rem;"><span class="fas fa-plus" ></span></button></div>' +
                '</div></div>' +
                '<div class="form-group formstyle">' +
                '<input class="btn btn-success float-right" type="submit" value="Ajoute" name="submit">' +
                '</div>' +
                '</div>' +
                '</form>');
            $("#thered").show();
            $("#backtoChebre").click(function () {
                backtoseconde(1)
            });
        });
        $("#seconde").show();
    });

    function ajouteServiceForm(elem) {
        $(elem).append('<p class="h4" id="back"><span class="fas fa-arrow-left mr-3"></span>Servces pages</p><form class="border rounded shadow formstyle" action="AjouteService" enctype="multipart/form-data" >' +
            '  <fieldset class="border formstyle">' +
            '   <p class="h4">service</p>' +
            '  <div class="form-group row ">' +
            '    <label for="service" class="col-sm-2 col-form-label" >nom Service</label>' +
            '    <div class="col-sm-10">' +
            '      <input type="text" class="form-control" id="nomService" placeholder="service" name="service" required >' +
            '    </div>' +
            '  </div>' +
            '  </fieldset>' +
            '  <fieldset class="border formstyle">' +
            '  <p class="h4">chef service</p>' +
            '  <div id="ChefService">' +
            '    <div class="form-group row" >' +
            '    <label for="nomService" class="col-sm-2  col-form-label">chef service</label>' +
            '    <div class="col">' +
            '      <select class="form-control" id="nomChefService" name="chefService">' +
            '</select>' +
            '    </div>' +
            '     <div class="col-md-auto">' +
            ' <button class="btn btn-success ml-auto align-self-center" id="ajouteChef" type="button" style="margin-right: 2rem;"><span class="fas fa-plus mr-3"></span>Ajoute noveau chef de service</button></div>' +
            '    </div>' +
            '  </div>' +
            '  </fieldset>' +
            '  <fieldset class="border formstyle" >' +
            '  <p class="h4">chember liste</p>' +
            '  <div class="form-group divcontenu" id="listChembreNoAficcte">' +
            '</div>' +
            '  </fieldset>' +
            '  <div class="form-group formstyle">' +
            '  <input class="btn btn-success float-right" type="submit" value="Ajoute" name="submit">' +
            '  </div>' +
            '</form>');
        $("#back").click(function () {
            backtofirst(1)
        });

        chesfServiceLibre('#nomChefService');
        $.ajax({
            url: "/ChembreLibre",
            beforeSend: function () {
                $("#listChembreNoAficcte").append('<div class="divanimation"><p class="h4">List chembre </p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
            },
            success: function (data) {
                var chembreLibre = '';
                var co = 0;
                if (jQuery.isEmptyObject(data))
                    chembreLibre = '<p class="h4">no chembre libre </p>';
                $.each(data, function (k, v) {
                    co++;
                    if (co === 1) chembreLibre = chembreLibre + '<div class="row">';
                    chembreLibre = chembreLibre + '<div class="custom-control custom-checkbox col " >' +
                        '<input type="checkbox" class="custom-control-input " name="chmebre" value="' + v + '" id="' + v + '"> ' +
                        '<label class="custom-control-label " for="' + v + '">' + v + '</label> </div>';
                    if (co === 4) {
                        chembreLibre = chembreLibre + '</div>';
                        co = 0;
                    }

                })
                $("#listChembreNoAficcte").empty();
                $("#listChembreNoAficcte").append(chembreLibre);
            },
            error: function (e) {
                alert(e.responseText);
                console.log("ERROR: ", e);
            },
            done: function (e) {
                console.log("DONE");
            }
        })
        $("#ajouteChef").click(function () {
                $("#ChefService").empty();
                $("#ChefService").append('<div class="form-group row"><label for="inputEmail3" class="col-sm-2 col-form-label">Nom</label><div class="col">' +
                    '<input type="text" class="form-control" id="inputEmail3" placeholder="Nom" name="nom"></div><label for="inputEmail3" class="col-sm-1 col-form-label" >' +
                    'Preom</label><div class="col"><input type="text" class="form-control" id="inputEmail3" placeholder="Preom" name="prenom"></div></div>' +
                    '<div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Email</label><div class="col-sm-10">' +
                    '<input type="Email" class="form-control" id="inputPassword3" placeholder="Email@a.com" name="email"></div></div>' +
                    '<div class="form-group row"><label for="inputPassword3" class="col-sm-2 col-form-label">Telphone Numbre</label><div class="col-sm-10">' +
                    '<input type="number" class="form-control"  placeholder="Telphone Numbre" name="TelNumbre"></div></div><div class="form-group row"><label ' +
                    'for="inputPassword3" class="col-sm-2 col-form-label">Date de naissance</label><div class="col-sm-10"><input type="date" class="form-control"  ' +
                    'id="DatedeNai" placeholder="Telphone Numbre" name="DatedeNai"> </div></div><div  id="divTypeUser"  class="form-group row"><label for="inputPassword3" ' +
                    'class="col-sm-2 col-form-label">Gender</label><div class="col"><select  class="form-control" name="gender"><option value="Male">Male</option><option ' +
                    'value="Femme">Femme</option></select></div></div><div class="input-group mb-3 row"><label class="col-sm-2 col-form-label">Photo</label><div class="custom-file">' +
                    '<input type="file" class="custom-file-input" ><label class="custom-file-label " for="inputGroupFile01">Choose Photo</label></div><div class="input-group-prepend">' +
                    '<span class="input-group-text fas fa-file-upload"></span></div></div>')
            }
        )
    }

});
function  editchembre(div) {
    var id="#"+div;
    $(id).find("[value='service']").empty();
    $(id).find("[value='service']").append("<select id='changeService' class='form-control'><option selected></option><option value='0'>no afficte</option>"+servces+"</select>");
    $("#changeService").change(function () {
        var service=$(this).val();
        if (service!="")
        {  var text=  $("#changeService option:selected").text();
        $(id).find("[value='service']").empty();
        console.log(text);
        $(id).find("[value='service']").html(text);
        var data= {
            idService: service,
            numero: div
        };
        afficteChembre(data)
    }})
}
function plus() {
    $("#chembreadd").append('<div class="form-group row"><label for="inputEmail3" class="col-sm-2 col-form-label">Numero chembre</label><div class="col"><input type="text" class="form-control" id="inputEmail3" placeholder="Numero chembre" name="Numerochembre"></div><label for="inputEmail3" class="col-sm-1 col-form-label" >service</label><div class="col"><select class="form-control" name="service"><option value="null" selected>no affecter</option><optgroup label="servces" id="servcesListOption"></optgroup>' + servces + '</select> </div><div class="col-0"><button class="btn ml-auto align-self-center" onclick="plus()" type="button" style="margin-right: 2rem;"><span class="fas fa-plus" ></span></button></div></div></div>');
};

function chesfServiceLibre(div) {
    if (typeof div != "undefined")
        $.ajax({
            url: "/chefserviceNotAficte",
            success: function (data) {
                if (jQuery.isEmptyObject(data)) {

                    $(div).append('<option value="0" disabled>no chef service libre exsit</option>');
                }
                $.each(data, function (k, v) {
                    var o = new Option(v.nom + " " + v.prenom, v.id);
                    $(o).attr('data-value',v.photo);
                    $(o).attr('id',v.id);
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
}
function deleteChembre(numero) {
    var id ="#"+numero;
    $(id).remove();
    if(typeof numero!="undefined")
        $.ajax({
                url: "/suppremeChembre",
                type:"post",
                data:{numero:numero}
            }
        )
}