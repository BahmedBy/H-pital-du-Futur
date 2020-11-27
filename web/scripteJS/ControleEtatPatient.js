var servcir;
function getChebre() {
     servcir = $('input[name=service]:checked').val();
    if (typeof servcir != "undefined"){
    $("#content").empty();
    $("#suivent").attr('onclick','getPatient()');
    $.ajax({
        url: "/controler/ListServicesChembre",
        data:{idServcie:servcir},
        beforeSend: function () {
            $("#content").append('<div class="divanimation"><p class="h4">List chembre </p><div class="mainAnimation">' +
                '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
        },
        success: function (data) {
            if (jQuery.isEmptyObject(data)) {
                $("#content").empty();
                $("#content").append('<div class="divanimation"><p class="h4">List chembre</p><div class="mainAnimation">' +
                    '<p class="h5 text-center">No chembre dans l\'hopitel</p>' +
                    '</div>')
            }
            else {
                var add='';
                $.each(data, function (k, v) {
                        add = add+'     <div class="custom-control custom-radio">\n' +
                            '                    <input type="radio" id="'+v.numero+'" name="Chembre" value="'+v.numero+'" class="custom-control-input">\n' +
                            '                    <label class="custom-control-label" for="'+v.numero+'">'+v.numero+'</label>\n' +
                            '                </div>';
                    } );
                $("#content").empty();
                $("#content").append(add);

            }
        }
    })}

}
function getPatient(){
    var chembre = $('input[name=Chembre]:checked').val();
    $.ajax({
        url: "/controler/ListServicesPatient",
        data:{idChembre:chembre},
        beforeSend: function () {
            $("#content").empty();
            $("#content").append('<div class="divanimation"><p class="h4">List chembre </p><div class="mainAnimation">' +
                '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
        },
        success: function (data) {
            if (jQuery.isEmptyObject(data)) {
                $("#content").empty();
                $("#content").append('<div class="divanimation"><p class="h4">List chembre</p><div class="mainAnimation">' +
                    '<p class="h5 text-center">Chembre est vide</p>' +
                    '</div>')
            }
            else {
                console.log(data);
                var add='';

                    add = add+' <div>\n' +
                        '    <p class="h4">Patient :</p><br />\n' +
                        '    <div class="row ">\n' +
                        '      <div class="col-4">\n' +
                        '        <img src="'+data.photo+'" alt="..." width="150"\n' +
                        '          class="mr-3 rounded-circle img-thumbnail shadow-sm">\n' +
                        '      </div>\n' +
                        '      <div class="col my-auto">\n' +
                        '        <p class="h5" id="idPatient" name="'+data.id+'">id:'+data.id+' </p>\n' +
                        '        <p class="h5">nom et prenom :'+data.nom+' '+data.prenom+'</p>\n' +
                        '    </div>\n' +
                        '  </div>\n' +
                        '  <div class="form-group  divcontenu border shodow ">\n' +
                        '    <div class="row divcontenu">\n' +
                        '      <label for="date" class="col col-form-label">tempeture:</label>\n' +
                        '      <input type="text" id="tempeture" class="form-control-plaintext col" value="37">\n' +
                        '    </div>\n' +
                        '    <div class="row divcontenu"> <label for="temp" class="col col-form-label ">pulsation:</label>\n' +
                        '      <input type="text" id="pulsation" class="form-control-plaintext col" value="65">\n' +
                        '    </div>\n' +
                        '    <div class="row divcontenu"> <label for="temp" class="col col-form-label">tonsion:</label>\n' +
                        '      <input type="text" id="tonsion" class="form-control-plaintext col" value="9">\n' +
                        '    </div>\n' +
                        '  </div>';

                $("#content").empty();
                $("#content").append(add);
                $("#suivent").attr('onclick','sinql()');
                $("#suivent").text('signl Alarme');
                var myVar = setInterval(myTimer, 1000);
            }
        },
        error:function (e) {

            alert(e.responseText);
        }
    })}
function traiterMessqge(message) {
    var div=$("#content").find('#idPatient');
    console.log((typeof div!="undefined"));
    console.log(message.idPatient===17);
    var id=''+$(div).attr('name');
    console.log((message.type==="DomondeEtat")&&(div.length)&&(message.idPatient==id));
    console.log(id);
    if ((message.type==="DomondeEtat")&&(div.length)&&(message.idPatient==id)){
        console.log("send etat");
        var messag={
            type:"EtatPatient",
            idPatient: $(div).attr('name'),
            etat:{
                   tempeture:$('#tempeture').val(),
                    pulsation:$('#pulsation').val(),
                    tonsion: $('#tonsion').val(),
            },
            servcir:servcir,
        };
       sendName(messag);
    }
}
function myTimer() {
    var r= Math.floor(Math.random() * 10);
     var tempeture='37.'+r;
    r= Math.floor(Math.random() * 10);
    var pulsation='9.'+r;
    r= Math.floor(Math.random() * 10);
    var tonsion=60+r;

    $('#tempeture').val(tempeture);
        $('#pulsation').val(pulsation);
         $('#tonsion').val(''+tonsion);
}
function sinql() {
    var div=$("#content").find('#idPatient');
    var message={
        type:"SignalAlarame",
        idPatient: $(div).attr('name'),

        servcir:servcir,
    };
    sendName(message);
}