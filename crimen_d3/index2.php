<?php
	
	include("dbconnect.php");
	$dbh = testdb_connect();
	$array=[];
	
	$query= "SELECT count(`agenrepornumber`) as yoyo, weekday(`incident_date`) as exis FROM `reportes`group by weekday(`incident_date`)";
	
	
	$sth = $dbh->query($query);	
	$array1=array();
		
	echo json_encode($sth->fetchALL(PDO::FETCH_ASSOC));
?>