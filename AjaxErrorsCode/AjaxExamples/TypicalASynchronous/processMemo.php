<?php
    require_once("support.php");	
    $body = "";
    $body .= "<h1>Memo Processing Script</h1>";
	$body .=  "Memo sent to {$_POST['name']} <br />";
	$body .= "from the {$_POST['department']} Deparment <br />";
    $body .= "and office {$_POST['office']} <br />";
    $body .= "Memo Body<br />";
    $body .= nl2br($_POST['message']);
    echo generatePage($body);
?>