<!DOCTYPE html>
<html>
<head>
    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
    <script type="text/javascript" src="scripteJS/AdminMembre.js"></script>
    <script type="text/javascript" src="scripteJS/ajax.js"></script>
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
        <div class="text-center align-items-center"><img src="${sessionScope.user.getPhoto()}" alt="..." width="150"
                                                         class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
            <div>
                <h4 class="text-center">Dr.${sessionScope.user.getNom()} ${sessionScope.user.getPrenom()}</h4>
            </div>
        </div>
    </div>
    <div>
        <ul class="nav flex-column  mb-0 list-group font-italic" id="list">
            <li class="list-group-item list-group-item-action">
                <a href="/AdminHomePage" class="text-dark card-link"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/AdminServicePage" class="text-dark  card-link"><span class="fas fa-briefcase mr-3"></span>service</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action active">
                <a href="/AdminMembrePage" class="text-dark card-link "><span class="fas fa-user-md mr-3"></span>Membres</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link"><span class="fas fa-cog mr-3"></span>Vorte compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="/logout" class="text-dark card-link "><span class="fas fa-sign-out-alt mr-3"
                ></span>logout</a>
            </li>
        </ul>

    </div>
</div>
<div class="page-content" id="content">
    <div id="origincotent">
        <div>
            <div class="shadow tablewidth my-auto bg-white">
                <div class="row divcontenu">
                    <div class="col">
                        <p class="h5">Ajoute personne medical</p></div>
                    <div class="col">
                        <button class="btn btn-success ml-auto align-self-center" id="ajoute"
                                style="margin-right: 2rem;"><span class="fas fa-plus mr-3"></span>Ajoute
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="rechechem" class="shadow tablewidth my-auto bg-white divcontenu">
            <div>
                <p class="h4"> Recheche personne medical</p>
            </div>
            <div class="container">
                <div class="form-inline">
                    <div class="container">
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
                                <input type="text" name="id" id="id" class="form-control mb-2 mr-sm-2"></div>

                        </div>

                        <div class="row">
                            <input type="submit" value="cherché"
                                   class="btn btn-outline-success form-control mb-2 mr-sm-2">
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="shadow tablewidth my-auto bg-white" >
                <div class="divcontenu" id="chefService">
                    <div class="row">
                    <div class="col">
                        <p class="h5">obtenir tout les chef services</p></div>
                    <div class="col">
                        <button class="btn btn-success ml-auto align-self-center" value="chefService" id="obtenirCS"
                                style="margin-right: 2rem;"><span class="fas fa-search mr-3"></span>Obtenir
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="shadow tablewidth my-auto bg-white">
                <div class="divcontenu" id="Medecin">
                    <div class="row">
                    <div class="col">
                        <p class="h5">obtenir tout les medecin</p></div>
                    <div class="col">
                        <button class="btn btn-success ml-auto align-self-center" value="Medecin" id="obtenirM"
                                style="margin-right: 2rem;"><span class="fas fa-search mr-3"></span>Obtenir
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="shadow tablewidth my-auto bg-white">
                <div class="divcontenu" id="Infimiere">
                    <div class="row">
                    <div class="col">
                        <p class="h5">obtenir tout les infimieres</p></div>
                    <div class="col">
                        <button class="btn btn-success ml-auto align-self-center" value="Infermiere" id="obtenirI"
                                style="margin-right: 2rem;"><span class="fas fa-search mr-3"></span>Obtenir
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div id="AjoutePersone">
    </div>
</div>
</body>
</html>