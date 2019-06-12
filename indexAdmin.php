<?php 
	session_start();
	if (!isset( $_SESSION['pseudo'] )) {
		header('Location: admin.php');
	}

	$pseudo = $_SESSION['pseudo'];
	$mdp = $_SESSION['mdp'];
	$msg = '';

	if ($_SESSION['pseudo'] == 'admin') {
		$changeAdminMdp = '<div class="blockquote text-center text-light border border-dark bg-danger"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><b> N\'oubliez pas de modifier vos identifiants !!!  </b><i class="fa fa-exclamation-triangle" aria-hidden="true"></i><br><small>Il est dangereux de conserver les indentifiants par défault</small></div>';
		echo $changeAdminMdp; 
	}

	require_once './configure.php';
	
	if (isset($_POST['submitAdmin'])) {
		$pseudo = $_POST['pseudo'];
		$mdp = $_POST['mdp']; 
		
		if($db) {
			$rqt = 'UPDATE USERS SET PSEUDO = "'.$pseudo.'", MDP = "'.$mdp.'" WHERE IDUSR = 1';
			
			$result_query = mysqli_query($db_handle, $rqt);
			
			if ($result_query) {
				session_destroy();
				session_start();
				$_SESSION['pseudo'] = $pseudo;
				$_SESSION['mdp'] = $mdp;
				$_SESSION['changePseudo'] = true;
				header('Location: admin.php');

			} else {
				echo "Oupss, il a eu un problème :/";
			}
		} 
	}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="./CSS/style.css">
	<title>Espace Administration</title>
</head>
<body>
	<div class="container withImg shadow-lg mx-auto mt-2">
		<div>
			<h1 class="underline text-light text-center pt-3"><u>Espace Administration</u></h1>
		</div>
		<div class="d-flex flex-inline justify-content-around p-3 nav">
			<button type="button" id="gestionBtn" class='tabBtn col-sm-3 col-md-3 btn btn-outline-light  active'>Gestion</button>
			<button type="button" id="maintenanceBtn" class='tabBtn col-sm-3 col-md-3 btn btn-outline-light '>Maintenance</button>
			<button type="button" id="messagesBtn" class='tabBtn col-sm-3 col-md-3 btn btn-outline-light '>Messages</button>
		</div>
	</div>
	<div id="tabGestion" class="paragraph container card rounded shadow p-2 mt-3 border-dark">
		<div class="row p-2">
			<div class="col-8">
				<h3>Gestion des Utilisateurs :</h3>
			</div>
			<div class="col-4 d-flex flex-row-reverse">
				<button class="btn btn-outline-dark">Gérer</button>
			</div>
		</div>
		<div class="row p-2">
			<div class="col-8">
				<h3>Gestion des Intervenants :</h3>
			</div>
			<div class="col-4 d-flex flex-row-reverse">
				<button id="gestionInterv" class="btn btn-outline-dark">Gérer</button>
			</div>
		</div>
		<div class="none gestInterv paragraph grpInterv">
			<button class="btn btn-outline-dark" data-toggle="modal" data-target="#intervModal">Ajouter</button>

		<div class="modal fade border-dark" id="intervModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Ajouter Intervenant:</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form action="./JS/fonctions.php" method="POST">
						<div class="modal-body" id="modalInterv">
							<label for="nomInterv">Nom:</label>
							<input class="float-right" type="text" id="nomInterv" name="nomInterv" placeholder="Nom" required><br>
							<label for="prenom">Prenom:</label>
							<input class="float-right" type="text" id="prenomInterv" name="prenomInterv" placeholder="Prenom" required><br>
							<label for="mdp">Mot de passe:</label>
							<input class="float-right" type="password" id="mdpInterv" name="mdpInterv" placeholder="Mot de passe" required><br>
							<label for="email">Email:</label>
							<input class="float-right" type="email" id="emailInterv" name="emailInterv" placeholder="Email" required><br><hr>
							<label for="groupesInterv">Groupes:</label>
							<div class="getGroupesInterv"></div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Fermer</button>
							<button type="button" class="btn btn-outline-dark" name="btnAddInterv" id="btnAddInterv">Ajouter</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
		<div class="modal fade border-dark" id="addGrpInterv" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="ModalLabel">Ajouter l'intervenant dans un groupe:</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form action="./JS/fonctions.php" method="POST">
						<div class="modal-body" id="modalIntervGrp">
							<label for="groupesInterv">Groupes:</label>
							<div class="getGroupesInterv"></div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Fermer</button>
							<button type="button" class="btn btn-outline-dark" name="btnAddGrpInterv" id="btnAddGrpInterv" data-dismiss="modal">Ajouter</button>
						</div>
					</form>
				</div>
			</div>
		</div>



		<div class="blockquote">
			<h4 class="m-2 p-3"><u>Liste des intervenants: </u></h4>
			<h2 class="fail d-flex justify-content-center"></h2>
			<div id="getInterv"></div> <!-- Affichage de la liste des intervenants -->
		</div>
		</div>
		<div class="row p-2"> <!-- Gestion des groupes -->
			<div class="col-8">
				<h3>Gestion des Groupes :</h3>
			</div>
			<div class="col-4 d-flex flex-row-reverse">
				<button id="gestionGroupe" class="btn btn-outline-dark">Gérer</button>
			</div>
		</div>
		<div class="none gestGroup paragraph border-dark">
			<input type="text" id="nomGroupe">
			<button class="btn btn-outline-dark" id="addGroupe">Ajouter</button>
			<div class="blockquote">
				<h4 class="m-2 p-3"><u>Liste des groupes: </u></h4>
				<h2 class="fail d-flex justify-content-center"></h2>
				<div class="getGroupes"></div> <!--Affichage de la liste des groupes -->
			</div>
		</div>
	</div>
	<div id="tabMaintenance" class="paragraph container card rounded shadow p-2 mt-3 border-dark">
		<div class="row p-2">
			<div class="col-8">
				<b>Changer le mot de passe Administrateur</b>
			</div>
			<div class="col-4 d-flex flex-row-reverse">
				<button id="btnChangeAdmin" class="btn btn-outline-dark">Changer</button>
			</div>
			<div class="p-2 none modAdminInfo">
				<form name="form1" action="" method="POST">
					<input id="pseudo" class="rounded" type="text" name="pseudo" value="<?php echo $pseudo ?>">
					<input class="rounded" type="password" name="mdp" value="<?php echo $mdp ?>">
					<button type="submit" id="submitAdmin" name="submitAdmin" class="btn btn-outline-dark">Modifier</button>
				</form>
			</div>
		</div>
	</div>
	<div id="tabMessages" class="paragraph container card rounded shadow p-2 mt-3 border-dark">
		<div class="row p-2">
			<div class="col-8">
				<b>Gérer les messages</b>
			</div>
			<div class="col-4 d-flex flex-row-reverse">
				<button class="btn btn-outline-dark">Gérer</button>
			</div>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
	<script src="./JS/script.js"></script>
</body>
</html>