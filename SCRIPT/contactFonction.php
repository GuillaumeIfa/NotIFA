<?php 
	session_start();
	include '../configure.php';

	if ( isset($_POST['action']) && $_POST['action'] == 'msgAdmin' ) {
		$msg = $_POST['msg'];
		$idUSr = $_SESSION['idusr'];

		$rqt = 'INSERT INTO MESSAGE (MSG, IDUSR, CIBLE, IDCBL)
				VALUES ("'.$msg.'", '.$idUSr.', "ADMINISTRATION", 1);';

		mysqli_query($db_handle, $rqt);
	}

	if ( isset($_GET['action']) && $_GET['action'] == 'getMsgFromAdmin' ) {
		$idUsr = $_SESSION['idusr'];

		$sql = 'SELECT MESSAGE.*, DATE_FORMAT(MESSAGE.DATE, "%H:%i - %d/%m/%y") AS DATE_FR
				FROM MESSAGE
				WHERE IDCBL = '.$idUsr.' AND CIBLE = "ADMINISTRATION";';

		$run = mysqli_query($db_handle, $sql);

		while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
			$tab[] = $getData;
		}

		echo json_encode( $tab );
	}

	if ( isset($_POST['id']) && $_POST['action'] === 'delMsg') {
		$id = mysqli_escape_string($db_handle, $_POST['id']);
		$rqt = "DELETE FROM MESSAGE WHERE IDMSG = ".$id."";
		mysqli_query($db_handle, $rqt);
	}

 ?>