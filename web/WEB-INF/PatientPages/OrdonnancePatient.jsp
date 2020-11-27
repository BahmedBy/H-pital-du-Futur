<%--
  Created by IntelliJ IDEA.
  User: Bahmed
  Date: 10/09/2020
  Time: 17:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>

    <meta name="viesport" content="width=device-widh,initial-scale=1.0">

    <meta charset="utf-8">
    <link rel="shortcut icon" href="../../icon/Logo.png" type="image/png">
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
        <div class="text-center  align-items-center"><img src="${sessionScope.user.getPhoto()}" alt="..." width="150" class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
            <div >
                <h4 class="text-center">Mr.${sessionScope.user.getNom()} ${sessionScope.user.getPrenom()}</h4>
            </div>
        </div>
    </div>
    <div>
        <ul class="nav flex-column  mb-0 list-group " id="list">
            <li class="active font-italic list-group-item list-group-item-action">
                <a href="#" class="text-dark"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span class="far fa-calendar-alt mr-3"></span>Rendez-vous</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span class="fas fa-file-medical-alt mr-3"></span>Ordonnace</a>
            </li>

            <li class="nav-item list-group-item list-group-item-action" >
                <a href="#" class="text-dark font-italic card-link"><span class="fas fa-cog mr-3"></span>Vorte compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic  card-link"><span class="fas fa-sign-out-alt mr-3"></span>logout</a>
            </li>
        </ul>
    </div></div>
    <div class="page-content" id="content">
        <div class=" divcontenu border shodow">
            <c:choose>
                <c:when test="${ordonnonce}==null">
                    <p class="h5">n'ordoonoce exit</p>
                </c:when>
                <c:otherwise>


            <p class="h4">Medecin :</p><br />
            <div class="row ">

                <div class="col-4">
                    <img src="${ordonnonce.medecin.photo}" alt="..." width="150"
                         class="mr-3 rounded-circle img-thumbnail shadow-sm">
                </div>
                <div class="col my-auto">
                    <p class="h5">nom et prenom :Dr.${ordonnonce.medecin.nom} ${ordonnonce.medecin.prenom}</p>
                    <p class="h5">speiciality: ${ordonnonce.medecin.speiciality}</p>
                    <p class="h5">service :  ${ordonnonce.medecin.service.nom}</p>

                </div>

            </div>
        </div>
        <div class="form-group  divcontenu border shodow ">
            <div class="row">
            <label for="date"  class="col-sm-2 col-form-label">date:</label>
            <input type="text" id="date" class="form-control-plaintext col-sm-3" value="${ordonnonce.etat.date}">
            </div>
            <div class="row">  <label for="temp"  class="col-sm-2 col-form-label">temp:</label>
            <input type="text" id="temp" class="form-control-plaintext col-sm-3" value="${ordonnonce.etat.time}">
            </div></div>
        <div class=" divcontenu border shodow">

            <p class="h4">Ordonnace :</p><br />
            <p class="h5 text-left  divcontenu tablewidth align-left">${ordonnonce.contenu}
            </p>
        </div>
    </div>
</c:otherwise>
</c:choose>
</body>
</html>
