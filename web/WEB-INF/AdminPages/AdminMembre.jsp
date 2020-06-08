<!DOCTYPE html>
<html>
<head>
    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
    <script type="text/javascript" src="scripteJS/AdminMembre.js"></script>
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
                <a href="#" class="text-dark card-link"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark  card-link"><span class="fas fa-briefcase mr-3"></span>service</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action active">
                <a href="#" class="text-dark card-link "><span class="fas fa-user-md mr-3"></span>Membres</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link"><span class="fas fa-cog mr-3"></span>Vorte compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link "><span class="fas fa-sign-out-alt mr-3"
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
            <div class="shadow tablewidth my-auto bg-white">
                <div class="row divcontenu">
                    <div class="col">
                        <p class="h5">obtenir tout les chef services</p></div>
                    <div class="col">
                        <button class="btn btn-success ml-auto align-self-center" id="obtenircf"
                                style="margin-right: 2rem;"><span class="fas fa-search mr-3"></span>Obtenir
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="shadow tablewidth my-auto bg-white">
                <div class="row divcontenu">
                    <div class="col">
                        <p class="h5">obtenir tout les medcen</p></div>
                    <div class="col">
                        <button class="btn btn-success ml-auto align-self-center" id="obtenirm"
                                style="margin-right: 2rem;"><span class="fas fa-search mr-3"></span>Obtenir
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="shadow tablewidth my-auto bg-white">
                <div class="row divcontenu">
                    <div class="col">
                        <p class="h5">obtenir tout les infimieres</p></div>
                    <div class="col">
                        <button class="btn btn-success ml-auto align-self-center" id="obtenirin"
                                style="margin-right: 2rem;"><span class="fas fa-search mr-3"></span>Obtenir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="AjoutePersone">
        <div>
            <p class="h4" id="Membrepages"><span class="fas fa-arrow-left mr-3"></span>Membre pages</p><br/>
        </div>
        <form class="shadow  my-auto bg-white divcontenu" action="AdminAjouteMembre" method="post" enctype="multipart/form-data">
            <p class="h4"> Ajoute Membre</p><br/>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Nom</label>
                <div class="col">
                    <input type="text" class="form-control" id="inputEmail3" placeholder="Nom" name="nom" required>
                </div>
                <label for="inputEmail3" class="col-sm-1 col-form-label">Preom</label>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Preom" name="prenom">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input type="Email" class="form-control" id="inputPassword3" placeholder="Email@a.com" name="email">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Telphone Numbre</label>
                <div class="col-sm-10">
                    <input type="number" class="form-control" placeholder="Telphone Numbre" name="telNumbre">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Date de naissance</label>
                <div class="col-sm-10">
                    <input type="date" class="form-control" id="DatedeNai" placeholder="Date de naissance"
                           name="DatedeNai">
                </div>
            </div>
            <div id="divTypeUser" class="form-group row">
                <label for="inputPassword3" class="col-sm-2 col-form-label">Gender</label>
                <div class="col">
                    <select class="form-control" name="gender">
                        <option value="Male">Male</option>
                        <option value="Femme">Femme</option>
                    </select>
                </div>
                <label for="inputPassword3" class="col-sm-2 col-form-label">Type</label>
                <div class="col">
                    <select class="form-control" id="TypeUser" name="typeUser">
                        <option value="ChefService">Chef Service</option>
                        <option value="Medcin">Medcin</option>
                        <option value="infimiere">infimiere</option>
                    </select>
                </div>
            </div>
            <div class="input-group mb-3 row">
                <label class="col-sm-2 col-form-label">Photo</label>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" name="photo">
                    <label class="custom-file-label ">Choose Photo</label>
                </div>
                <div class="input-group-prepend">
                    <span class="input-group-text fas fa-file-upload"></span>
                </div>
            </div>
            <div class="form-group formstyle">
                <input class="btn btn-success float-right" type="submit" value="Ajoute" name="submit">
            </div>
        </form>

    </div>
</div>
</body>
</html>