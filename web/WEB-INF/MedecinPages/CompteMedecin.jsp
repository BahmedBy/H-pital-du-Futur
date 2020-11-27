<!DOCTYPE html>
<html>
<head>
    <script src="scripteJS/CompteInformation.js"></script>
    <script src="scripteJS/MedecinJs/traiterMessageMedecin.js"></script>
    <script src="scripteJS/stomp.js"></script>
    <script src="scripteJS/WebSocket.js"></script>
    <script src="scripteJS/MedecinJs/traiterMessageMedecin.js"></script>

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
                <a href="<c:url value="/MedecinHomePage" ></c:url>" class="text-dark card-link"><span class="fa fa-home mr-3"></span> Home</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/RedezVousMedecinPage"></c:url> " class="text-dark font-italic card-link"><span class="far fa-calendar-alt mr-3"></span>Rendez-vous</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/singnalAlarme"></c:url> " class="text-dark font-italic card-link"><span
                        class="fas fa-exclamation-triangle mr-3"></span>Signal alarme</a>
            </li>
            <li class="nav-item list-group-item list-group-item-action">
                <a href="<c:url value="/CompteInformation"></c:url>" class="text-dark font-italic card-link"><span class="fas fa-cog mr-3"></span>Vorte
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

    <div class="divcontenu shadow">
        <p class="h4">Compte Information</p><br/>
        <div class="container divcontenu border ">
            <div class="row">
                <div class="col-sm-3">
                    <div class="row justify-content-center">
                        <img src="${sessionScope.user.photo}" alt="..." width="140"
                             class="mr-3 rounded-circle img-thumbnail shadow-sm "></div>
                    <br/>
                    <div class="row justify-content-center">
                        <input id='fileid' type='file' name='photo' hidden/>
                        <button class="btn " name="edit" id="photo">Modifer photo</button>
                    </div>
                </div>
                <div class="col">

                    <div class="row">
                        <label for="Nom" class="col-sm-3 col-form-label">Nom</label>
                        <div class="col">
                            <input type="text" readonly class="form-control-plaintext" id="Nom" name="nom"
                                   value="${sessionScope.user.nom}">
                        </div>
                        <div class="col-sm-2">
                            <button class="btn " name="edit" onclick="d('#Nom')"><span class="fas fa-pen"></span>
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <label for="prenom" class="col-sm-3 col-form-label">Prenom</label>
                        <div class="col">
                            <input type="text" readonly class="form-control-plaintext" id="Prenom"
                                   name="prenom" value="${sessionScope.user.prenom}">
                        </div>
                        <div class="col-sm-2">
                            <button class="btn " name="edit" onclick="d('#Prenom')"><span class="fas fa-pen"></span>
                            </button>
                        </div>

                    </div>
                    <div class="row">
                        <label for="Email" class="col-sm-3 col-form-label">Email</label>
                        <div class="col">
                            <input type="email" readonly class="form-control-plaintext" id="Email"
                                   name="email" value="${sessionScope.user.email}">
                        </div>
                        <div class="col-sm-2">
                            <button class="btn " name="edit" onclick="d('#Email')"><span class="fas fa-pen"></span>
                            </button>
                        </div>

                    </div>
                    <div class="row">
                        <label for="numeroTel" class="col-sm-3 col-form-label">numero Telephone</label>
                        <div class="col">
                            <input type="number" name="numeroTel"
                                   readonly class="form-control-plaintext" id="numeroTel"
                                   value="${sessionScope.user.numeroTel}"></div>
                        <div class="col-sm-2">
                            <button class="btn " name="edit" onclick="d('#numeroTel')"><span
                                    class="fas fa-pen"></span></button>
                        </div>
                    </div>
                    <div class="row">
                        <label for="type" class="col-sm-3 col-form-label">Date de Naissance</label>
                        <div class="col">
                            <input type="date" readonly class="form-control-plaintext" id="date"
                                   name="date" value="${sessionScope.user.dateNaissance}"></div>
                        <div class="col-sm-2">
                            <button class="btn " name="edit" onclick="d('#date')"><span
                                    class="fas fa-pen"></span></button>
                        </div>
                    </div>
                    <div class="row">
                        <label for="type" class="col-sm-3 col-form-label">Type</label>
                        <div class="col">
                            <input type="text" readonly class="form-control-plaintext" id="type"
                                   value=" ${sessionScope.user.type}"></div>

                    </div>

                    <div class="row">
                        <label for="Gender" class="col-sm-3 col-form-label">Gender</label>
                        <div class="col">
                            <select name="gender" disabled="disabled" class="custom-select" id="Gender"
                            >
                                <option selected>${sessionScope.user.gender}</option>
                            </select>
                        </div>
                        <div class="col-sm-2">
                            <button class="btn " name="edit" onclick="gender('#Gender')"><span
                                    class="fas fa-pen"></span></button>
                        </div>
                    </div>
                    <div class="row">
                        <label for="type" class="col-sm-3 col-form-label">mote de pass</label>
                        <div class="col">
                            <input type="password" readonly class="form-control-plaintext" id="password" name="password"
                                   value="password"></div>
                        <div class="col-sm-2">
                            <button class="btn " name="edit" onclick="passwordChange('#password')"><span
                                    class="fas fa-pen"></span></button>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<script>
    url = "/UpdateCompte";

    function getData(div) {
        var data = {
            filed: $(div).attr('name'),
            value: $(div).val()
        };
        return data;
    }
</script>
</body>
</html>