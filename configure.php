<?php

	define('DB_SERVER', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASS', 'root');

	$db_handle = mysqli_connect(DB_SERVER, DB_USER, DB_PASS);
	$db_name = 'AlertIFA';
	$db = mysqli_select_db($db_handle, $db_name);

?>