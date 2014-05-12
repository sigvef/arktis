<!DOCTYPE html>
<html>
<head>
<title>
QR Clock :: Arktis by Sigve Sebastian Farstad
</title>
<meta charset="UTF-8">
<meta name=viewport content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css.css" type="text/css" />
<script src=qr.js></script>
<? require("../../stats.inc");?>
<style>
img#clock{display:block;margin:0 auto}
footer{margin-top:20px}
</style>
</head>
<body>

<header>
<nav>
<a href="/">Arktis</a>
 » 
<a href="/hacks">Hacks</a>
 » 
<a href="">QR Clock</a>
</nav>
<h1>QR Clock</h1>
</header>


<img id=clock>

<script>
(function(){
    function zeropad(number, n){
        number = ""+number;
        while(number.length < n){
            number = "0"+number;
        }
        return number;
    }

    var update;
    setInterval(update = function(){
        var time = new Date();
        var timestring = zeropad(time.getHours(),2)+":"+zeropad(time.getMinutes(),2)+":"+zeropad(time.getSeconds(),2);
        var src = QRCode.generatePNG(timestring, {ecclevel: 'H'});
        clock.src = src;
    }, 1000);

    update();
})();
</script>

<? require('../../footer.inc');?>
</body>
</html>
