$(document).ready(function () {
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();

        if (st < 56) {
            var margin = (56 - st) + "px";

            $("#sidebar").css("top", margin);
        } else {
            $("#sidebar").css("top", "0px");
        }


    });

});

function backtofirst(d) {
    if (d){
        $("#first").show();
        $("#seconde").hide();
        $("#seconde").empty();
    }
}
