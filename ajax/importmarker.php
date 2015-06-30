<?php 
// uncomment below to turn error reporting on
ini_set('display_errors', 1);
error_reporting(E_ALL);

if (isset($_GET['bbox'])) {
	$bbox=$_GET['bbox'];
} else {
	// invalid request
	$ajxres=array();
	$ajxres['resp']=4;
	$ajxres['dberror']=0;
	$ajxres['msg']='missing bounding box';
	sendajax($ajxres);
}

$id = $bbox;


$dbname = 'mapjson';
$dbuser = 'AshleyXFaust';
$dbpass = 'chauvesourie666';


// open the database
try {
	$db = new PDO('mysql:host=localhost;dbname='.$dbname.';charset=utf8', $dbuser, $dbpass);
} catch(PDOException $e) {
	// send the PDOException message
	$ajxres=array();
	$ajxres['resp']=40;
	$ajxres['dberror']=$e->getCode();
	$ajxres['msg']=$e->getMessage();
	sendajax($ajxres);
}

try {
	$sql="SELECT * FROM `map` WHERE `id` = :id ";
	$stmt = $db->prepare($sql);
	$stmt->bindParam(':id', $id, PDO::PARAM_STR);
	$stmt->execute();
} catch(PDOException $e) {
	// send the PDOException message
	$ajxres=array();
	$ajxres['resp']=40;
	$ajxres['dberror']=$e->getCode();
	$ajxres['msg']=$e->getMessage();
	sendajax($ajxres);
}

sendajax($ajxres); // no return from there

function sendajax($ajx) {
	exit($ajx);
}
?>