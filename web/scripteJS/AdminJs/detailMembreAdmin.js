url="/UpdateMembre";
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

                $(id).append('<p class="h3 " id="back"><span class="fas fa-arrow-left mr-3"></span> Membre Page</p><br />' +
                    '  <div class="shadow tablewidth my-auto bg-white divcontenu " id="infomation"><div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div></div>');
                $(id).show();
                $("#back").click(function (){backtofirst(1)});
                },
            success: function (data) {
                console.log(data)
                var active;
                var button;
                idMedecin=data.id;
                type=data.type;
                if (data.active){
                     active="active";
                     button="block compte";
                }else{
                    active="block";
                    button="activer compte";
                }
                var add='<div class="divcontenu shadow">' +
                    '            <p class="h4">membre Information</p><br />' +
                    '            <div class="container divcontenu border ">' +
                    '                <div class="row">' +
                    '                    <div class="col-sm-3">' +
                    '                        <div class="row justify-content-center">' +
                    '                        <img src="'+data.photo+'" alt="..." width="140"' +
                    '                            class="mr-3 rounded-circle img-thumbnail shadow-sm "></div><br/>' +
                    '                            <div class="row justify-content-center">' +
                    '                                <input id="fileid" type="file" name="photo" hidden/>' +
                    '                                <button class="btn " name="edit" id="photo">Modifer photo</button>' +
                    '                                 </div>' +
                    '                    </div>' +
                    '                    <div class="col">' +
                    '                        <div class=" row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">compte</label>' +
                    '                            <div class="col">' +
                    '                                <input type="text" readonly class="form-control-plaintext" id="compte" value="'+active+'">' +
                    '                            </div>' +
                    '                        </div>' +'<div class="col">' +
                    '                        <div class=" row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Id</label>' +
                    '                            <div class="col">' +
                    '                                <input type="text" readonly class="form-control-plaintext" id="Id" value="'+data.id+'">' +
                    '                            </div>' +
                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Nom</label>' +
                    '                            <div class="col">' +
                    '                                <input type="text" readonly class="form-control-plaintext" id="Nom" name="nom"' +
                    '                                    value="'+data.nom +'">' +
                    '                            </div>' +
                    '                            <div class="col-sm-2">' +
                    '                                <button class="btn " name="edit" onclick="d(\'#Nom\')"><span class="fas fa-pen"></span></button>' +
                    '                                 </div>' +
                    '                      </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Prenom</label>' +
                    '                            <div class="col">' +
                    '                                <input type="text" nam="prenom" readonly class="form-control-plaintext" id="Prenom"' +
                    '                                    value="'+data.prenom +'">' +
                    '                            </div>' +
                    '                            <div class="col-sm-2">' +
                    '                                <button class="btn " name="edit" onclick="d(\'#Prenom\')"><span class="fas fa-pen"></span></button>' +
                    '                                 </div>' +
                    '                         ' +
                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>' +
                    '                            <div class="col">' +
                    '                                <input type="Email" name="email"  readonly class="form-control-plaintext" id="Email"' +
                    '                                    value="'+data.email+'">' +
                    '                            </div>' +
                    '                            <div class="col-sm-2">' +
                    '                                <button class="btn " name="edit" onclick="d(\'#Email\')"><span class="fas fa-pen"></span></button>' +
                    '                                 </div>' +
                    '                         ' +
                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">numero Telephone</label>' +
                    '                            <div class="col">' +
                    '                                <input type="number" name="numeroTel" readonly class="form-control-plaintext" id="numeroTelephone"' +
                    '                                    value="'+data.numeroTel +'"> </div>' +
                    '                                    <div class="col-sm-2">' +
                    '                                        <button class="btn " name="edit" onclick="d(\'#numeroTelephone\')"><span class="fas fa-pen"></span></button>' +
                    '                                         </div>' +
                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Date de Naissance</label>' +
                    '                            <div class="col">' +
                    '                                <input type="date" name="dateNaissance" readonly class="form-control-plaintext" id="date"' +
                    '                                value="'+data.dateNaissance+'"> </div>' +
                    '                                    <div class="col-sm-2">' +
                    '                                        <button class="btn " name="edit" onclick="d(\'#date\')"><span class="fas fa-pen"></span></button>' +
                    '                                         </div>' +
                    '                        </div>' +
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Gender</label>' +
                    '                            <div class="col">' +
                    '                                <select type="gender" name="gender" disabled="disabled" readonly class="custom-select" id="Gender"' +
                    '                                    ><option selected>'+data.gender+'</option></select>' +
                    '                            </div>' +
                    '                            <div class="col-sm-2">' +
                    '                                <button class="btn " name="edit" onclick="gender(\'#Gender\')"><span class="fas fa-pen"></span></button>' +
                    '                                 </div></div>'+
                    '                        <div class="row">' +
                    '                            <label for="staticEmail" class="col-sm-3 col-form-label">Type</label>' +
                    '                            <div class="col">' +
                    '                                <select type="gender" name="type" disabled="disabled" readonly class="custom-select" id="type"' +
                    '                                    ><option selected>'+data.type+'</option></select>' +
                    '                            </div>' ;
                if (data.type!="Medecin")
                    add=add+ '           <div class="col-sm-2">' +
                    '                                <button class="btn " name="edit" onclick="gender(\'#type\')"><span class="fas fa-pen"></span></button>' +
                    '                                 </div></div>';
                               if(data.type==="Medecin")
                                   add=add+'     <div class="row"<label for="staticEmail" class="col-sm-3 col-form-label">specialite</label>' +
                                       '  <div class="col"> <input type="text" readonly  name="specialite" class="form-control-plaintext" id="specialite"' +
                                       '   value="'+data.specialite+'"> </div>' +
                                       '  <div class="col-sm-2">' +
                                       ' <button class="btn " name="edit" onclick="d(\'#specialite\')"><span class="fas fa-pen"></span></button>' +
                                       '    </div></div>';
                               add=add+  '</div>' +
                    '                </div>' +
                    '            </div>' +
                    '            <div class="form-group divcontenu d-flex flex-row-reverse">' +
                    '                <div class="row p-2">' +
                    '                    <button class="btn btn-secondary " id="sortir" type="button" data-toggle="modal"' +
                    '                        data-target="#modelaffich"><span class="fas fa-plus mr-3"></span>'+button+'</button>' +
                    '                    <button class="btn btn-danger  " type="button" id="suppreme" data-toggle="modal"' +
                    '                        data-target="#modelaffich" style="margin-left: 1rem"><span' +
                    '                            class="far fa-trash-alt mr-3"></span>Suppreme</button>' +
                    '                </div>' +
                    '            </div>' +
                    '        </div>';

                $(id).empty();
                $(id).append(add);
                ajouteModel(id) ;
                $("#sortir").click(function () {
                    $("#Title").text("suppreme Membre");
                    $("#modelbody").empty();
                    $("#modelbody").append('<form action="/AdminChangeStatusMembre"><input type="hidden" name="id" value="'+idMedecin+'"/>' +
                        '<input type="hidden" name="typr" value="'+type+'"/><p class="h5">Êtes-vous sûr de vouloir'+button+'cette membre?</p>' +
                        '</form>');
                    $("#modelsubmitbtn").text(button);

                });
                $("#suppreme").click(function () {
                    $("#Title").text("suppreme Membre");
                    $("#modelbody").empty();
                    $("#modelbody").append('<form action="/AdminSuppremerMembre"><input type="hidden" name="id" value="'+idMedecin+'"/>' +
                        '<input type="hidden" name="typr" value="'+type+'"/><p class="h5">Êtes-vous sûr de vouloir supprimer cette membre?</p>' +
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
$(document).ready(function () {
    $("#photo").click(function(){
        $("#fileid").click();
    })
    $("#fileid").change(function(e){

        console.log('jj');
    })
});
function getData(div) {
    var data = {
        id:$('#Id').val(),
        filed: $(div).attr('name'),
        value: $(div).val()
    }
    return data;
}
function otherSelect(){
    return "<option value=\"ChefService\">Chef Service</option> <option value=\"Infermiere\">Infermiere</option>";
}
