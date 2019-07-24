<?php
	echo '
			<div class="m-0 menu"> 
				<img src="../IMG/Logo-IFA-1.png" class="logoIfa mx-auto d-block">
			</div>
				<div class="navMenu sticky-top text-white bg-dark d-inline-block rounded pr-2 m-2">
					<div id="myNav" class="overlay">
						<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
						<div class="overlay-content">
							<a href="index.index.php">Accueil</a>
							<a href="./groupe.php">Groupe</a>
							<a href="./profile.php">Profil</a>
							<a href="./contact.php">Contact</a>
							<a href="../JS/quit.php">Déconnection</a>
						</div>
					</div>
					<span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; Menu</span>
				</div>
	';
?>