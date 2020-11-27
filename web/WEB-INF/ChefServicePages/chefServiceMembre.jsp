<!DOCTYPE html>
<html>
<head>
    <script src="/scripteJS/chefServiceScript/chefServiceMembre.js"></script>
    <script src="/scripteJS/chefServiceScript/detailMembreChefService.js"></script>
    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
    <title>
        Espace chef service
    </title>
</head>
<body>

<nav class="navbar cloudy-knoxville-gradient shadow-sm navbar-light bg-light">
    <a class="navbar-brand card-link nav-link font-weight-bolder" href="#">
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
        <ul class="nav flex-column  mb-0 list-group font-italic  " id="list">
            <li class="font-italic list-group-item list-group-item-action">
                <a href="/ChefServiceHomePage" class="text-dark card-link"><span class="fa fa-home mr-3"></span>
                    Home</a>
            </li>
            <li class="nav-item  list-group-item list-group-item-action">
                <a href="<c:url value="/ChefServiceHomePage"></c:url>" class="text-dark card-link"><span class="fas fa-procedures mr-3"></span>Patient</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/ChefServicePatientPage"></c:url>" class="text-dark  card-link"><span class="fas fa-folder-open mr-3"></span>dossiers médicaux</a>
            </li>
            <li class="nav-item active list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link"><span class="fas fa-user-md mr-3"></span>Membres</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/CompteInformation"></c:url>" class="text-dark card-link"><span class="fas fa-cog  mr-3"></span>Vorte compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/logout"></c:url>" class="text-dark font-italic  card-link"><span class="fas fa-sign-out-alt mr-3"></span>logout</a>
            </li>
        </ul>


    </div>
</div>
<div class="page-content" id="content">
    <dilv id="first">
        <p class="h3 ">Membre Page</p><br/>
        <div class="shadow tablewidth my-auto bg-white ">
            <div class="row divcontenu">
                <div class="col">
                    <p class="h4">Ajoute Membre</p>
                </div>
                <div class="col d-flex">
                    <button class="btn btn-success ml-auto align-self-center" id="ajoute"
                            style="margin-right: 2rem;"><span
                            class="fas fa-plus mr-3"></span>Ajoute Membre
                    </button>
                </div>
            </div>
        </div>

        <div class="shadow tablewidth my-auto bg-white ">
            <div class="divcontenu">
                <c:choose>
                <c:when test="${sessionScope.get(\"user\").getService()==null}">
                    <p>no service exsite</p>
                </c:when>
                <c:otherwise>
                <p class="h4">List Medecin de service</p>
                <c:choose>
                    <c:when test="${Medecin.size()==0}">
                        <p class="h4">no medécin dans le service</p>
                    </c:when>
                    <c:otherwise>
                        <table class="table table-hover rounded my-5 shadow-sm table-borderedless ">
                            <tr>
                                <th style="width: 8%">#</th>
                                <th style="width: 8%">Id</th>
                                <th style="width: 10%">Photo</th>
                                <th>nom</th>
                                <th>Prenom</th>
                                <th>speciality</th>
                            </tr>
                            <c:forEach items="${Medecin}" var="medecin" varStatus="status">
                                <tr data-value="${medecin.id}" data-type="Medecin">
                                    <td class="align-middle ">${status.count}</td>
                                    <td class="align-middle ">${medecin.id}</td>
                                    <td class="align-middle "><img src="${medecin.photo}" width="50" height="50"
                                                                   class="rounded-circle shadow-sm"></td>
                                    <td class="align-middle ">${medecin.nom}</td>
                                    <td class="align-middle ">${medecin.prenom}</td>
                                    <td class="align-middle ">${medecin.speiciality}</td>
                                </tr>
                            </c:forEach>
                        </table>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
        <div class="shadow tablewidth my-auto bg-white divcontenu">
            <div class="row">
                <div class="col">
                    <p class="h4">List infirmière de service</p>
                </div>

            </div>
            <c:choose>
                <c:when test="${Infermiere.size()==0}">
                    <p class="h4">no infermiere dans le service</p>
                </c:when>
                <c:otherwise>
                    <table class="table table-hover rounded my-5 shadow-sm table-borderedless ">
                        <tr>
                            <th style="width: 8%">#</th>
                            <th style="width: 8%">Id</th>
                            <th style="width: 10%">Photo</th>
                            <th>nom</th>
                            <th>Prenom</th>

                        </tr>
                        <c:forEach items="${Infermiere}" var="infermiere" varStatus="status">
                            <tr data-value="${infermiere.id}" data-type="Infermiere">

                                <td class="align-middle ">${status.count}</td>
                                <td class="align-middle ">${infermiere.id}</td>
                                <td class="align-middle "><img src="${infermiere.photo}" width="50" height="50"
                                                               class="rounded-circle shadow-sm"></td>
                                <td class="align-middle ">${infermiere.nom}</td>
                                <td class="align-middle ">${infermiere.prenom}</td>

                            </tr>
                        </c:forEach>


                    </table>
                </c:otherwise>
            </c:choose>

        </div>

        </c:otherwise>
        </c:choose>
    </dilv>
    <div id="seconde"></div>
</div>


<script type="text/javascript">
    var url="/ChefService/updatePatient";

</script>
</body>

</html>

