<%--
  Created by IntelliJ IDEA.
  User: Bahmed
  Date: 16/09/2020
  Time: 19:56
  To change this template use File | Settings | File Templates.
--%>

<!DOCTYPE html>
<html>
<head>
    <script src="scripteJS/sockjs.min.js"></script>
    <script src="scripteJS/stomp.js"></script>
    <script src="scripteJS/WebSocket.js"></script>
    <script src="scripteJS/MedecinJs/traiterMessageMedecin.js"></script>
    <script src="scripteJS/InfiermiereJs/detailPatientInInfermiere.js"></script>

    <title>
        Espace Admis
    </title>
</head>
<body>


<nav class="navbar cloudy-knoxville-gradient shadow-sm navbar-light bg-light">
    <a class="navbar-brand card-link nav-link font-weight-bolder" href="/">
        <img src="icon/Logo.png" width="30" height="30" alt="" class="sd-inline-block align-top">
        Abismail Hopitel
    </a>

</nav>

<div class="vertical-nav  bg-light" id="sidebar">
    <div class="py-4 px-3 mb-4 cloudy-knoxville-gradient">
        <div class="text-center align-items-center"><img src="${sessionScope.user.getPhoto()}" alt="..." width="150"
                                                         class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
            <div>
                <h4 class="text-center">Dr.${sessionScope.user.getNom()} ${sessionScope.user.getPrenom()}</h4>
            </div>
        </div>
    </div>
    <div>
        <ul class="nav flex-column  mb-0 list-group " id="list">
            <li class="active font-italic list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/RedezVousInfermierePage" class="text-dark font-italic card-link"><span
                        class="far fa-calendar-alt mr-3"></span>Rendez-vous</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action" id="sa">
                <a href="#" class="text-dark font-italic card-link"><span
                        class="fas fa-exclamation-triangle mr-3" ></span>Signal alarme</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/CompteInformation"></c:url> " class="text-dark font-italic card-link"><span class="fas fa-cog mr-3"></span>Vorte
                    compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/logout" class="text-dark font-italic card-link "><span
                        class="fas fa-sign-out-alt mr-3"></span>logout</a>
            </li>
        </ul>


    </div>
</div>
<div class="page-content" id="content">
</div>
<script>
    var idService=${sessionScope.user.getService().getId()};
    detailPartionChefService(${idPatient},"content");

    $("#back").remove();
</script>
</body>
<
