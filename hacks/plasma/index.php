<!DOCTYPE html>

<html>
    <head>
        <title>Plasma :: Arktis by Sigve Sebastian Farstad</title>
        <meta charset="UTF-8">

<link rel="stylesheet" href="/css.css" type="text/css" />
<? require("../../stats.inc");?>
    </head>

    <body>
<header>
<nav>
<a href="/">Arktis</a>
»
<a href="/hacks">Hacks</a>
»
<a href="">Plasma</a>
</nav>
<h1>Plasma</h1>
</header>
<p>Plasma.</p>
        <canvas style="display:block;margin:50px auto;" id="plasma" width="560" height="560">Your browser does not support canvas.</canvas>
        <canvas style="display:none;" id="buff" width="45" height="45"></canvas>
        <script>
            var canvas = document.getElementById('plasma');  
            var ctx = canvas.getContext('2d');  
            var canvas2 = document.getElementById('buff');  
            var ctx2 = canvas2.getContext('2d');  

            var img = ctx2.getImageData(0,0,canvas2.width,canvas2.height);

            var time = 0;
            var abs = Math.abs;
            var sin = Math.sin;
            var cos = Math.cos;
            var oldtime = 0;
            function step(){
                var dt = new Date();
                for(var i=0;i<img.width*img.height;i++){
                    var index = i*4;
                    var x = i%img.width;
                    var y = ((i-x)/img.width);
                    var mov0 = x+y+cos(sin(time)*2)*100+sin(x/100)*1000;
                    var mov1 = y / img.height / 0.2 + time;
                    var mov2 = x / img.width / 0.2 + time;

                    //var c1 = abs(sin(mov1+time)/2.+mov2/2.-mov1-mov2+time);
                    var c1 = abs(sin(mov1+time)/2 +0.5)
                    var c2 = abs(sin(c1+sin(mov0/1000.+time)+sin(y/40+time)+sin((x+y)/100)*3));
                    var c3 = abs(sin(c2+cos(mov1+mov2+c2)+cos(mov2)+sin(x/1000)));
                    img.data[index] = (256*c1)%256;
                    img.data[index+1] = (256*c2)%256;
                    img.data[index+2] = (256*c3)%256;
                    img.data[index+3] = 255;
                }
            }

            function draw(){
                var dt = new Date();
                ctx2.putImageData(img,0,0);
                ctx.drawImage(canvas2,0,0);
            }

            ctx.scale(canvas.width/canvas2.width,canvas.height/canvas2.height);
            step();
            draw();
            function timer(){
                var t = new Date();
                time += ((t-oldtime)/1000)
                oldtime = t;

            }
            setInterval(function(){timer();step();draw();},0);
        </script>

<? require('../../footer.inc');?>
    </body>
</html>
