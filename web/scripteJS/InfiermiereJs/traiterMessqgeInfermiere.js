function traiterMessqge(message) {

    if ((message.type==="SignalAlarame"))
    {
       console.log("ddd")
        var myVar = setInterval(myTimer, 1000);
    }

}

function myTimer() {
    co=1;
    if (co===1)
    {
        $("#sa").addClass('bg-denger');
        co++;
    }else
    {
        $("#sa").removeClass('bg-denger');
        co=1;
    }
}