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

 ?>