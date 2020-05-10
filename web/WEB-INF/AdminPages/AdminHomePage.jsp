<!DOCTYPE html>
<html>
<head>
    <meta name="viesport" content="width=device-widh,initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css ">
    <link rel="stylesheet" type="text/css" href="css/verticalNavBar.css">
    <link rel="stylesheet" href="bootstrap/css/gradient.css">
    <link rel="stylesheet" href="icon/bootstrapIcons/css/all.css">
    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
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
        <div class="text-center align-items-center"><img src="icon\default_person.png" alt="..." width="150"
                                                         class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
            <div>
                <h4 class="text-center"><c:out value="${sessionScope.get(\"user\").getNom()}"></c:out> <c:out
                        value="${sessionScope.get(\"user\").getPrenom()}"></c:out></h4>
            </div>
        </div>
    </div>
    <div>
        <ul class="nav flex-column  mb-0 list-group " id="list">
            <li class="active font-italic list-group-item list-group-item-action">
                <a href="#" class="text-dark"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span
                        class="fas fa-briefcase mr-3"></span>service</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span class="fas fa-user-md mr-3"></span>Membres</a>
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
    <p class="h3 ">Home</p><br/>
    <p class="h4">Statistique sur l'hopitel</p>
    <table class="table table-striped table-hover separator rounded my-5 shadow-sm tablewidth" id="table">
        <tr>
            <td>numéro des services</td>
            <td>${stat.get("NService")}</td>
        </tr>
        <tr>
            <td>numéro des médcine</td>
            <td>12</td>
        </tr>
        <tr>
            <td>numéro des infirmere</td>
            <td>20</td>
        </tr>
        <tr>
            <td>numéro des patients hospotalisé</td>
            <td>22</td>
        </tr>

        <tr>
            <td>numéro des chemre libre</td>
            <td>8</td>
        </tr>

    </table>
    <div class="separator"></div>
    <p class="h4">Statistique sur le site</p>
</div>

</body>
</html>