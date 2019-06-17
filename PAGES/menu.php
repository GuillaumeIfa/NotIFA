<?php
	echo '
			<img src="./IMG/bg-img.jpg" class="img-fluid">
			<div class="container navMenu sticky-top border text-white bg-dark">
				<div id="myNav" class="overlay">
					<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
					<div class="overlay-content">
						<a href="accueil.php">Accueil</a>
						<a href="profil.php">Profil</a>
						<a href="#">Groupe</a>
						<a href="#">Contact</a>
					</div>
				</div>
				<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; Menu</span>
				<img class="float-right" src="./IMG/LogoIFA.png" width="55px">
			</div>
	';
?>