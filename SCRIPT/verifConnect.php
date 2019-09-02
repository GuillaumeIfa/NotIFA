<?php 
	session_start();
	if ( !isset($_SESSION['email']) ) {
		header('Location: ../index.php');
	} else 	if ( $_SESSION['connected'] ) {
		echo '
			<div class="fixed-top alert alert-success alert-dismissible fade show" role="alert">
				Bienvenue ' .$_SESSION['prenom']. ' !
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		';
		$_SESSION['connected'] = false;

		require_once '../configure.php';

		$rqtGrp = 'SELECT GROUPES.*, USERS.* 
					FROM GROUPES 
					INNER JOIN INTERGRP ON INTERGRP.IDGRP = GROUPES.IDGRP 
					INNER JOIN USERS ON USERS.IDUSR = INTERGRP.IDUSR 
					WHERE USERS.IDUSR = '.$_SESSION['idusr'].';';

		$result_query = mysqli_query($db_handle, $rqtGrp);
		$db_field = mysqli_fetch_assoc($result_query);
		$_SESSION['groupe'] = $db_field['NOMGRP'];
		$_SESSION['idGrp'] = $db_field['IDGRP'];
		$_SESSION['droits'] = $db_field['DROITS'];
	}
 ?>
