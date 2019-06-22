<?php
	include './configure.php';

	$email = '';
	$mdp = '';

	if ( isset($_POST['submitLogin']) ) {
		$email = $_POST['email'];
		$mdp = $_POST['mdp'];

		if ( $db ) {
			$rqtMdp = 'SELECT * FROM USERS WHERE EMAIL = "' .$email. '";';

			$result_query = mysqli_query($db_handle, $rqtMdp);
			$db_field = mysqli_fetch_assoc($result_query);

			if ( $db_field ) {
				if ( $db_field['MDP'] == $mdp ) {
					session_start();
					$_SESSION['email'] = $_POST['email'];
					$_SESSION['mdp'] = $_POST['mdp'];
					$_SESSION['idusr'] = $db_field['IDUSR'];
					$_SESSION['prenom'] = $db_field['PRENOM'];
					$_SESSION['nom'] = $db_field['NOM'];
					$_SESSION['connected'] = true;
					header('Location: ./PAGES/index.index.php');
				} else {
					echo '
						<div class="fixed-top alert alert-danger alert-dismissible fade show" role="alert">
							<i class="fas fa-exclamation-triangle pr-2"></i> Il y a une erreur dans le mot de passe
							<button type="button" class="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						';
				}
			} else {
				echo '
					<div class="fixed-top alert alert-danger alert-dismissible fade show" role="alert">
						<i class="fas fa-exclamation-triangle pr-2"></i>Cet email n\'est pas enregistré 🧐
						<button type="button" class="close" data-dismiss="alert" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				';
			}
		}
	}
	mysqli_close($db_handle);
?>