<?php 
	$con =mysqli_connect('localhost', 'root', 'root', 'AlertIFA');

	if(!$con) {
		echo "Erreur de connection à la base de données";
	} else {

		/*****************************
		* FONCTIONS GESTION GROUPES *
		****************************/

// Fonction qui ajoute un groupe
		if (isset($_POST['groupe']) && $_POST['action'] === 'addGroupe') {
			$groupe = mysqli_escape_string($con, $_POST['groupe']);

			$rqtNom = 'SELECT * FROM GROUPES WHERE NOM = "'.$_POST['groupe'].'";';
			$result_query = mysqli_query($con, $rqtNom);
			$dbField = mysqli_fetch_assoc($result_query);

			if ($dbField) {
				$msg = "Ce groupe existe déjà, veuillez choisir un autre nom ‍🙆‍";
				echo $msg;
			} else {
				if ($groupe != '') {
					$sql = "INSERT INTO GROUPES (NOM) VALUES ('$groupe')";
					mysqli_query($con, $sql);
				}
			}
		}
	
// Fonction qui affiche les groupes
		if($_GET['action'] === 'getGroupes') {
			$sql = "SELECT * FROM  GROUPES";
			$run = mysqli_query($con, $sql);

			while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
				// $groupe = '
				// 	<p class="pl-2 paragraph" id="lstGrp-'.$getData['IDGRP'].'">
				// 		'.$getData['IDGRP'].' => '.$getData['NOM'].'
				// 		<i class="fas fa-trash-alt pr-2 float-right"></i>
				// 		<i class="fas fa-edit pr-2 float-right"></i>
				// 		<button type="button" class="none float-right btn btn-dark mr-2" id="editBtn'.$getData['IDGRP'].'">ok</button>
				// 		<input type="text" id="editInput'.$getData['IDGRP'].'" class="none float-right mr-2" required placeholder="Modifier nom du groupe">
				// 	</p><hr>';
				$tab[] = $getData;
			}
			echo json_encode($tab);
		}

// Fonction qui supprime un groupe
		if (isset($_POST['id']) && $_POST['action'] === 'delGroupe') {
			$id = mysqli_escape_string($con, $_POST['id']);
			$sql = "DELETE FROM GROUPES WHERE IDGRP = ".$id."";
			mysqli_query($con, $sql);
		}

// Fonction pour éditer un groupe
		if (isset($_POST['id']) && $_POST['action'] === 'editGroupe') {
			$nom = mysqli_escape_string($con, $_POST['nom']);
			$id = mysqli_escape_string($con, $_POST['id']);
			$sql = "UPDATE GROUPES SET NOM = ('$nom') WHERE IDGRP = ".$id."";
			mysqli_query($con, $sql);
		}

		/**********************************
		* FONCTIONS GESTION INTERVENANTS *
		********************************/
// Fonction pour afficher les intervenants
		if($_GET['action'] === 'getInterv') {
			$sql = 'SELECT * FROM  USERS WHERE DROITS = "INTERVENANT"';
			$run = mysqli_query($con, $sql);

			while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
				$tab[] = $getData;
			}
			echo json_encode($tab);
		}

// Fonction pour afficher les groupes de l'intervenant
		if(isset($_POST['id']) && $_POST['action'] === 'getIntervGroup') {
			$id = mysqli_escape_string($con, $_POST['id']);
			$sql = "SELECT GROUPES.NOM FROM GROUPES
					INNER JOIN INTERGRP ON INTERGRP.IDGRP = GROUPES.IDGRP
					INNER JOIN USERS ON USERS.IDUSR = INTERGRP.IDUSR
					WHERE USERS.IDUSR = ".$id."";
			$run = mysqli_query($con, $sql);

			while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
				$grpInterv = '<div class="btn btn-dark p-2 m-3">'.$getData['NOM'].'</div><span class="btn btn-danger"><i class="fas fa-trash-alt"></i></span><br>';
				echo $grpInterv;
			}
		}





	}// Fin du else $con
?>