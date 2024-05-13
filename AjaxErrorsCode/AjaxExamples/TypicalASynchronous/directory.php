<?php
    $firstname = $_GET['name'];
    sleep(3); // time in seconds, to introduce query processing delay
    switch ($_GET['name']) {
    	case "Mary":
    		echo "Mary|";
    		echo "Biology|";
    		echo "AV1434";
    		break;
    	case "Peter":
    		echo "Peter|Music|CP4578";
    		break;
    	default:
    		echo $_POST['name'],"|UNKNOWN|UNKNOWN";   		
    }
?>
