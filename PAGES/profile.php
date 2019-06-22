<?php 
	session_start();
	if ( !isset($_SESSION) ) {
		header('Location: ../index.tmp.php');
	}
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
		<?php include_once './menu.php'; ?>
		<div class="container text-dark mt-5 mb-5">
			<div class="card p-5">
				<form action="" class="form-group">
					<div>
						<h1>Profil</h1>
						<p>Modifier vos informations:</p>
						<hr>
						<div class="row">
							<div class="col">
								<i class="fas fa-user"></i>
								<label for="nom" class="pt-2"><span class="titre">Nom</span></label>
							</div>
							<div class="col">
								<i class="fas fa-user"></i>
								<label for="prenom" class="pt-2"><span class="titre">Prenom</span></label>
							</div>
						</div>
						<div class="row">
							<div class="col">
								<input type="text" value="<?php echo $_SESSION['nom'] ?>" id="nom" required class="form-control">
							</div>
							<div class="col">
								<input type="text" value="<?php echo $_SESSION['prenom'] ?>" id="prenom" required class="form-control">
							</div>
						</div>
						
						<i class="fas fa-at"></i>
						<label for="email" class="pt-2"><span class="titre">Email</span></label>
						<input type="text" value="<?php echo $_SESSION['email'] ?>" id="email" required class="form-control">

						<i class="fas fa-unlock-alt"></i>
						<label for="mdp" class="pt-2"><span class="titre">Mot de Passe</span></label>
						<input type="password" value="<?php echo $_SESSION['mdp'] ?>" id="mdp" required class="form-control">

						<div class="mt-4">
							<button type="button" id="modUsrBtn" class="btn btn-outline-dark">Modifier</button>
						</div>
					</div>
				</form> 
			</div>
		</div>
		<?php include_once './footer.php'; ?>
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
		<script src="../JS/profile.js"></script>
	</body>
</html>



