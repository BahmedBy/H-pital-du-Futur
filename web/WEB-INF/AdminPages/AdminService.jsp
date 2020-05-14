<!DOCTYPE html>
<html>
<head>
    <meta name="viesport" content="width=device-widh,initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css ">
    <link rel="stylesheet" type="text/css" href="css/verticalNavBar.css">
    <link rel="stylesheet" href="bootstrap/css/gradient.css">
    <link rel="stylesheet" href="icon/bootstrapIcons/css/all.css">

    <meta charset="utf-8">
    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
    <script type="text/javascript" src="scripteJS/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="scripteJS/showList.js"></script>
    <title>
        Espace Admis
    </title>
</head>
<body>

<nav class="navbar cloudy-knoxville-gradient shadow-sm navbar-light bg-light">
    <a class="navbar-brand card-link nav-link font-weight-bolder" href="#">
        <img src="icon/Logo.png" width="30" height="30" alt="" class="sd-inline-block align-top">
        Abismail Hopitel
    </a>

</nav>

<div class="vertical-nav  bg-light" id="sidebar">
    <div class="py-4 px-3 mb-4 cloudy-knoxville-gradient">
        <div class="text-center align-items-center"><img src="..\..\icon\default_person.png" alt="..." width="150"
                                                         class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
            <div>
                <h4 class="text-center">Dr.Benyammi</h4>
            </div>
        </div>
    </div>
    <div>
        <ul class="nav flex-column  mb-0 list-group " id="list">
            <li class="active font-italic list-group-item list-group-item-action">
                <a href="#" class="text-dark"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="AdminHomePage" class="text-dark font-italic card-link"><span
                        class="fas fa-briefcase mr-3"></span>service</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="AdminService" class="text-dark font-italic card-link"><span class="fas fa-user-md mr-3"></span>Membres</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span class="fas fa-cog mr-3"></span>Vorte
                    compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link "><span class="fas fa-sign-out-alt mr-3"
                ></span>logout</a>
            </li>
        </ul>

    </div>
</div>
<div class="page-content" id="content">
    <p class="h3 ">Services</p><br/>
    <p class="h2">List service </p>
    <div id="contenu">
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

                        <tr>
                            <th>${status}</th>
                            <th>${service.id}</th>
                            <th>${service.nom}</th>
                            <th><samp class="fas fa-chevron-right"
                                      style="color:Dodgerblue; font-size: 1.5rem; margin-left: 1rem"></samp></th>
                        </tr>
                    </c:forEach>
                </TABLE>
            </c:otherwise>
        </c:choose>


    </div>
    <script>
        $(document).ready(function () {
        });

    </script>
</div>
</body>
</html>