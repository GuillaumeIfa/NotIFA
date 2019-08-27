<?php
	
	session_start();

	if ( isset($_SESSION['changePseudo']) ) {
		echo "<div class=\"alert alert-light alert-dismissible text-dark fade show\">
					<h1>Félicitation !</h1>
					<h3 class=\"lead\">Vous avez modifié(e) l'accès administration. <br> Merci de vous reconnecter.</h3>
					<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">
						<span aria-hidden=\"true\">&times;</span>
					</button>
				</div>";
	}
	session_destroy();

	require_once './configure.php';

	$pseudo = '';
	$mdp = '';
	$msg = '';

	if (isset($_POST['submit1'])) {
		$pseudo = $_POST['pseudo'];
		$mdp = $_POST['mdp'];

		if($db_handle) {
			$rqtMdp = 'SELECT MDP, IDUSR, PRENOM FROM USERS WHERE PSEUDO = "'.$pseudo.'";';

			$result_query = mysqli_query($db_handle, $rqtMdp);
			$db_field = mysqli_fetch_assoc($result_query);

			if ($db_field){
				if ($db_field['MDP'] == $mdp) {
					session_start();
					$_SESSION['pseudo'] = $_POST['pseudo'];
					$_SESSION['mdp'] = $_POST['mdp'];
					$_SESSION['IDUSR'] = $db_field['IDUSR'];
					header('Location: ./indexAdmin.php');
				} else {
					$msg = '<br><b>Le mot de passe est erroné </b><br><i class="fa fa-frown-o fa-2x" aria-hidden="true"></i>';
				}
			} else {
				$msg = '<br><b>Cet identifiant n\'existe pas </b><br><i class="fa fa-frown-o fa-2x" aria-hidden="true"></i>';
			}
		}
	}
?>

<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css" integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=" crossorigin="anonymous">
		<link rel="stylesheet" href="./CSS/style.css">
		<title>NotIfa</title>
	</head>
	<body>
		<div class="container">
			<div id="middleBlock" class="row justify-content-center">
				<div class="jumbotron border border-dark shadow">
					<h2>Administration AlertIFA</h2>
					<form name="form1" action="" method="POST">
						<div class="form-group">
							<label for="pseudo">Identitfiant: </label>
							<input type="text" class="form-control" name="pseudo" placeholder="Entrez votre identifiant" required>
						</div>
						<div class="form-group">
							<label for="mdp">Mot de Passe: </label>
							<input type="password" class="form-control" name="mdp" placeholder="Entrez votre Mot de Passe" required>
						</div>
						<!-- <div class="form-group form-check">
							<input type="checkbox" class="form-check-input" id="check">
							<label class="form-check-label" for="check">Se souvenir de moi</label>
						</div> -->
						<button type="submit" class="btn btn-dark" name="submit1">Envoyer</button>
						<div class="text-center"><?php if($msg) echo $msg?></div>
					</form>
				</div>
			</div>
		</div>
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	</body>
</html>