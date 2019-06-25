<?php 
	session_start();

	require_once '../configure.php';

	if ( $db_handle ) {
		if ( $_POST['action'] === 'modStagi' ) {
			$id = $_SESSION['idusr'];
			$nom = mysqli_escape_string( $db_handle, $_POST['nom'] );
			$prenom = mysqli_escape_string( $db_handle, $_POST['prenom'] );
			$email = mysqli_escape_string( $db_handle, $_POST['email'] );
			$mdp = mysqli_escape_string( $db_handle, $_POST['mdp'] );
			$pseudo = mysqli_escape_string( $db_handle, $_POST['pseudo'] );

			$sql = 'UPDATE USERS SET PSEUDO = "'.$pseudo.'", NOM = "'.$nom.'", PRENOM = "'.$prenom.'", EMAIL = "'.$email.'", MDP = "'.$mdp.'" WHERE IDUSR = '.$id.';';

			$_SESSION['nom'] = $nom;
			$_SESSION['prenom'] = $prenom;
			$_SESSION['email'] = $email;
			$_SESSION['mdp'] = $mdp;
			$_SESSION['pseudo'] = $pseudo;

			mysqli_query($db_handle, $sql);
			$tab = Array('nom' => $nom, 'prenom' => $prenom, 'email' => $email, 'mdp' => $mdp, 'pseudo' => $pseudo);
			echo json_encode( $tab );
		}
	} else {
		echo "Marche pô !";
	}



 ?>