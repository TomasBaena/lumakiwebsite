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
        $from = 'From: info@asonaltd.com'; 
        $to = 'info@asonaltd.com'; 
        $subject = 'Message from Contact Us';
        
        $body ="From: $name\n\nE-Mail: $email\n\nMessage: $message";
        $return = "Hello $name,\n\nThank you reaching out to us!\n\nYour message was: '$message'\n\nWe will get back to you shorty, have a great day!\n\n ASONA Ltd.";
        
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
        // if ($human !== 5) {
        //     $errHuman = 'Your anti-spam is incorrect';
        // }
        // If there are no errors, send the email
        if (!$errName && !$errEmail && !$errMessage) {
            if (mail ($to, $subject, $body)) {

                $result='<div class="alert alert-success">Thank You! We will be in touch</div>';
                mail ($email, "ASONA Ltd. - Thank you for reaching out to us!", $return,$from);
            } else {
                $result='<div class="alert alert-danger">Sorry there was an error sending your message. Please try again later.</div>';
            }
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
    <?php require_once("meta.php") ;?>
    <title>ASONA | Contact Us</title>
    </head>
    <body>
        <div class="container-fluid container" >
            <?php require_once("header.php") ;?>
            <div class="body">
                 <div class="spacer-110 hidden-xs hidden-sm"></div>
                <div class="spacer-30"></div>
                <div class="row center-align">
                    <div class="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
                        <script src='https://maps.googleapis.com/maps/api/js?v=3.exp'></script><div style='overflow:hidden;height:300px;width:100%;'><div id='gmap_canvas' style='height:300px;width:100%;'></div><div><small><a href="http://embedgooglemaps.com">                                   embed google maps                           </a></small></div><div><small><a href="http://www.proxysitereviews.com/instantproxies">instantproxies</a></small></div><style>#gmap_canvas img{max-width:none!important;background:none!important}</style></div><script type='text/javascript'>function init_map(){var myOptions = {zoom:14,center:new google.maps.LatLng(43.858114,-79.33468399999998),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(43.858114,-79.33468399999998)});infowindow = new google.maps.InfoWindow({content:'<strong>ASONA Ltd.</strong><br>Markham Station, Markham, L3R 6G4<br>'});google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);</script>
                    </div>
                    <div class="col-xs-10 col-xs-offset-1 col-sm-3 col-sm-offset-0 spacer-30" style="text-align:left;">
                        ASONA Ltd.<br>
                        P.O.Box 3075, Markham Station<br>
                        Markham, Ontario<br>
                        L3R 6G4<br>
                        Canada<br><br>

                        Email: info@asonaltd.com<br>
                        Phone: (514) 930-1880
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-10 col-xs-offset-1">

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
                            <?php /*<div class="form-group">
                                <label for="human" class="col-xs-12 col-sm-2 col-sm-offset-1 control-label">2 + 3 = ?</label>
                                <div class="col-xs-offset-1  col-xs-10 col-sm-6 col-sm-offset-0">
                                    <input type="text" class="form-control" id="human" name="human" placeholder="Your Answer">
                                    <?php echo "<p class='text-danger'>$errHuman</p>";?>
                                </div>
                            </div> */?>
                            <div class="form-group">
                                <!-- <div class="col-xs-12 col-sm-8 col-sm-offset-2"> -->
                                    <input id="submit" name="submit" type="submit" value="Send" class="btn btn-lg col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3" style="background-color:#0081ff;color:#ffffff;">
                                <!-- </div> -->
                            </div> 
                        </form>
                    </div>
                </div>
                <div class="spacer-30"></div>
            </div>
            <?php require_once("footer.php") ;?>
        </div>
    </body>
</html>
