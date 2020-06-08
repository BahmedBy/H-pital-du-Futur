function ajouteServiceForm(elem) {
 $(elem).append('<form class="border rounded shadow formstyle" >\n' +
     '  <fieldset class="border formstyle">\n' +
     '   <p class="h4">service</p>\n' +
     '  <div class="form-group row ">\n' +
     '    <label for="nomService" class="col-sm-2 col-form-label" id="1">nom Service</label>\n' +
     '    <div class="col-sm-10">\n' +
     '      <input type="text" class="form-control" id="nomService" placeholder="Password">\n' +
     '    </div>\n' +
     '  </div>\n' +
     '  </fieldset>\n' +
     ' \n' +
     '  <fieldset class="border formstyle">\n' +
     '  <p class="h4">chef service</p>\n' +
     '  <div>\n' +
     '    <div class="form-group row">\n' +
     '    <label for="nomService" class="col-sm-2  col-form-label">chef service</label>\n' +
     '    <div class="col">\n' +
     '      <input type="text" list="chefServiceLibre" class="form-control" id="nomService" placeholder="nomChefService">\n' +
     '    </div>\n' +
     '   <datalist id="chefServiceLibre">\n' +
     '        </datalist>' +
     '     <div class="col-md-auto">\n' +
     '        <button class="btn btn-success ml-auto align-self-center" id="ajoute" style="margin-right: 2rem;"><span class="fas fa-plus mr-3"></span>Ajoute noveau chef de service</button></div>\n' +
     '    </div>\n' +
     '  </div>\n' +
     '  </fieldset>\n' +
     '  <fieldset class="border formstyle" >\n' +
     '  <p class="h4">chember liste</p>\n' +
     '  <div class="form-group row">\n' +
     '   <label for="chember1" class="col-sm-2  col-form-label">chember 1</label> \n' +
     '     <div class="col">\n' +
     '      <input type="text" class="form-control" id="nomService" placeholder="nomChefService">\n' +
     '    </div>   \n' +
     '    </div>   \n' +
     '    <div class="form-group row">\n' +
     '      <div id="result" class="col"></div>\n' +
     '      <div class="col">\n' +
     '        <button class="btn btn-success float-right">virefir</button>\n' +
     '      </div>\n' +
     '    </div>\n' +
     '  </fieldset>\n' +
     '  <div class="form-group formstyle">\n' +
     '  <input class="btn btn-success float-right" type="submit" value="Ajoute" name="submit">\n' +
     '  </div>\n' +
     '</form>');

        getListChefServiceNotafict();
}
