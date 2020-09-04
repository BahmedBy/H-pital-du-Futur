<!DOCTYPE html>
<html>
<head>
    <script src="scripteJS/chefServiceScript/detailPartionChefService.js"></script>
    <script src="scripteJS/Rechercher.js"></script>


    <link rel="shortcut icon" href="icon/Logo.png" type="image/png">
	<title>
		Espace chef service
	</title>
</head>
<body>
	
   <nav class="navbar cloudy-knoxville-gradient shadow-sm navbar-light bg-light">
  <a class="navbar-brand card-link nav-link font-weight-bolder" href="/">
    <img src="../../icon/Logo.png" width="30" height="30" alt="" class="sd-inline-block align-top">
    Abismail Hopitel
  </a>
  
</nav>

<div class="vertical-nav  " id="sidebar">
  <div class="py-4 px-3 mb-4 cloudy-knoxville-gradient">
    <div class="text-center align-items-center"><img src="${sessionScope.user.getPhoto()}" alt="..." width="150" class="mr-3 rounded-circle img-thumbnail shadow-sm"><br/>
      <div >
        <h4 class="text-center">Dr.${sessionScope.user.getNom()} ${sessionScope.user.getPrenom()}</h4>
    </div>
  </div>
</div>		
<div>
	<ul class="nav flex-column  mb-0 list-group font-italic  " id="list">
	      <li class="font-italic list-group-item list-group-item-action">
            <a href="#" class="text-dark card-link"><span class="fa fa-home mr-3"></span> Home</a>
          </li>
		<li class="nav-item active list-group-item list-group-item-action">
			<a href="#" class="text-dark card-link"><span class="fas fa-procedures mr-3"></span>Patient</a>
		</li>
			<li class="nav-item list-group-item list-group-item-action">
			<a href="#" class="text-dark  card-link"><span class="fas fa-folder-open mr-3"></span>dossiers médicaux</a>
		</li>
		<li class="nav-item list-group-item list-group-item-action">
			<a href="#" class="text-dark card-link"><span class="fas fa-user-md mr-3"></span>Membres</a>
		</li>
		<li class="nav-item list-group-item list-group-item-action" >
			<a href="#" class="text-dark card-link"><span class="fas fa-cog  mr-3"></span>Vorte compte</a>
		</li>
		<li class="nav-item list-group-item list-group-item-action">
			<a href="#" class="text-dark font-italic  card-link"><span class="fas fa-sign-out-alt mr-3"></span>logout</a>
		</li>
	</ul>


</div>
</div>
<div class="page-content" id="content">
<c:choose>
    <c:when test="${sessionScope.user.getService()==null}">
        <p>no service exsite</p>
    </c:when>
    <c:otherwise>
	<p class="h3 ">Partient Page</p><br/>
  <div class="shadow tablewidth my-auto bg-white divcontenu">
  <div class="row">

      <div class="col">
	<p class="h4">List patients hospotalisé</p>
  </div>
  <div class="col">
    <button class="btn btn-success ml-auto align-self-center" id="ajoute" style="margin-right: 2rem;"><span class="fas fa-plus mr-3"></span>Ajoute patien</button>
  </div>

</div>
      <c:choose>
          <c:when test="${patient.size()==0}">
              <p>No patient hospitalise</p>
          </c:when>
          <c:otherwise>
    <table class="table  table-hover rounded my-5 shadow-sm  table-borderedless  " >
    	<tr >
    		<th style="width: 8%">#</th>
        <th style="width: 8%">Id</th>
        <th style="width: 10%">Photo</th>
        <th>nom</th>
        <th>Prenom</th>
        <th>chembre</th>
    	</tr>
        <c:forEach items="${patient}" var="patient" varStatus="stat">
    <tr data-value="${patient.id}">
        <td class="align-middle ">${stat.count}</td>
        <td class="align-middle ">${patient.id}</td>
        <td class="align-middle "><img src="${patient.photo}" width="50" height="50"  class="rounded-circle  shadow-sm"></td>
        <td class="align-middle " >${patient.nom}</td>
        <td class="align-middle ">${patient.prenom}</td>
        <td class="align-middle ">${patient.chembre.numero}</td>
      </tr>
        </c:forEach>


    </table>
          </c:otherwise>
      </c:choose></div>
    </c:otherwise>
    </c:choose>
</div>
<script>
    $('tr').click(function () {
    })
</script>
</body>
</html>

