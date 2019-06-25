<?php 

	session_start();
	$cbl = $_SESSION['idGrp'];
	include '../configure.php';

// Fonction qui affiche les messages
	if ( isset($_GET['action']) && $_GET['action'] == 'getMessage' ) {
		$sql = 'SELECT MESSAGE.*, USERS.*, DATE_FORMAT(MESSAGE.DATE, "%H:%i - %d/%m/%y") AS DATE_FR FROM MESSAGE
				INNER JOIN USERS ON MESSAGE.IDUSR = USERS.IDUSR
				WHERE IDCBL = '.$cbl.';';
		$run = mysqli_query($db_handle, $sql);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}
		//var_dump( $_SESSION );
		echo json_encode( $tab );
	}

// Fonction qui envoie les messages
	if ( isset($_POST['action']) && $_POST['action'] == 'sendMessage') {
		$msg = mysqli_escape_string($db_handle, $_POST['msg'] );
		$idUsr = $_SESSION['idusr'];
		$idGrp = $_SESSION['idGrp'];

		$rqt = 'INSERT INTO MESSAGE (MSG, IDUSR, CIBLE, IDCBL)
				VALUES ("'.$msg.'", '.$idUsr.', "GROUPE", '.$idGrp.');';

		//var_dump( $rqt );
		mysqli_query($db_handle, $rqt);
	}


//
 ?>
