<?php
	include '../SCRIPT/inscriptionFonctions.php';
	header("Content-Security-Policy: default-src 'self';script-src 'self' 'unsafe-inline' 'unsafe-eval' cdnjs.cloudflare.com code.jquery.com stackpath.bootstrapcdn.com ajax.googleapis.com;style-src 'self' 'unsafe-inline' use.fontawesome.com ajax.googleapis.com;");
?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="../CSS/style.css">
	</head>
	<body class="bg-dark">
		<style>
			i {
				font-size: 2vh;
			}
		</style>
		<div class="m-0 menu">
			<img src="../IMG/Logo-IFA-1.png" class="logoIfa mx-auto d-block">
		</div>
		<div class="container text-light mt-5 mb-5">
			<div class="card p-5 bg-dark border border-light rounded">
				<form action="" method="POST" class="form-group">
					<div>
						<h1>Inscription</h1>
						<p>Merci de remplir tous les champs:</p>
						<hr>
						<div class="row">
							<div class="col">
								<i class="fas fa-user"></i>
								<label for="nom" class="pt-2"><span class="titre">Nom</span></label>
							</div>
							<div class="col">
								<i class="fas fa-user"></i>
								<label for="prenom" class="pt-2"><span class="titre">Prénom</span></label>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<input type="text" placeholder="Nom" name="nom" required class="form-control">
							</div>
							<div class="col">
								<input type="text" placeholder="Prénom" name="prenom" required class="form-control">
							</div>
						</div>
						
						<i class="fas fa-at"></i>
						<label for="email" class="pt-2"><span class="titre">Email</span></label>
						<input type="text" placeholder="Email" name="email" required class="form-control">

						<i class="fas fa-unlock-alt"></i>
						<label for="mdp1" class="pt-2"><span class="titre">Mot de Passe</span></label>
						<input type="password" placeholder="Mot de Passe" name="mdp1" required class="form-control">

						<i class="fas fa-lock"></i>
						<label for="mdp2" class="pt-2"><span class="titre">Confirmation Mot de Passe</span></label>
						<input type="password" placeholder="Confirmation Mot de Passe" name="mdp2" required class="form-control">

						<i class="fas fa-users"></i>
						<label for="groupes" class="pt-2"><span class="titre">Groupe</span></label>
						<br>
						<select name="groupes" id="getUserGrp" class="custom-select mr-sm-2">
						</select>
						<small class="text-muted">Si vous ne connaissez pas votre groupe, merci de demander à l'administration de l'IFA</small>

						<div class="mt-4">
							<button type="submit" name="submitInscription" class="btn btn-outline-light">S'inscrire</button>
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
		<script src="../SCRIPT/inscription.js"></script>
	</body>
</html>



