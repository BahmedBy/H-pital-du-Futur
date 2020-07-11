<!DOCTYPE html>
<html>
<head>

<script src="scripteJS/MedecinJs/MedecinHome.js"></script>
<script src="scripteJS/MedecinJs/detailPatient.js"></script>
<script src="scripteJS/Rechercher.js"></script>
    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
    <title>
        Espace Médeicn
    </title>
</head>
<body class="bg-light">

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
                <a href="#" class="text-dark font-italic card-link"><span class="far fa-calendar-alt mr-3"></span>Rendez-vous</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span
                        class="fas fa-exclamation-triangle mr-3"></span>Signal alarme</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span class="fas fa-cog mr-3"></span>Vorte
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

            <c:choose>
            <c:when test="${sessionScope.get(\"user\").getService()==null}">
                <p>no service exsite</p>
            </c:when>
            <c:otherwise>
            <div id="first">
                <p class="h3 ">Home Page</p><br/>
                <div class="shadow tablewidth my-auto bg-white ">
                    <div class="row divcontenu">
                        <div class="container">
                            <div class="form-inline">
                                <div class="container">
                                    <div class="row"><p class="h4">Recherche Patient</p></div>
                                    <div class="row">
                                        <div class="col">
                                            <span class="h5">recheche par:</span>
                                        </div>
                                        <div class="col">
                                            <select id="selector" class="form-control mb-2 mr-sm-2">
                                                <option value="id" selected>id</option>
                                                <option value="Nom/Prénom<">Nom/Prénom</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row" id="type">
                                        <div class="col">
                                            <label for="id" class="col-form-label float-left ">Id:</label></div>
                                        <div class="col">
                                            <input type="text" name="id" id="id" class="form-control mb-2 mr-sm-2"
                                                   required></div>

                                    </div>

                                    <div class="row">
                                        <input type="submit" value="cherché" id="cherché"
                                               class="btn btn-outline-success form-control mb-2 mr-sm-2">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shadow tablewidth my-auto bg-white divcontenu " id="resultBlock">
                    <div class="row " id="result">
                    </div>
                </div></div>
                <div id="seconde"></div>
                </c:otherwise>
                </c:choose>
            </div>

<script>
    var idService=${sessionScope.get("user").getService().getId()};
</script>
</body>
</html>
