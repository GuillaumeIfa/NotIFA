<?php 
	include_once '../SCRIPT/verifConnect.php';
	$idInt = $_SESSION['idusr'];
?>
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="../CSS/style.css">
		<script src="https://code.createjs.com/1.0.0/soundjs.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js" crossorigin="anonymous"></script>
		<script src="../SCRIPT/groupe.js"></script>
	</head>
	<body class="bg-dark" >
		<style>
			body {
				min-height: 800px;
			}
			#messages {
				height: 600px;
				overflow: auto;
			}
		</style>
		<?php include_once './menu.php'; ?>
		<div class="container mb-3">
			<div class="container row">
				<h1 class="fontIFA col-10">Discussion <b><?php if ( $_SESSION['droits'] == 'STAGIAIRE' ) { echo $_SESSION['groupe']; } ?></b>
				</h1>
				<div class="custom-control custom-switch col-lg-2">
					<input type="checkbox" class="custom-control-input" unchecked id="customSwitch1">
					<label class="custom-control-label text-white align-middle mt-3" for="customSwitch1">Déconnecté(e)</label>
				</div>
			</div>
			<hr class="bg-light">
			<div class="row">
				<?php if ( $_SESSION['droits'] == 'INTERVENANT') {
						echo '<div class="input-group col-lg-4">
									<select class="custom-select text-dark" id="grpInt"></select>
									<div class="input-group-append mb-3">
										<button class="btn btn-outline-light" type="button" id="btnGrpInt">Rejoindre</button>
									</div>
								</div>';
					} else {
						echo '<div class="col-lg mb-3">
								<button class="btn btn-outline-light" onclick="window.location.href=\'./groupe.php\'">Groupe</button>
								</div>';
					} 
				?>

				<div class="input-group col-lg-4 offset-lg-4">
					<select class="custom-select text-dark" id="inputGrpChat">
						<!-- Affichage des utilisateurs du groupe -->
					</select>
					<div class="input-group-append mb-3">
						<button class="btn btn-outline-light" type="button" id="btnMsgUsr">Rejoindre</button>
					</div>
				</div>
			</div>
			<div class="card pb-2 mx-auto bg-dark border border-light">
				<div class="card-body">
					<div id="messages" class="list-group">
						<!-- la liste des derniers messages ici affichés en JS -->
					</div>
				</div>
				<div class="card-footer bg-dark rounded mx-2">
					<div class="row py-3">
						<div class="col-md-9 col-sm-12">
							<input class="form-control mt-1" type="text" id="chatMessage" />
						</div>
						<div class="col-md-3 col-sm-12">
							<button id="chatBtn" class="btn btn-outline-light btn-block mt-1">Envoyer</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php include_once './footer.php'; ?>
	</body>
</html>
