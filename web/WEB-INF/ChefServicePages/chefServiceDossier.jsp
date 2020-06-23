<!DOCTYPE html>
<html>
<head>

    <link rel="shortcut icon" href="../../icon/Logo.png" type="image/png">
    <title>
        Espace chef service
    </title>
</head>
<body>

<nav class="navbar cloudy-knoxville-gradient shadow-sm navbar-light bg-light">
    <a class="navbar-brand card-link nav-link font-weight-bolder" href="#">
        <img src="../../icon/Logo.png" width="30" height="30" alt="" class="sd-inline-block align-top">
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
        <ul class="nav flex-column  mb-0 list-group font-italic  " id="list">
            <li class="font-italic list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item  list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link"><span class="fas fa-procedures mr-3"></span>Patient</a>
            </li>
            <li class="nav-item active list-group-item list-group-item-action">
                <a href="#" class="text-dark  card-link"><span class="fas fa-folder-open mr-3"></span>dossiers médicaux</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link"><span class="fas fa-user-md mr-3"></span>Membres</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark card-link"><span class="fas fa-cog  mr-3"></span>Vorte compte</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="#" class="text-dark font-italic  card-link"><span class="fas fa-sign-out-alt mr-3"></span>logout</a>
            </li>
        </ul>


    </div>
</div>
<div class="page-content" id="content">
    <p class="h3 ">dossier medica Page</p><br/>
    <div class="shadow tablewidth my-auto bg-white ">
        <div class="row divcontenu">
            <div class="col">
                <p class="h4"> Ajoute dossier medical</p>
            </div>
            <div class="col">
                <button class="btn btn-success ml-auto align-self-center" id="ajoute" style="margin-right: 2rem;"><span
                        class="fas fa-plus mr-3"></span>Ajoute dossier medical
                </button>
            </div>
        </div>
    </div>
    <div class="shadow tablewidth my-auto bg-white ">
        <div class="row divcontenu">
            <div class="container">
                <div class="form-inline">
                    <div class="container">
                        <div class="row"><p class="h4">Recherche dossier medica</p></div>
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
    </div>
    <div class="shadow tablewidth my-auto bg-white ">
        <div class="row divcontenu">
            <p class="h4">result recheche</p>
            <table class="table  table-hover rounded my-5 shadow-sm  table-borderedless  ">
                <tr>
                    <th style="width: 8%">#</th>
                    <th style="width: 8%">Id</th>
                    <th style="width: 10%">Photo</th>
                    <th>nom</th>
                    <th>Prenom</th>
                    <th>etate</th>
                </tr>
                <tr>
                    <td class="align-middle ">1</td>
                    <td class="align-middle ">52</td>
                    <td class="align-middle "><img src="../../image/partient1.jpg" width="50" height="50"
                                                   class="rounded-circle  shadow-sm"></td>
                    <td class="align-middle ">Assma</td>
                    <td class="align-middle ">nom</td>
                    <td class="align-middle ">hospotalisé</td>
                </tr>
                <tr>
                    <td class="align-middle ">2</td>
                    <td class="align-middle ">40</td>
                    <td class="align-middle "><img src="../../image/Male.png" width="50" height="50"
                                                   class="rounded-circle  shadow-sm"></td>
                    <td class="align-middle ">Adelalah</td>
                    <td class="align-middle ">Abismail</td>
                    <td class="align-middle ">nohospotalisé</td>
                </tr>

            </table>
        </div>
</div>
</div>
</body>
</html>

