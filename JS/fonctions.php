<?php 
	$con =mysqli_connect('localhost', 'root', 'root', 'AlertIFA');

	if(!$con) {
		echo "Erreur de connection à la base de données";
	} else {


// Fonction qui ajoute un groupe
		if (isset($_POST['groupe']) && $_POST['action'] === 'addGroupe') {
			$groupe = mysqli_escape_string($con, $_POST['groupe']);

			$rqtNom = 'SELECT * FROM GROUPES WHERE NOM = "'.$_POST['groupe'].'";';
			$result_query = mysqli_query($con, $rqtNom);
			$dbField = mysqli_fetch_assoc($result_query);

			if ($dbField) {
				$msg = "Ce groupe existe déjà, veuillez choisir un autre nom ‍🙆‍";
				echo $msg;
			} else {
				if ($groupe != '') {
					$sql = "INSERT INTO GROUPES (NOM) VALUES ('$groupe')";
					mysqli_query($con, $sql);
				}
			}
		}
	
// Fonction qui affiche les groupes
		if($_GET['action'] === 'getGroupes') {
			$sql = "SELECT * FROM  GROUPES";
			$run = mysqli_query($con, $sql);

			while( $getData = mysqli_fetch_array($run, MYSQLI_ASSOC) ) {
				$groupe = '
					<p class="pl-2 paragraph">
						'.$getData['IDGRP'].' => '.$getData['NOM'].'
						<i class="fas fa-trash-alt pr-2 float-right"></i>
						<i class="fas fa-edit pr-2 float-right"></i>
						<button type="button" class="none float-right btn btn-dark mr-2" id="editBtn">ok</button>
						<input type="text" id="editInput" class="none float-right mr-2" required placeholder="Modifier nom du groupe">
					</p><hr>';
				echo $groupe;
			}
		}
// Fonction qui supprime un groupe
		if (isset($_POST['id']) && $_POST['action'] === 'delGroupe') {
			$id = mysqli_escape_string($con, $_POST['id']);
			$sql = "DELETE FROM GROUPES WHERE IDGRP = ".$id."";
			mysqli_query($con, $sql);
		}

// Fonction pour éditer un groupe
		if (isset($_POST['id']) && $_POST['action'] === 'editGroupe') {
			$nom = mysqli_escape_string($con, $_POST['nom']);
			$id = mysqli_escape_string($con, $_POST['id']);
			$sql = "UPDATE GROUPES SET NOM = ('$nom') WHERE IDGRP = ".$id."";
			mysqli_query($con, $sql);
		}
	}


?>