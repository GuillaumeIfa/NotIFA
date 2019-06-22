<?php 

	include '../configure.php';

	$mdp1 = '';
	$mdp2 = '';

	if ( isset($_POST['submitInscription']) ) {
		if ( $_POST['mdp1'] != $_POST['mdp2'] ) {
			echo '
				<div class="fixed-top alert alert-danger alert-dismissible fade show" role="alert">
					<i class="fas fa-exclamation-triangle pr-2"></i> Les mots de passe ne correspondent pas 
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			';
		} else {
			$nom = $_POST['nom'];
			$prenom = $_POST['prenom'];
			$pseudo = $prenom. '.' .$nom;
			$email = $_POST['email'];
			$groupes = $_POST['groupes'];
			$mdp = $_POST['mdp1'];

			if ( $db ) {
				$rqtMail = 'SELECT EMAIL FROM USERS WHERE EMAIL = "' .$email. '";';
				$result_query = mysqli_query( $db_handle, $rqtMail );
				$db_field = mysqli_fetch_assoc( $result_query );

				if ( $db_field ) {
					echo '
						<div class="fixed-top alert alert-danger alert-dismissible fade show" role="alert">
							<i class="fas fa-exclamation-triangle pr-2"></i> Cet email est déjà utilisé ! 
							<button type="button" class="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					';
				} else {
					$rqt = '
						INSERT INTO USERS (PSEUDO, NOM, PRENOM, EMAIL, MDP, DROITS)
						VALUES ("'.$pseudo.'","'.$nom.'","'.$prenom.'","'.$email.'","'.$mdp.'","STAGIAIRE");
					';
					$result_query = mysqli_query( $db_handle, $rqt );
					if ( $result_query ) {
						echo '
							<div class="fixed-top alert alert-success alert-dismissible fade show" role="alert">
								<h4><i class="fas fa-thumbs-up"></i> Felicitation !</h4> <br> 
								Vous êtes inscrit, vous pouvez maintenant vous connecter <a href="../index.tmp.php"><b>ICI</b></a>
								<button type="button" class="close" data-dismiss="alert" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						';
					}
				}
			}
		}
	}

 ?>