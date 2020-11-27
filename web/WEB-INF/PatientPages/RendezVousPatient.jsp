<%--
  Created by IntelliJ IDEA.
  User: Bahmed
  Date: 10/09/2020
  Time: 17:48
  To change this template use File | Settings | File Templates.
--%>

<html>
<head>
    <meta name="viesport" content="width=device-widh,initial-scale=1.0">

    <meta charset="utf-8">
    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
    <script src="scripteJS/Patient/RendezVous.js"></script>
    <title>
        Espace patient
    </title>
</head>
<body>
<nav class="navbar cloudy-knoxville-gradient shadow-sm navbar-light">
    <a class="navbar-brand card-link nav-link font-weight-bolder" href="#">
        <img src="../../icon/Logo.png" width="30" height="30" alt="" class="sd-inline-block align-top">
        Abismail Hopitel
    </a>

</nav>

<div class="vertical-nav shadow  " id="sidebar">
    <div class="py-4 px-3 mb-4 cloudy-knoxville-gradient">
        <div class="text-center  align-items-center"><img src="${sessionScope.user.getPhoto()}" alt="..." width="150"
                                                          class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
            <div>
                <h4 class="text-center">Mr.${sessionScope.user.getNom()} ${sessionScope.user.getPrenom()}</h4>
            </div>
        </div>
    </div>
    <div>
        <ul class="nav flex-column  mb-0 list-group " id="list">
            <li class=" font-italic list-group-item list-group-item-action">
                <a href="#" class="text-dark"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="active nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span class="far fa-calendar-alt mr-3"></span>Rendez-vous</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/patientLastordonnoce"></c:url> " class="text-dark font-italic card-link"><span class="fas fa-file-medical-alt mr-3"></span>Ordonnace</a>
            </li>

            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/CompteInformation"></c:url> " class="text-dark font-italic card-link"><span class="fas fa-cog mr-3"></span>Vorte
                    compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/logout"></c:url> " class="text-dark font-italic  card-link"><span class="fas fa-sign-out-alt mr-3"></span>logout</a>
            </li>
        </ul>
    </div>
</div>
<div class="page-content" id="content">

    <p class="h3">Rendez-vous</p>


        <div id="redezvous" class="divcontenu container  tablewidth my-auto bg-white ">
            <c:choose>
                <c:when test="${rendezVous.size()==0}">
                    <p class="text-center">no Rendez vous en ${date}</p>
                </c:when>
                <c:otherwise>

                    <div class="row  divcontenu ">

                        <div class="col my-auto ">
                            <p class="h5">partient </p>
                        </div>

                        <div class="col  my-auto ">
                            <p class="h5"> Date</p>
                        </div>
                        <div class="col  my-auto ">
                            <p class="h5"> Temp</p>
                        </div>
                        <div class="col  my-auto ">
                        <p></p>
                        </div>

                    </div>
                    <div class="w-100 border"></div>
                    <c:forEach var="rendez" items="${rendezVous}">
                        <div class="row my-auto">
                            <div class="col ">
                                <div class="row">
                                    <div class="col my-auto">
                                        <img src="${rendez.medecin.photo}" width="50" height="50"
                                             class="rounded-circle  shadow-sm ">
                                    </div>
                                    <div class="col my-auto">
                                        <p class="h6 row">${rendez.medecin.nom}</p>
                                        <p class="h6 row">${rendez.medecin.prenom}</p>
                                        <p class="text-info font-italic row">Id:${rendez.medecin.id}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col  my-auto ">
                                <p class="h5"> ${rendez.date}</p>
                            </div>
                            <div class="col  my-auto ">
                                <p class="h5"> ${rendez.time}</p>
                            </div>
                            <div class="col  my-auto ">
                                <button class="btn"  onclick="Annuler(${rendez.id})">><span style="color: red;"><i class="far fa-trash-alt"></i></span>
                                </button>
                            </div>
                        </div>


                            <div class="w-100 border"></div>
                        </div>
                    </c:forEach>


                </c:otherwise>
            </c:choose>
        </div>
    </div>


</div>
</body>
</html>
