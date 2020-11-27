<%--
  Created by IntelliJ IDEA.
  User: Bahmed
  Date: 11/09/2020
  Time: 17:48
  To change this template use File | Settings | File Templates.
--%>

<html>
<head>
    <title>Controle d'Etat Patient</title>
    <script src="scripteJS/ControleEtatPatient.js"></script>
    <script src="scripteJS/sockjs.min.js"></script>
    <script src="scripteJS/stomp.js"></script>
    <script src="scripteJS/WebSocket.js"></script>
</head>
<body>
<div style="{margin-top: 2rem;}">
    <p class="h4 text-center" >Controle d'Etat Patient</p><br/>
    <div class="shadow divcontenu Controller">
        <c:choose>
            <c:when test="${service==null}">
                <p class="h5">no Service dans l'hopitel</p>
            </c:when>
            <c:otherwise>
            <p class="h5" id="titre">Choisir Service:</p><br/>
            <div class="divcontenu" id="content">
                <c:forEach var="service" items="${service}">
                <div class="custom-control custom-radio">
                    <input type="radio" id="${service.id}" name="service" value="${service.id}" class="custom-control-input">
                    <label class="custom-control-label" for="${service.id}">${service.nom}</label>
                </div>
                </c:forEach>
            </div>
            <div class="d-flex flex-row-reverse bd-highlight">
                <button class="btn btn-success p-2" id="suivent" onclick="getChebre()">suivent</button>
            </div>
    </div>
            </c:otherwise>
        </c:choose>

</div>
</body>
</html>
