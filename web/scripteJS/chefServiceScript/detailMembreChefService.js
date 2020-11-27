function detail(data,div) {
    var id="#"+div;
    var idMedecin;
    var type;
    if (typeof data!="undefined")
    {
        $.ajax({
            url: "/allMembreInformation",
            data:data,
            beforeSend: function () {
                $(id).empty();

                $(id).append('<p class="h3" id="back"><span class="fas fa-arrow-left mr-3"></span> membre page Page</p><br />' +
                    '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
                $(id).show();
                $("#back").click(function (){backtofirst(1)});

            }
                ,
            success: function (data) {

                idMedecin=data.id;
                type=data.type;

                var add='<div class="divcontenu shadow">' +
                    '            <p class="h4">membre Information</p><br />' +
                    '            <div class="container divcontenu border ">' +
                    '                <div class="row">' +
                    '                    <div class="col-sm-3">' +
                    '                        <div class="row justify-content-center">' +
                    '                        <img src="'+data.photo+'" alt="..." width="140"' +
                    '                            class="mr-3 rounded-circle img-thumbnail shadow-sm "></div>' +

                    '                    </div>' +
                    '                    <div class="col">' +
                    '                        <div class=" row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Id</label>' +
                    '                            <div class="col">' +
                    '                                <input type="text" readonly class="form-control-plaintext" id="Id" value="'+data.id+'">' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Nom</label>' +
                    '                            <div class="col">' +
                    '                                <input type="text" readonly class="form-control-plaintext" id="Nom" name="name"' +
                    '                                    value="'+data.nom +'">' +
                    '                            </div></div>' +


                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Prenom</label>' +
                    '                            <div class="col">' +
                    '                                <input type="text" readonly class="form-control-plaintext" id="Prenom"' +
                    '                                    value="'+data.prenom +'">' +
                    '                            </div>' +

                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>' +
                    '                            <div class="col">' +
                    '                                <input type="teEmailt" readonly class="form-control-plaintext" id="Email"' +
                    '                                    value="'+data.email+'">' +
                    '                            </div>' +

                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">numero Telephone</label>' +
                    '                            <div class="col">' +
                    '                                <input type="number" name="numeroTel" readonly class="form-control-plaintext" id="numeroTelephone"' +
                    '                                    value="'+data.numeroTel +'"> </div>' +

                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Type</label>' +
                    '                            <div class="col">' +
                    '                                <input type="date" name="dateNaissance" readonly class="form-control-plaintext" id="type"' +
                    '                                value="2018-07-22"> </div>' +

                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Gender</label>' +
                    '                            <div class="col">' +
                    '                                <select type="gender" name="gender" disabled="disabled" readonly class="custom-select" id="Gender"' +
                    '                                    ><option selected>'+data.gender+'</option></select>' +
                    '                            </div>' +
                    '                        </div>';
                               if(data.type==="Medecin")
                                   add=add+'     <div class="row"><label for="staticEmail" class="col-sm-3 col-form-label">specialite</label>' +
                                       '  <div class="col"> <input type="text" readonly  name="specialite" class="form-control-plaintext" id="specialite"' +
                                       '   value="'+data.speiciality+'"> </div>' +
                                     '</div>';
                               add=add+  '</div>' +
                    '                </div>' +
                    '            </div>' +
                    '            <div class="form-group divcontenu d-flex flex-row-reverse">' +
                    '                <div class="row p-2">' +

                    '                    <button class="btn btn-danger  " type="button" id="suppreme" data-toggle="modal"' +
                    '                        data-target="#modelaffich" style="margin-left: 1rem"><span' +
                    '                            class="far fa-trash-alt mr-3"></span>Suppreme</button>' +
                    '                </div>' +
                    '            </div>' +
                    '        </div>';

                $(id).empty();
                $(id).append(add);
                ajouteModel(id) ;


                $("#suppreme").click(function () {
                    $("#Title").text("suppreme Membre");
                    $("#modelbody").empty();
                    $("#modelbody").append('<form action="/ChefServiceSupprimerMembre"><input type="hidden" name="id" value="'+idMedecin+'"/>' +
                        '<input type="hidden" name="type" value="'+type+'"/><p class="h5">Êtes-vous sûr de vouloir supprimer cette membre?</p>' +
                        '</form>');

                });
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
