var stompClient = null;

connect();

var id=17;
function connect() {
    var socket = new SockJS('/seket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        // setConnected(true);
        console.log('Connected: ' + frame);

        stompClient.subscribe('/topic/messages', function(greeting) {
            var message = JSON.parse(greeting.body);
          traiterMessqge(message);

        });
    });

}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName(message) {
    stompClient.send("/message", {}, JSON.stringify(message));
}
// class messqge {
//     constructor(type) {
//         this.type = type;
//     }
//     // constructor(type,idPatient,etat) {
//     //     this.type = type;
//     //     this.idPatient = idPatient;
//     //     this.etat = etat;
//     // } constructor(type,etat,idPatient,idService) {
//     //     this.type = type;
//     //     this.idPatient = idPatient;
//     //     this.etat = etat;
//     //     this.idService = idService;
//     // }
// }