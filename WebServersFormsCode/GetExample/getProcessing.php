<!doctype html>
<html>

<head>
	<meta charset="utf-8" />
	<title>Get Example Processing</title>
</head>

<body>
	<?php 
			echo "<h1>Look at the URL; you will see parameters</h1>";
			echo "<h1>Change parameters and execute script by pressing enter</h1>";
			$nameSubmitted = $_GET['name'];
			$ageSubmitted = $_GET['age'];
			if ($nameSubmitted === "Mary") {
				echo "<strong>Welcome Mary, my friend!!</strong>";
			} else { 
				echo "<strong>Welcome $nameSubmitted</strong>";
			}
			echo "<br><strong>Received age value is: $ageSubmitted</strong>";
		?>
</body>

</html>
