<?php
	$errName = '';
	$errEmail = '';
	$errMessage = '';
	$errHuman = '';
	$result = '';
	if (isset($_POST["submit"])) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
		$from = 'From: lumaki-team@lumaki.co'; 
		$to = 'lumakiapps@gmail.com'; 
		$subject = 'Message from Contact Us';
		
		$body ="From: $name\n\nE-Mail: $email\n\nMessage: $message";
		$return = "Hello $name,\n\nThank you reaching out to us!\n\nYour message was: '$message'\n\nWe will get back to you shorty, have a great day!\n\n Lumaki Team";
		
		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
		//Check if simple anti-bot test is correct
		if ($human !== 5) {
			$errHuman = 'Your anti-spam is incorrect';
		}
		// If there are no errors, send the email
		if (!$errName && !$errEmail && !$errMessage && !$errHuman) {
			if (mail ($to, $subject, $body)) {

				$result='<div class="alert alert-success">Thank You! We will be in touch</div>';
				mail ($email, "Lumaki - Thank you for reaching out to us!", $return,$from);
			} else {
				$result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later.</div>';
			}
		}
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  		<script src="js/jquery/1.11.3/jquery.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<script src="js/bootstrap.js"></script>
		<title>Contact Us | Lumaki</title>
	</head>
	<body>
		<div class="header">
			<img class="headerImg" src="img/lumakiLogo.png">
			<div class="navBar">
				<a href="index.html" class="navLink">Home</a>
				<a href="about.html" class="navLink">About</a>
				<a href="products.html" class="navLink">Products</a>
				<a href="contact.php" class="navLink">Contact Us</a>
			</div>
			<div class="dropdown navMenu ">
						<button class="navLink-mobile" type="button" id="main-menu" data-toggle="dropdown">Menu</button> 
					    <ul class="dropdown-menu" role="menu" aria-labelledby="main-menu">
					   	  <li role="presentation"><a class="dropdown-link" role="menuitem"  tabindex="-1" href="index.html">Home</a></li>
					      <li role="presentation"><a class="dropdown-link" role="menuitem"  tabindex="-1" href="about.html">About</a></li>
					      <li role="presentation"><a class="dropdown-link" role="menuitem" tabindex="-1" href="products.html">Products</a></li>
					      <li role="presentation"><a class="dropdown-link" role="menuitem" tabindex="-1" href="contact.php">Contact Us</a></li>
					    </ul>
			</div>
		</div>
		<div class="contact-body topShadow">
			<div class="row alignMiddle">
					<h1>
						Contact Us
					</h1>
				<form class="form-horizontal" role="form" method="post" action="contact.php">
					<div class="form-group">
				        <div class="col-sm-8 col-sm-offset-2">
				             <?php echo $result; ?>   
				        </div>
				    </div>
				    <div class="form-group">
				        <label for="name" class="col-xs-12 col-sm-1 col-sm-offset-2 control-label">Name</label>
				        <div class="col-xs-offset-1 col-xs-10 col-sm-6 col-sm-offset-0">
				            <input type="text" class="form-control" id="name" name="name" placeholder="First & Last Name" value="">
				            <?php echo "<p class='text-danger'>$errName</p>";?>
				        </div>
				    </div>
				    <div class="form-group">
				        <label for="email" class="col-xs-12 col-sm-1 col-sm-offset-2 control-label">Email</label>
				        <div class="col-xs-offset-1  col-xs-10 col-sm-6 col-sm-offset-0">
				            <input type="email" class="form-control" id="email" name="email" placeholder="example@domain.com" value="">
				            <?php echo "<p class='text-danger'>$errEmail</p>";?>
				        </div>
				    </div>
				    <div class="form-group">
				        <label for="message" class="col-xs-12 col-sm-1 col-sm-offset-2 control-label">Message</label>
				        <div class="col-xs-offset-1  col-xs-10 col-sm-6 col-sm-offset-0">
				            <textarea class="form-control" rows="4" name="message"></textarea>
				            <?php echo "<p class='text-danger'>$errMessage</p>";?>
				        </div>
				    </div>
				    <div class="form-group">
				        <label for="human" class="col-xs-12 col-sm-2 col-sm-offset-1 control-label">2 + 3 = ?</label>
				        <div class="col-xs-offset-1  col-xs-10 col-sm-6 col-sm-offset-0">
				            <input type="text" class="form-control" id="human" name="human" placeholder="Your Answer">
				            <?php echo "<p class='text-danger'>$errHuman</p>";?>
				        </div>
				    </div>
				    <div class="form-group">
				        <div class="col-xs-12 col-sm-8 col-sm-offset-2">
				            <input id="submit" name="submit" type="submit" value="Send" class="btn button-style">
				        </div>
				    </div>
				 
				</form>
			</div>
		</div>
		<div class="footer">
			Copyright Lumaki 2015
		</div>
	</body>
</html>
