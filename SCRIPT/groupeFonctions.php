<?php 

	session_start();
	$cbl = $_SESSION['idGrp'];
	include '../configure.php';

// Fonction qui affiche les messages
	if ( isset($_GET['action']) && $_GET['action'] == 'getMessage' ) {
		$sql = 'SELECT MESSAGE.*, USERS.*, DATE_FORMAT(MESSAGE.DATE, "%H:%i - %d/%m/%y") AS DATE_FR FROM MESSAGE
				INNER JOIN USERS ON MESSAGE.IDUSR = USERS.IDUSR
        WHERE IDCBL = '.$cbl.' AND CIBLE = "GROUPE"
        ORDER BY MESSAGE.IDMSG;';
		$run = mysqli_query($db_handle, $sql);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		//var_dump( $_SESSION );
		echo json_encode( $tab );
	}

// Fonction qui envoie les messages
	if ( isset($_POST['action']) && $_POST['action'] == 'sendMessage') {
		$msg = mysqli_escape_string( $db_handle, htmlentities($_POST['msg'] ));
		$idUsr = $_SESSION['idusr'];
		$idGrp = $_SESSION['idGrp'];

		$rqt = 'INSERT INTO MESSAGE (MSG, IDUSR, CIBLE, IDCBL)
				VALUES ("'.$msg.'", '.$idUsr.', "GROUPE", '.$idGrp.');';

		mysqli_query($db_handle, $rqt);
	}

// Fonction qui envoie un message à un utilisateur
	if ( isset($_POST['action']) && $_POST['action'] == 'sendMsgUsr') {
		$msg = mysqli_escape_string( $db_handle, $_POST['msg'] );
		$idSend = $_SESSION['idusr'];
		$idRecev = $_POST['id'];

		$rqt = 'INSERT INTO MESSAGE (MSG, IDUSR, CIBLE, IDCBL)
				VALUES ("'.$msg.'", '.$idSend.', "UTILISATEUR", '.$idRecev.');';

		mysqli_query($db_handle, $rqt);
	}

// Fonction qui affiche les utilisateurs
	if ( isset($_GET['action']) && $_GET['action'] == 'getUsers' ) {
		$idUsr = $_SESSION['idusr'];
		$sql = 'SELECT USERS.PSEUDO, USERS.IDUSR, USERS.ONLINE FROM USERS
				INNER JOIN INTERGRP ON USERS.IDUSR = INTERGRP.IDUSR
				WHERE IDGRP = '.$cbl.' AND USERS.IDUSR <> '.$idUsr.' ;';
		$run = mysqli_query($db_handle, $sql);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		echo json_encode( $tab );
	}

// Fonction qui affiche les messages avec un utilisateur
	if ( isset( $_POST['getMsgUsr'] ) ) {
		$idCbl = $_POST['getMsgUsr'];
		$idUsr = $_SESSION['idusr'];
		$sql = 'SELECT MESSAGE.*, USERS.*, DATE_FORMAT(MESSAGE.DATE, "%H:%i - %d/%m/%y") AS DATE_FR FROM MESSAGE
				INNER JOIN USERS ON MESSAGE.IDUSR = USERS.IDUSR
				WHERE IDCBL = '.$idUsr.' AND CIBLE = "UTILISATEUR" AND MESSAGE.IDUSR = '.$idCbl.'
				OR IDCBL = '.$idCbl.' AND CIBLE = "UTILISATEUR" AND MESSAGE.IDUSR = '.$idUsr.'
				ORDER BY MESSAGE.IDMSG;';
		$run = mysqli_query($db_handle, $sql);

		$tab = null;
		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		echo json_encode( $tab );
	}

// Fonction qui affiche les messages par groupe (Intervenant)
	if ( isset($_GET['action']) && $_GET['action'] == 'getMsgInt' ) {
		$idGrp = $_GET['idGrp'];
		$_SESSION['idGrp'] = $idGrp;
		$idUsr = $_SESSION['idusr'];
		$sql = 'SELECT MESSAGE.*, USERS.*, DATE_FORMAT(MESSAGE.DATE, "%H:%i - %d/%m/%y") AS DATE_FR FROM MESSAGE
				INNER JOIN USERS ON MESSAGE.IDUSR = USERS.IDUSR
				WHERE IDCBL = '.$idGrp.' AND CIBLE = "GROUPE";';

		$run = mysqli_query($db_handle, $sql);
		$tab = null;
		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		//var_dump( $_SESSION );
		echo json_encode( $tab );
	}

// Fonction pour le switch connecté/déconnecté
	if ( isset($_POST['action']) && $_POST['action'] == 'switchConnect' ) {
		if ( $_POST['stat'] == 'true' ) { 
			$sql = 'UPDATE USERS SET ONLINE = true WHERE IDUSR = ' .$_SESSION['idusr'];
			echo 'connect';
		} elseif ( $_POST['stat'] == 'false') {
			$sql = 'UPDATE USERS SET ONLINE = false WHERE IDUSR = ' .$_SESSION['idusr'];
			echo 'disconnect';
		}
		mysqli_query( $db_handle, $sql );
	}

//
 ?>
