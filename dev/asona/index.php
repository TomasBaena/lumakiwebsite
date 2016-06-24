<!DOCTYPE html>
<html lang="en">
    <head>
    <?php require_once("meta.php") ;?>
    <title>ASONA | Home</title>
    </head>
    <body>
        <div class="container-fluid container" id="home-page" >
            <?php require_once("header.php") ;?>
            <div class="body">
                <div class="brand-sidebar hidden-xs hidden-sm" data-spy="affix" data-offset-top="0" style="z-index:11;">
                    <a class="sidebar-link" onclick="sidebarTriangle()"><img class="sidebar-logo" src="img/triangle-logo.png"></a>
                    <a class="sidebar-link" onclick="sidebarHegel()"><img class="sidebar-logo" src="img/hegel-logo.jpg"></a>
                    <a class="sidebar-link" onclick="sidebarAnalogue()"><img class="sidebar-logo" src="img/audio-analogue-logo.jpg"></a>
                    <a class="sidebar-link" onclick="sidebarAune()"><img class="sidebar-logo" src="img/aune-audio.jpeg"></a>
                    <a class="sidebar-link" onclick="sidebarHifiman()"><img class="sidebar-logo" src="img/Hifiman-logo.png"></a>
                    <a class="sidebar-link" onclick="sidebarIndiana()"><img class="sidebar-logo" src="img/indiana-line-logo.jpg"></a>
                    <a class="sidebar-link" onclick="sidebarNuprime()"><img class="sidebar-logo" src="img/Nuprime-logo.png"></a>
                    <a class="sidebar-link" onclick="sidebarAsona()"><img class="sidebar-logo" src="img/asona-logo-blue.jpg"></a>
                </div>
<!--                 <div class="row">
                    <div id="main-carousel" class="carousel slide col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1" data-ride="carousel" data-interval="false">
                        <ol class="carousel-indicators">
                            <li data-target="#main-carousel" data-slide-to="0" class="active"></li>
                            <li data-target="#main-carousel" data-slide-to="1"></li>
                        </ol>
                        <div class="carousel-inner" role="listbox">      
                            <div class="item active">
                                <div class="embed-responsive embed-responsive-16by9">
                                  <iframe class="embed-responsive-item" width="560" height="315" src="https://www.youtube.com/embed/KAxEgnag8Ao?controls=0" frameborder="0" allowfullscreen></iframe>
                                </div>
                            </div>
                            
                            <div class="item">
                                <div class="embed-responsive embed-responsive-16by9">
                                    <iframe class="embed-responsive-item" width="560" height="315" src="https://www.youtube.com/embed/2lrgoVGdKwU?controls=0" frameborder="0" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div> -->
                <div class="spacer-110 hidden-xs hidden-sm"></div>
                <div class="spacer-30"></div>
                <?php require_once("triangle-feature.php") ;?>
                <div class="spacer-20"></div>
                <?php require_once("hegel-feature.php") ;?>
                <?php /*<div class="spacer-20"></div>
                <?php require_once("audio-alchemy-feature.php") ;?>*/?>
                <div class="spacer-20"></div>
                <?php require_once("audio-analogue-feature.php") ;?>
                <div class="spacer-20"></div>
                <?php require_once("aune-feature.php") ;?>
                <div class="spacer-20"></div>
                <?php require_once("hifiman-feature.php") ;?>
                <div class="spacer-20"></div>
                <?php require_once("indiana-line-feature.php") ;?>
                <div class="spacer-20"></div>
                <?php require_once("nuprime-feature.php") ;?>
                <?php /*<div class="spacer-20"></div>
                <?php require_once("pmc-feature.php") ;?>
                <div class="spacer-20"></div>
                <?php require_once("takstar-feature.php") ;?> */?>
                <div class="spacer-20"></div>
                <?php require_once("asona-feature.php") ;?>
                <div class="spacer-20"></div>
            </div>
            <?php require_once("footer.php") ;?>
        </div>
    </body>
</html>
