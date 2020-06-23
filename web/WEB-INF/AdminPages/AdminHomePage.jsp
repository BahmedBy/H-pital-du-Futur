<!DOCTYPE html>
<html>
<head>

    <title>
        Espace Admis
    </title>
</head>
<body>


<nav class="navbar cloudy-knoxville-gradient shadow-sm navbar-light bg-light">
    <a class="navbar-brand card-link nav-link font-weight-bolder" href="/">
        <img src="../../icon/Logo.png" width="30" height="30" alt="" class="sd-inline-block align-top">
        Abismail Hopitel
    </a>

</nav>

<div class="vertical-nav  bg-light" id="sidebar">
    <div class="py-4 px-3 mb-4 cloudy-knoxville-gradient">
        <div class="text-center align-items-center"><img src="${sessionScope.user.getPhoto()}" alt="..." width="150"
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
                <a href="/AdminServicePage" class="text-dark font-italic card-link"><span
                        class="fas fa-briefcase mr-3"></span>service</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/AdminMembre" class="text-dark font-italic card-link"><span class="fas fa-user-md mr-3"></span>Membres</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic card-link"><span class="fas fa-cog mr-3"></span>Vorte
                    compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/logout" class="text-dark font-italic card-link "><span class="fas fa-sign-out-alt mr-3"
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


    </table>
    <div class="separator"></div>
    <%--<p class="h4">Statistique sur le site</p>--%>
</div>

</body>
</html>