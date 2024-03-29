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
	</head>
	<body class="bg-dark">
		<?php include_once './menu.php'; ?>
		<div class="container">
			<h1 class="text-light mb-3">Informations</h1>
			<div class="card mb-3 p-3 bg-dark border border-light" id="msgFromAdmin">
				<div class="text-center text-light">
					<div class="spinner-border m-5 p-3" id="loader">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			</div>
		</div>
		<hr class="bg-light m-5">
		<div class="container">
			<div class="form-group">
				<label for="formAdmin" class="text-light"><h4>Contacter Administration:</h4></label>
				<textarea class="form-control" id="formAdmin" rows="5"></textarea>
				<button class="btn btn-outline-light my-3 col-md-2" id="btnAdmin">Envoyer</button>
			</div>
		</div>

		<?php include_once './footer.php'; ?>
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
		<script src="../SCRIPT/contact.js"></script>
	</body>
</html>