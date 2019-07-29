<?php 
	session_start();
	if ( !isset($_SESSION['email']) ) {
		header('Location: ../index.tmp.php');
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

		// var_dump( $_SESSION );
	}


 ?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="https://csshake.surge.sh/csshake.min.css">
		<link rel="stylesheet" href="../CSS/style.css">
	</head>
	<body class="bg-dark">
		<?php include_once './menu.php'; ?>
		<div class="container text-white">
			<div class="text-center">
				<div class="spinner-border m-5 p-3" id="loader">
					<span class="sr-only">Loading...</span>
				</div>
			</div>
			<?php include_once './nouvelles.php'; ?>
		</div>
		<?php include_once './footer.php'; ?>
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
		<script src="../JS/accueil.js"></script>
	</body>
</html>
