<!DOCTYPE html>
<html>
    <head><title>Circle :: Arktis by Sigve Sebastian Farstad</title>
<meta charset="UTF-8">
<meta name=viewport content="width=device-width, initial-scale=1">
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
<a href="">Circle</a>
</nav>
<h1>Circle</h1>
</header>

<canvas width=560 height=560 id="circle"></canvas>
<script>

var canvas = document.getElementById("circle");
var ctx = canvas.getContext("2d");




var time, old_time, dt, t;

ctx.fillRect(0,0,560,560);


var c1 = "rgba(234,193,1,0.9)";
var c2 = "rgba(25,140,0,1)";

function make_tex(color){
    var c = document.createElement("canvas");
    c.width = canvas.width*2;
    c.height = canvas.height*2;
    var x = c.getContext("2d");
    x.fillStyle = color;
    for(var i=0;i<100;i++){
        x.globalCompositeOperation = i&1?"source-over":"destination-out";
        x.fillStyle = "rgb("+i+","+(250-i)+","+(20+i)+")";
        x.beginPath();
        x.arc(canvas.width, canvas.height, 10*(100-i), 0, Math.PI*2, true)
        x.closePath();
        x.fill();
    }
    x.globalCompositeOperation = "source-over";
    //x.fillRect(0,0,1000,1000);

    return c;
}

var tex1 = make_tex(c1);
var tex2 = make_tex(c2);

function render(ctx){
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.globalCompositeOperation = "source-over";
    ctx.fillRect(0,0,560,560);
    ctx.globalAlpha = 0.01;
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(tex1,-560+280*(1+Math.cos(t/100)),0);
    ctx.drawImage(tex1,-550+240*(1+Math.cos(t/50)),-530+120*(1+Math.sin(t/300)));
    ctx.drawImage(tex1,-240*(1+Math.cos(t/80)),-530+120*(1+Math.sin(t/200)));
}

function update(){
    t++;
}


function loop(){
    dt += (time-old_time);
    old_time = time;
    time = new Date();
    dt = dt%1000;
    while(dt>20){
        update();
        dt-=20;
    }
    render(ctx);
    setTimeout(loop,0);
}

function start(){
    time = new Date();
    old_time = time;
    t = 0;
    dt = 0;
    setTimeout(loop,0);
}


start();
</script>
<? require('../../footer.inc');?>
    </body>
</html>

