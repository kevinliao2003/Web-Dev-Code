<!doctype html>
<html>

<head>
	<meta charset="utf-8" />
	<title>Post Example Processing</title>
</head>

<body>
	<?php 
			echo "<h1>Look at the URL; you will NOT see parameters</h1>";
			echo "<h1>Execute the script again by reloading this page; what do you see?</h1>";
			$nameSubmitted = $_POST['name'];
			$ageSubmitted = $_POST['age'];
			if ($nameSubmitted === "Mary") {
				echo "<strong>Welcome Mary, my friend!!</strong>";
			} else { 
				echo "<strong>Welcome $nameSubmitted</strong>";
			}
			echo "<br><strong>Received age value is: $ageSubmitted</strong>";
		?>
</body>

</html>
