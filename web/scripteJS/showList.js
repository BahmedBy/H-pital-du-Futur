function showService(services) {
    // noinspection BadExpressionStatementJS
    services.forEach( serviceafiche(element));
    co=1;
    function serviceafiche(element) {
        $("#listService").append("<tr><td>"+co+"</td><td>"+element.id+"</td><td>"+element.nom+"</td><td><samp class=\"fas fa-chevron-right\" style=\"color:Dodgerblue; font-size: 1.5rem; margin-left: 1rem\"></samp></td></tr>");
        co++;
    }

}