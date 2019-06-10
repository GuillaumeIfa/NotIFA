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
			$sql = "SELECT GROUPES.NOM, USERS.IDUSR, GROUPES.IDGRP FROM GROUPES
					INNER JOIN INTERGRP ON INTERGRP.IDGRP = GROUPES.IDGRP
					INNER JOIN USERS ON USERS.IDUSR = INTERGRP.IDUSR
					WHERE USERS.IDUSR = ".$id."";
			$run = mysqli_query($con, $sql);

			while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
				$tab[] = $getData;
			}
			echo json_encode($tab);
		}

// Fonction pour ajouter un intervenant
		if(isset($_POST['nom']) && $_POST['action'] === 'addInterv') {
			
			$nom = $_POST['nom'];
			$prenom = $_POST['prenom'];
			$pseudo = $prenom.'.'.$nom;
			$email = $_POST['email'];
			$mdp = $_POST['mdp'];
			if (isset($_POST['groupes'])) {
				$groupes = $_POST['groupes'];
				$rqtInterv = 'SELECT * FROM USERS WHERE EMAIL = "'.$email.'";';
				$result_query = mysqli_query($con, $rqtInterv);
				$dbField = mysqli_fetch_assoc($result_query);
	
				if ($dbField) {
					$msg = "Ce mail est déjà utilisé, merci d'en choisir un autre";
					echo $msg;
				} else {
					if ($nom != '' && $prenom != '' && $email != '' && $mdp != ''){
						$sql = "INSERT INTO USERS (PSEUDO, NOM, PRENOM, EMAIL, MDP, DROITS) VALUES ('$pseudo', '$nom', '$prenom', '$email', '$mdp', 'INTERVENANT')";
						mysqli_query($con, $sql);
					}
				}

				$rqtIntervId = 'SELECT IDUSR FROM USERS WHERE EMAIL = "'.$email.'";';
				$result_query = mysqli_query($con, $rqtIntervId);
				$dbField = mysqli_fetch_assoc($result_query);
				$id = $dbField["IDUSR"];
				foreach ($groupes as $value) {
					$rqtAddGrpInterv = "INSERT INTO INTERGRP (IDUSR, IDGRP) VALUES ('$id', '$value')";
					mysqli_query($con, $rqtAddGrpInterv);
				}
				echo "Intervenant(e) ajouté(e) avec succès !";
			} else {
				echo "Vous n'avez pas sélectionné(e) de groupe...";
			}
		}

// Fonction pour supprimer un intervenant d'un groupe
		if (isset($_POST['idGrp']) && $_POST['action'] === 'delGroupeInterv') {
			$id = mysqli_escape_string($con, $_POST['id']);
			$idGrp = mysqli_escape_string($con, $_POST['idGrp']);
			$rqt = "DELETE FROM INTERGRP WHERE IDGRP = ".$idGrp. " AND IDUSR = ".$id."";
			mysqli_query($con, $rqt);
			echo "Intervenant(e) mis(e) à jour !";
		}





	}// Fin du else $con
?>