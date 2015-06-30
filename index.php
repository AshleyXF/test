<!DOCTYPE html>
<!--c-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Interactivemap</title>
        <link rel="stylesheet" href="css/style.css" type="text/css"/>
        
        <script src="jquery/jquery-1.10.2.min.js"></script>
        <link rel="stylesheet" href="leaflet/leaflet.css" />
        <!--[if lte IE 8]>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.ie.css" />
        <![endif]-->
        <script src="leaflet/leaflet.js"></script>
        <link rel="stylesheet" href="js/L.Control.MousePosition.css" />
        <script src="js/L.Control.MousePosition.js"></script>
        <script src="js/leaflet-hash.js"></script>
        <link rel="stylesheet" href="draw/leaflet.draw.css" />
        <script src="draw/leaflet.draw.js"></script>
        <script src="js/configmap.js"></script>
        <script src="js/dbmarker.js"></script>
    </head>
    <body onload="init()">
        <div id="main">
            <header>
                <img src="images/Logo.png" alt="Acceuil"/>
                <nav>
                    <?php include 'menu.php' ?>
                </nav>
            </header>
            <div id='content'>
                <div id="mapcontent">
                    <div id='menumap'>
                        <?php include 'menucarte.php'; ?>
                    </div>
                    <div id='map'>&nbsp;</div>
                </div>
                
                <div id="rightcontent">&nbsp;</div>
            </div>
        </div>
    </body>
</html>
