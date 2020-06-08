<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="css/login.css">

    <title>
        Log in
    </title>
</head>
<body class="heavy-rain-gradient">
<div class="container h-100 ">
    <div class="d-flex justify-content-center h-100 ">
        <div class="user_card bg-light">
            <div class="d-flex justify-content-center">
                <div class="brand_logo_container bg-white ">
                    <img src="icon/Logo.png" class="brand_logo bg-light " alt="Logo">
                </div>
            </div>
            <div class="d-flex justify-content-center form_container">
                <form action="/login" method="get">
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text "><i class="fas fa-at"></i></span>
                        </div>
                        <input type="text" name="email" class="form-control input_user" value="" placeholder="Email">
                    </div>
                    <div class="input-group mb-2 input_background bg-white">
                        <div class="input-group-append">
                            <span class="input-group-text "><i class="fas fa-key"></i></span>
                        </div>
                        <input type="password" name="password" class="form-control input_pass" value=""
                               placeholder="mote de passe">
                    </div>
                    <div class="d-flex justify-content-center mt-3 login_container btn-primary">
                        <input type="submit" name="button" class="btn login_btn" value="login">
                    </div>
                    <div class="form-group" style="margin-top: 1rem">
                        <div class="custom-control custom-checkbox">
                            <a href="#">j'obulie mon mote de passe</a>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
</body>


</html>