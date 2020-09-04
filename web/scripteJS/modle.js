function ajouteModel(div) {
    if(typeof div!="undefined")
        $(div).append(' <div class="modal fade" id="modelaffich" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
        '          <div class="modal-dialog modal-dialog-centered" role="document">' +
        '            <div class="modal-content">' +
        '              <div class="modal-header">' +
        '                <h5 class="modal-title" id="Title"></h5>' +
        '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
        '                  <span aria-hidden="true">&times;</span>' +
        '                </button>' +
        '              </div>' +
        '              <div class="modal-body" id="modelbody">' +
        '              </div>' +
        '              <div class="modal-footer">' +
        '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
        '                <button type="submit" class="btn btn-primary" id="modelsubmitbtn">supprimer</button>' +
        '              </div>' +
        '            </div>' +
        '          </div>' +
        '        </div>');
    $('#modelsubmitbtn').click(function () {
        $('#modelbody').find('form').submit();
    })

}