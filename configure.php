<?php

	define('DB_SERVER', 'localhost');
	define('DB_USER', 'proot');
	define('DB_PASS', 'proot');
	define('DB_NAME', 'alertifa');

	$db_handle = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);

	if ( !$db_handle ) {
		echo "Erreur de connection à la base de données:" .mysql_connect_errno(). " - " .mysqli_connect_error();
		exit;
	}

?>