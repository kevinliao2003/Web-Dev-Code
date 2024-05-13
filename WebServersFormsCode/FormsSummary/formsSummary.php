<?php
	
	print "<strong>Full Name: </strong> ".$_GET["firstName"]." ".$_GET["lastName"]."<br />";
	print "<strong>Password Provided was: </strong>".$_GET["password"]."<br />";
	print "<strong>Email Address: </strong>".$_GET["email"]."<br />";
	print "<strong>Personal website: </strong>".$_GET["website"]."<br />";

	print "<strong>Owns a laptop: </strong>";
	if (isset($_GET['ownsLaptop'])) {
		print "Yes<br />";
	} else {
		print "No<br />";
	}

	print "<strong>Owns a desktop: </strong>";
	if (isset($_GET['ownsDesktop'])) {
		print "Yes<br />";
	} else {
		print "No<br />";
	}

	print "<strong>Computers available at school: </strong>";
	if (isset($_GET['atSchool'])) {
		print "Yes<br />";
	} else {
		print "No<br />";
	}
	
	print "<strong>Gender: </strong>";
	if (isset($_GET['gender'])) {
		print "{$_GET["gender"]}<br />";
	} else {
		print "Not specified<br />";
	}
	
	if (isset($_GET['course'])) {
		print "<strong>Course selected is: {$_GET['course']}</strong><br />";
	}
	
    print "<strong>Transcript file: </strong>";
	if (isset($_GET['transcript'])) {
		print "{$_GET["transcript"]}<br />";
	} else {
		print "None<br />";
	}

	if (isset($_GET['description'])) {
		echo "<strong>Description(Using nl2br)</strong><br />";
		echo nl2br($_GET['description']);  // notice use of nl2br
		echo "<br />";
	}

	if (isset($_GET['expertise'])) {
		echo "<strong>Expertise: {$_GET['expertise']}<strong><br />";	
	}
	
	print "<strong>Environments: </strong><br />";
	if (!isset($_GET["environments"]))
		print "No environments selected<br />";
	else {
		foreach ($_GET["environments"] as $entry) {
			print($entry."<br />");	
		}
	}	
	
	print "</p>";
?>
