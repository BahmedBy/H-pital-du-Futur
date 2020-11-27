function traiterMessqge(message) {
     console.log(message);
    if ((message.type==="EtatPatient")&&(idPatient=message.idPatient)){
        var div=$("#etatActueldiv").find("#etatActeul");
        console.log("resever Etat");
        if (!$(div).length ) {
            $("#etatActueldiv").empty();
            $("#etatActueldiv").append('<div class="tablewidth my-auto bg-white divcontenu " id="infomation"><p class="h4">Etat Actul</p> <div id="etatActeul" class="divcontenu"> <div class="form-group row">' +
                '                            <label for="staticEmail" class="col-sm-3 col-form-label">temperaterur</label>' +
                '                            <div class="col-sm-2">' +
                '                                <input type="text" readonly class="form-control-plaintext"" id="temperaterurActeu" name="temperaterur" value="'+message.etat.tempeture+'" ' +
                '                                    required>' +
                '                            </div>' +
                '                        </div>' +
                '                        <div class="form-group row">' +
                '                            <label for="pulsation" class="col-sm-3 col-form-label">La pulsation :</label>' +
                '                            <div class="col-sm-2">' +
                '                                <input type="text" readonly class="form-control-plaintext"" id="pulsationActeu" name="pulsation" value="'+message.etat.pulsation+'">' +
                '                            </div>' +
                '                        </div>' +
                '                        <div class="form-group row">' +
                '                            <label for="tension" class="col-sm-3 col-form-label">La tension :</label>' +
                '                            <div class="col-sm-2 ">' +
                '                                <input type="text"  readonly class="form-control-plaintext" id="tensionActeu" name="tension" value="'+message.etat.tonsion+'" >' +
                '                            </div>' +
                '                        </div></div></div>')}
        else {
            $("#temperaterurActeu").val(message.etat.tempeture);
            $("#pulsationActeu").val(message.etat.pulsation);
            $("#tensionActeu").val(message.etat.tonsion);
        }

    }    if ((message.type==="SignalAlarame")&&(idService=message.servcir))
    {
        // var my = setInterval(Alarme,500);
}

}
function demendeEtat() {
    var message={
        type:"DomondeEtat",
        idPatient: idPatient,


    };
    sendName(message);
}

let co = 1;

function Alarme() {

    if (co===1)
    {
        $("#sa").addClass('bg-danger');
        co=0;
    }else
    {

        $("#sa").removeClass('bg-danger');
        co=1;
    }

}