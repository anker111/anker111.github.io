<?php
	
	function testdb_connect ()
	{
		try {
			$dbh = new PDO("mysql:host=localhost;dbname=crimenreport" , "root", "");
			return ($dbh);
		} catch (PDOException $e) {
			print "Error!: " . $e->getMessage() . "<br/>";
			die();
		}
	}
?>