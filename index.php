<?php 
	include './SCRIPT/connection.php';
?>


<!DOCTYPE html>
<html>

	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
			integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
			integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="./CSS/style.css">
	</head>

	<body class="bg-dark">

		<div class="m-0 menu">
			<img src="./IMG/Logo-IFA-1.png" class="logoIfa mx-auto d-block">
		</div>
		<div class="container text-light">
			<div class="card p-5 m-5-lg mt-5 bg-dark border border-light rounded">
				<form action="" method="POST" class="form-group">
					<div>
						<h1>Connexion</h1>
						<p>Merci d'entrer votre adresse mail pour vous connecter</p>
						<hr class="bg-light">
						<i class="fas fa-address-card"></i>
						<label for="email" class="pt-2"><b>Email</b></label>
						<input type="text" placeholder="Email" name="email" required class="form-control">
		
						<i class="fas fa-unlock-alt"></i>
						<label for="mdp" class="pt-2"><b>Mot de Passe</b></label>
						<input type="password" placeholder="Mot de Passe" name="mdp" required class="form-control">
		
						<div class="mt-4">
							<button type="button" class="btn btn-outline-light float-right" onclick="window.location.href='./PAGES/inscription.php'">Inscription</button>
							<button type="submit" name="submitLogin" class="btn btn-outline-light">Connexion</button>
						</div>
					</div>
				</form>
			</div>
		</div>


		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
			integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
			crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
			integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
			crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
			integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
			crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
<!-- 		<script src="./JS/script.js"></script>
 -->	</body>

</html>