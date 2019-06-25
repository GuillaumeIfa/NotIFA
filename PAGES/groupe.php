<?php session_start() ?>

<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" href="../CSS/style.css">
	</head>
	<body class="bg-dark">
		<?php include_once './menu.php'; ?>
		<div id="wrapper" class="container">
			<div class="container row">
				<h1 class="text-white col-10">Discussion <?php echo $_SESSION['groupe'] ?></h1>
				<div class="custom-control custom-switch col-2">
					<input type="checkbox" class="custom-control-input" unchecked id="customSwitch1">
					<label class="custom-control-label text-white align-middle mt-3" for="customSwitch1">Déonnecté(e)</label>
				</div>
			</div>
			<hr class="bg-light">
			<div class="card">
				<div class="card-body text-dark">
					<div id="messages" class="list-group"><!-- la liste des derniers messages ici affichés en JS --></div>
				</div>
				<div class="card-footer bg-dark">
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
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
		<script src="../JS/groupe.js"></script>
	</body>
</html>
