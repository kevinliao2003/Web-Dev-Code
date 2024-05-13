<?php
	print "<h1>Payment Confirmation for {$_GET['name']}</h1>";
	print "<p>";
	print "A payment of \${$_GET['payment']} has been received for account {$_GET['account']}";
	print "</p>";
	print "Receive news:  {$_GET['news']} <br />";
	print "Payment Plan:  {$_GET['plan']} <br />";
	print "Location:  {$_GET['location']}";
?>
