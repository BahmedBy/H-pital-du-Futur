<!DOCTYPE html>
<html>
<head>

    <script type="text/javascript" src="scripteJS/AdminJs/AdminService.js"></script>
    <script type="text/javascript" src="scripteJS/AdminJs/detailservice.js"></script>
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
        <div class="text-center align-items-center"><img id="photoProfile" src="${sessionScope.user.getPhoto()}"
                                                         alt="..." width="150"
                                                         class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
            <div>
                <h4 class="text-center">Dr.${sessionScope.user.getNom()} ${sessionScope.user.getPrenom()}</h4>
            </div>
        </div>
    </div>
    <div>
        <ul class="nav flex-column  mb-0 list-group " id="list">
            <li class=" font-italic list-group-item list-group-item-action">
                <a href="<c:url value="/AdminHomePage"></c:url> " class="text-dark"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="active nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span
                        class="fas fa-briefcase mr-3"></span>service</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/AdminMembrePage"/>" class="text-dark font-italic card-link"><span class="fas fa-user-md mr-3"></span>Membres</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/CompteInformation"></c:url> " class="text-dark font-italic card-link"><span class="fas fa-cog mr-3"></span>Vorte
                    compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/logout"/>" class="text-dark font-italic card-link "><span class="fas fa-sign-out-alt mr-3"
                ></span>logout</a>
            </li>
        </ul>

    </div>
</div>
<div class="page-content" id="content">
    <div id="first">
        <p class="h3 ">Services</p><br/>

        <div class="shadow tablewidth my-auto bg-white">
            <div class="row divcontenu">
                <div class="col">
                    <p class="h5">chembre list</p></div>

                <div class="col d-flex">
                    <button class="btn btn-success ml-auto align-self-center" id="getchembreList"
                            style="margin-right: 2rem;"><span class="fas fa-arrow-right mr-3"></span>List chembre
                    </button>
                </div>
            </div>
        </div>

        <div class="shadow tablewidth my-auto bg-white divcontenu">
            <div class="row ">
                <div class="col">
                    <p class="h5">List service</p></div>
                <div class="col d-flex">
                    <button class="btn btn-success ml-auto align-self-center" id="ajoute"
                            style="margin-right: 2rem;"><span
                            class="fas fa-plus mr-3"></span>Ajoute service
                    </button>
                </div>
            </div>
            <c:choose>
                <c:when test="${services.size()==0}">
                    <p class="h4">no service dans l'hoptel </p>
                </c:when>
                <c:otherwise>
                    <TABLE class="table table-hover table-striped tablewidth separator" id="listService">
                        <tr>
                            <th>#</th>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Détail</th>
                        </tr>
                        <c:forEach items="${services}" var="service" varStatus="status">

                            <tr data-value="${service.id}" >
                                <th>${status.count}</th>
                                <th>${service.id}</th>
                                <th>${service.nom}</th>
                                <th><samp class="fas fa-chevron-right"
                                          style="color:Dodgerblue; font-size: 1.5rem; margin-left: 1rem"></samp></th>
                            </tr>
                            <script>
                               var id=${service.id};
                               var nom="${service.nom}";
                                servces = servces + '<option value="'+id+
                                '" >'+nom+
                                '</option>';
                            </script>
                        </c:forEach>
                    </TABLE>
                </c:otherwise>
            </c:choose>

        </div>
    </div>
    <div id="seconde"></div>
    <div id="thered"></div>
</div>

</div>
</body>
</html>