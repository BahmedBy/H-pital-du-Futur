<!DOCTYPE html>
<html>
<head>

    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
    <title>
        Espace chef service
    </title>
</head>
<body>

<nav class="navbar cloudy-knoxville-gradient shadow-sm navbar-light bg-light">
    <a class="navbar-brand card-link nav-link font-weight-bolder" href="/">
        <img src="icon/Logo.png" width="30" height="30" alt="" class="sd-inline-block align-top">
        Abismail Hopitel
    </a>

</nav>

<div class="vertical-nav  " id="sidebar">
    <div class="py-4 px-3 mb-4 cloudy-knoxville-gradient">
        <div class="text-center align-items-center"><img src="${sessionScope.user.getPhoto()}" alt="..." width="150"
                                                         class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
            <div>
                <h4 class="text-center">Dr.${sessionScope.user.getNom()} ${sessionScope.user.getPrenom()}i</h4>
            </div>
        </div>
    </div>
    <div>
        <ul class="nav flex-column  mb-0 list-group " id="list">
            <li class="active font-italic list-group-item list-group-item-action">
                <a href="#" class="text-dark"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/ChefServicePatientPage" class="text-dark font-italic card-link"><span class="fas fa-procedures mr-3"></span>Patient</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/ChefServiceDossieraMedicalPage" class="text-dark font-italic card-link"><span class="fas fa-folder-open mr-3"></span>dossiers
                    médicaux</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/ChefServiceMembrePage" class="text-dark font-italic card-link"><span class="fas fa-user-md mr-3"></span>Membres</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span class="fas fa-cog  mr-3"></span>Vorte
                    compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/logout" class="text-dark font-italic  card-link"><span class="fas fa-sign-out-alt mr-3"></span>logout</a>
            </li>
        </ul>


    </div>
</div>
<div class="page-content" id="content">
    <div id="first">
    <c:choose>
        <c:when test="${sessionScope.user.getService()==null}">
            <p>no service exsite</p>
        </c:when>
        <c:otherwise>
            <p class="h3 ">Home</p><br/>
            <p class="h3">Nom de service : ${sessionScope.get("user").getService().getNom()}</p><br/>
            <p class="h4">Statistique sur le service</p>
            <table class="table table-striped table-hover separator tablewidth rounded my-5 shadow-sm " id="table">

                <tr>
                    <td>numéro des médcine</td>
                    <td>${stat.get("NMedecin")}</td>
                </tr>
                <tr>
                    <td>numéro des infirmere</td>
                    <td>${stat.get("NInfermiere")}</td>
                </tr>
                <tr>
                    <td>numéro des patients hospotalisé</td>
                    <td>${stat.get("NPartient")}</td>
                </tr>
                <tr>
                    <td>numéro des chembre</td>
                    <td>${stat.get("NChembre")}</td>
                </tr>
                <tr>
                    <td>numéro des chemre libre</td>
                    <td>${stat.get("NChembreLibre")}</td>
                </tr>

            </table>
        </c:otherwise>
    </c:choose>
</div>
</div>
<div id="seconde"></div>
</body>
</html>

