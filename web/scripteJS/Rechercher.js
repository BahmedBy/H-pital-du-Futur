function getPatient(divResulte,data) {
    var id = "#" + divResulte;

    $(id).show();
    if(!jQuery.isEmptyObject(data))
        $.ajax({
            url: "/searchPatient",
            data: data,
            beforeSend:function(){
                $(id).empty();
                $(id).append('<div class="divanimation"><p class="h4">Résultat</p><div class="mainAnimation">' +
                    '<div class="circle text-center"></div></div> <p class="h5 text-center">Loading ...</p></div>')
            },
            success: function (data) {
                $(id).empty();

                if (jQuery.isEmptyObject(data)) {
                    $(id).append('<div class="divanimation"><p class="h4"> Résultat</p><div class="mainAnimation">'+
                        '<p class="h5 text-center">Aucun résultat trouvé</p>'+
                        '</div>')
                }
                else {
                    var add='<p class="h4">List chef service</p><table class="table table-hover rounded my-5 shadow-sm table-borderedless" id="table" >' +
                        '<tr >' +
                        '<th style="width: 10%">#</th>' +
                        '<th style="width: 15%">Id</th>' +
                        '<th style="width: 15%">Photo</th>' +
                        '<th>nom</th>' +
                        '<th>Prenom</th>';
                    if (divResulte==="Medecin")
                        add=add+'<th>sepiciality</th>';
                    add=add+'</tr>';

                    var co=1;
                    $.each(data, function (k, v) {
                            add= add+' <tr data-value="'+v.id+'" >' +
                                '<td class="align-middle ">'+co+'</td>' +
                                '<td class="align-middle ">'+v.id+'</td>' +
                                '<td class="align-middle "><img src="'+v.photo+'" width="50" height="50"  class="rounded-circle  shadow-sm"></td>' +
                                '<td class="align-middle " >'+v.nom+'</td>' +
                                '<td class="align-middle ">'+v.prenom+'</td>';
                        
                            add=add+'</tr>';
                            co++;
                        }
                    );
                    add=add+'</table>';


                }
                $(id).append(add);
                $('tr').click(function () {

                    affiche($(this).data('value'));               })
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