<?php 
	session_start();

	include '../configure.php';

	$db = mysqli_connect('localhost', 'root', 'root');

	if ( $_POST['action'] === 'modStagi' ) {
		$id = $_SESSION['idusr'];
		$nom = mysqli_escape_string( $db, $_POST['nom'] );
		$prenom = mysqli_escape_string( $db, $_POST['prenom'] );
		$email = mysqli_escape_string( $db, $_POST['email'] );
		$mdp = mysqli_escape_string( $db, $_POST['mdp'] );
		$pseudo = mysqli_escape_string( $db, $_POST['pseudo'] );

		$_SESSION['nom'] = $nom;
		$_SESSION['prenom'] = $prenom;
		$_SESSION['email'] = $email;
		$_SESSION['mdp'] = $mdp;
		$_SESSION['pseudo'] = $pseudo;

		$sql = 'UPDATE USERS SET PSEUDO = "'.$pseudo.'", NOM = "'.$nom.'", PRENOM = "'.$prenom.'", EMAIL = "'.$email.'", MDP = "'.$mdp.'" WHERE IDUSR = '.$id.';';
		mysqli_query($db, $sql);
		$tab = Array('nom' => $nom, 'prenom' => $prenom, 'email' => $email, 'mdp' => $mdp, 'pseudo' => $pseudo);
		echo json_encode( $tab );
	}


 ?>