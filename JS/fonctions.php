<?php 

include '../configure.php';

	/*****************************
	* FONCTIONS GESTION GROUPES *
	****************************/

// Fonction qui ajoute un groupe
	if (isset($_POST['groupe']) && $_POST['action'] === 'addGroupe') {
		$groupe = mysqli_escape_string($db_handle, $_POST['groupe']);

		$rqtNom = 'SELECT * FROM GROUPES WHERE NOMGRP = "'.$_POST['groupe'].'";';
		$result_query = mysqli_query($db_handle, $rqtNom);
		$dbField = mysqli_fetch_assoc($result_query);

		if ($dbField) {
			$msg = "Ce groupe existe déjà, veuillez choisir un autre nom ‍🙆‍";
			echo $msg;
		} else {
			if ($groupe != '') {
				$sql = "INSERT INTO GROUPES (NOMGRP) VALUES ('$groupe')";
				mysqli_query($db_handle, $sql);
			}
		}
	}

// Fonction qui affiche les groupes
	if($_GET['action'] === 'getGroupes') {
		$sql = "SELECT * FROM  GROUPES";
		$run = mysqli_query($db_handle, $sql);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		echo json_encode($tab);
	}

// Fonction qui supprime un groupe
	if (isset($_POST['id']) && $_POST['action'] === 'delGroupe') {
		$id = mysqli_escape_string($db_handle, $_POST['id']);
		$sql = "DELETE FROM GROUPES WHERE IDGRP = ".$id."";
		mysqli_query($db_handle, $sql);
	}

// Fonction pour éditer un groupe
	if (isset($_POST['id']) && $_POST['action'] === 'editGroupe') {
		$nom = mysqli_escape_string($db_handle, $_POST['nom']);
		$id = mysqli_escape_string($db_handle, $_POST['id']);
		$sql = "UPDATE GROUPES SET NOMGRP = ('$nom') WHERE IDGRP = ".$id."";
		mysqli_query($db_handle, $sql);
	};

//
	/**********************************
	* FONCTIONS GESTION INTERVENANTS *
	********************************/

// Fonction pour afficher les intervenants
	if($_GET['action'] === 'getInterv') {
		$sql = 'SELECT * FROM  USERS WHERE DROITS = "INTERVENANT"';
		$run = mysqli_query($db_handle, $sql);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		echo json_encode($tab);
	}

// Fonction pour afficher les groupes de l'intervenant
	if(isset($_POST['id']) && $_POST['action'] === 'getIntervGroup') {
		$id = mysqli_escape_string($db_handle, $_POST['id']);
		$sql = "SELECT GROUPES.NOMGRP, USERS.IDUSR, GROUPES.IDGRP FROM GROUPES
				INNER JOIN INTERGRP ON INTERGRP.IDGRP = GROUPES.IDGRP
				INNER JOIN USERS ON USERS.IDUSR = INTERGRP.IDUSR
				WHERE USERS.IDUSR = ".$id."";
		$run = mysqli_query($db_handle, $sql);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		if(isset($tab)) {
			echo json_encode($tab);
		} else {
			$tab[] = array("NOMGRP" => "pas de groupe" , "IDUSR" => "0","IDGRP" => "0");
			echo json_encode($tab);
		}
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
			$result_query = mysqli_query($db_handle, $rqtInterv);
			$dbField = mysqli_fetch_assoc($result_query);

			if ($dbField) {
				$msg = "Ce mail est déjà utilisé, merci d'en choisir un autre";
				echo $msg;
			} else {
				if ($nom != '' && $prenom != '' && $email != '' && $mdp != ''){
					$sql = "INSERT INTO USERS (PSEUDO, NOM, PRENOM, EMAIL, MDP, DROITS) VALUES ('$pseudo', '$nom', '$prenom', '$email', '$mdp', 'INTERVENANT')";
					mysqli_query($db_handle, $sql);
				}
			}

			$rqtIntervId = 'SELECT IDUSR FROM USERS WHERE EMAIL = "'.$email.'";';
			$result_query = mysqli_query($db_handle, $rqtIntervId);
			$dbField = mysqli_fetch_assoc($result_query);
			$id = $dbField["IDUSR"];
			foreach ($groupes as $value) {
				$rqtAddGrpInterv = "INSERT INTO INTERGRP (IDUSR, IDGRP) VALUES ('$id', '$value')";
				mysqli_query($db_handle, $rqtAddGrpInterv);
			}
			echo "Intervenant(e) ajouté(e) avec succès !";
		} else {
			echo "Vous n'avez pas sélectionné(e) de groupe...";
		}
	}

// Fonction pour supprimer un intervenant d'un groupe
	if (isset($_POST['idGrp']) && $_POST['action'] === 'delGroupeInterv') {
		$id = mysqli_escape_string($db_handle, $_POST['id']);
		$idGrp = mysqli_escape_string($db_handle, $_POST['idGrp']);
		$rqt = "DELETE FROM INTERGRP WHERE IDGRP = ".$idGrp. " AND IDUSR = ".$id."";
		mysqli_query($db_handle, $rqt);
		echo "Intervenant(e) mis(e) à jour !";
	}

// Fonction pour ajouter un l'intervenant dans des groupes
	if(isset($_POST['groupes']) && $_POST['action'] === 'addGroupeInterv') {
		$id = $_POST['id'];
		$groupes = $_POST['groupes'];
		foreach ($groupes as $value) {
			$rqtAddGrpIntervenant = "INSERT INTO INTERGRP (IDUSR, IDGRP) VALUES ('$id', '$value')";
			mysqli_query($db_handle, $rqtAddGrpIntervenant);
		}
		echo "Groupes de l'intervenant mis à jour";
	}

// Fonction qui supprime un intervenant
	if ( isset($_POST['id']) && $_POST['action'] === 'delInterv' ) {
		$id = mysqli_escape_string($db_handle, $_POST['id']);
		$sql = "DELETE FROM USERS WHERE IDUSR = ".$id."";
		mysqli_query($db_handle, $sql);
	}

//
	/**********************************
	* FONCTIONS GESTION UTILISATEURS *
	********************************/

// Fonction pour afficher les utilisateurs
	if($_GET['action'] === 'getUsr') {
		$rqt = 'SELECT * FROM USERS WHERE DROITS = "STAGIAIRE"';
		$run = mysqli_query($db_handle, $rqt);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) )  {
			$tab[] = $getData;
		}
		echo json_encode($tab);
	}

// Fonction pour supprimer un utilisateur
	if ( isset($_POST['id']) && $_POST['action'] === 'delUsr' ) {
		$id = mysqli_escape_string($db_handle, $_POST['id']);
		$sql = "DELETE FROM USERS WHERE IDUSR = ".$id."";
		mysqli_query($db_handle, $sql);
	}

// Fonction pour ajouter un utilisateur
	if ( isset($_POST['email']) && $_POST['action'] === 'addUsr') {

		$nom = $_POST['nom'];
		$prenom = $_POST['prenom'];
		$pseudo = $prenom. '.' .$nom;
		$email = $_POST['email'];
		$mdp = $_POST['mdp'];

		if ( isset($_POST['groupe']) ) {

			$groupe = $_POST['groupe'];
			$rqtUsr = 'SELECT * FROM USERS WHERE EMAIL = "'.$email.'";';
			$result_query = mysqli_query($db_handle, $rqtUsr);
			$dbField = mysqli_fetch_assoc($result_query);

			if ($dbField) {
				$msg = "Ce mail est déjà utilisé, merci d'en choisir un autre";
				echo $msg;
			} else {
				if ($nom != '' && $prenom != '' && $email != '' && $mdp != '') {
					$sql = "INSERT INTO USERS (PSEUDO, NOM, PRENOM, EMAIL, MDP, DROITS) VALUES ('$pseudo', '$nom', '$prenom', '$email', '$mdp', 'STAGIAIRE');";
					echo $sql;
					mysqli_query($db_handle, $sql);
				}
			}
			
			$rqtUsrId = 'SELECT IDUSR FROM USERS WHERE EMAIL = "'.$email.'";';
			$result_query = mysqli_query($db_handle, $rqtUsrId);
			$dbField = mysqli_fetch_assoc($result_query);
			$id = $dbField["IDUSR"];
			$rqtUsrGrp = "INSERT INTO INTERGRP (IDUSR, IDGRP) VALUES ('$id', '$groupe')";
			echo $rqtUsrGrp;
			mysqli_query($db_handle, $rqtUsrGrp);
		}
	}

//
	/******************************
	* FONCTIONS GESTION MESSAGES *
	****************************/

// Fonction pour afficher les messages dans l'espace administration
	if($_GET['action'] === 'getMsgAdmin') {
		$rqt = 'SELECT MESSAGE.*, USERS.*, GROUPES.*, DATE_FORMAT(MESSAGE.DATE, "%H:%i - %d/%m/%y") AS DATE_FR 
				FROM MESSAGE 
				INNER JOIN USERS ON MESSAGE.IDUSR = USERS.IDUSR
				INNER JOIN INTERGRP ON USERS.IDUSR = INTERGRP.IDUSR
				INNER JOIN GROUPES ON INTERGRP.IDGRP = GROUPES.IDGRP
				WHERE CIBLE = "ADMINISTRATION"';
		$run = mysqli_query($db_handle, $rqt);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		echo json_encode($tab);
	}

// Fonction pour supprimer les messages dans l'espace administration
	if ( isset($_POST['id']) && $_POST['action'] === 'delMsg') {
		$id = mysqli_escape_string($db_handle, $_POST['id']);
		$rqt = "DELETE FROM MESSAGE WHERE IDMSG = ".$id."";
		mysqli_query($db_handle, $rqt);
	}


?>