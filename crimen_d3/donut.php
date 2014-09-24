<?php
	
	include("dbconnect.php");
	$dbh = testdb_connect();
	$array=[];
	
	$query ="SELECT count(`agenrepornumber`) as yoyo, `signal` as exis FROM `reportes`group by exis";
	
	
	$sth = $dbh->query($query);	
	$array1=array();
		
	echo json_encode($sth->fetchALL(PDO::FETCH_ASSOC));
?>