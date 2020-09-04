var url;
var info=new Map();
function d(div) {
    info.set($(div).attr('name'), $(div).val());
    $(div).removeAttr('readonly');
    $(div).removeClass('form-control-plaintext');
    $(div).addClass('form-control');
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="ok" onclick="update(\'' + div + '\')"><span class="fas fa-check" style="color:green"></span></button><button class="btn " name="no" onclick="cancel(\'' + div + '\')"><span class="fas fa-times" style="color:red"></span></button></div>')
}

function update(div) {
    var data=getData(div);
     sendRequtteUpdate(data);
    if (div!="#gender")
    newValue(div);
    else
        newValueSelect(div);
}
function newValueSelect(div) {
    $(div).attr('disabled', true);
    $(div).empty();
    $(div).append('<option selected>'+ $(div).val()+'</option>')
    $(div).parent().parent().find('.col-sm-2').remove();

    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="edit" onclick="d(\'' + div + '\')"><span class="fas fa-pen"></span></button></div>');
}
function cancel(div) {
    $("#confipassword").parent().parent().remove();
    $(div).attr('readonly', true);
    $(div).val($(div).attr('name'));
    alert(info.get($(div).attr('name')));
    $(div).removeClass('form-control');
    $(div).addClass('form-control-plaintext');
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="edit" onclick="d(\'' + div + '\')"><span class="fas fa-pen"></span></button></div>');
}
function gender(div) {
    info.set($(div).attr('name'), $(div).val());
    $(div).attr('disabled',false);
    $(div).empty();
    if(div="#gender")
    $(div).append('<option value="Male">Male</option><option value="Femme">Femme</option>');
   else
        $(div).append(otherSelect());
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="ok" onclick="update(\''+div+'\')"><span class="fas fa-check" style="color:green"></span></button><button class="btn " name="no" onclick="cancelgender(\''+div+'\')"><span class="fas fa-times" style="color:red"></span></button></div>')

}
function  newValue(div) {
    $(div).attr('readonly', true);
    $(div).attr('value',$(div).val());
    $(div).removeClass('form-control');
    $(div).addClass('form-control-plaintext');
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="edit" onclick="d(\'' + div + '\')"><span class="fas fa-pen"></span></button></div>');
}


function cancelgender(div) {
    $(div).attr('disabled', true);
    $(div).empty();
    $(div).append('<option selected>'+info.get($(div).attr('name'))+'</option>')
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="edit" onclick="gender(\'' + div + '\')"><span class="fas fa-pen"></span></button></div>');
}

function passwordChange(div) {
    info.set($(div).attr('name'),$(div).val());
    $(div).attr('value','');
    $(div).parent().parent().parent().append('<div class="row"><label for="confipassword" class="col-sm-3 col-form-label">confirme mote de pass</label><div class="col"><input type="password"  class="form-control" id="confipassword"> '+
        ' </div><div class="col-sm-2"></div></div>');
    info.set($(div).attr('name'), $(div).val());
    $(div).removeAttr('readonly');
    $(div).removeClass('form-control-plaintext');
    $(div).addClass('form-control');
    $(div).parent().parent().find('.col-sm-2').remove();
    $(div).parent().parent().append('<div class="col-sm-2"><button class="btn " name="ok" onclick="updatepassword(\'' + div + '\')"><span class="fas fa-check" style="color:green"></span></button><button class="btn " name="no" onclick="cancel(\'' + div + '\')"><span class="fas fa-times" style="color:red"></span></button></div>')

}
function updatepassword(div) {

    var pass=$(div).val();
    if((pass==="password")||(pass!==$("#confipassword").val()))
        cancel(div);
    else
    {
        update(div);
    }

}
function  sendRequtteUpdate(data) {
    alert(url);
    $.ajax({
        url: url,
        type: "POST",
        data:data,

        error: function (e) {
            alert(e.responseText);
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });
}