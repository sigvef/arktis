<!DOCTYPE html>

<html>
    <head><title>Spin :: Arktis by Sigve Sebastian Farstad</title>
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
<a href="">Spin</a>
</nav>
<h1>Spin</h1>
</header>
<canvas width=560 height=560 id="spin"></canvas>
<script>

var canvas = document.getElementById("spin");
var ctx = canvas.getContext("2d");




var time, old_time, dt, t;

ctx.fillRect(0,0,560,560);


var c1 = "rgba(255,0,0,0.5)";
var c2 = "rgba(255,140,0,0.5)";

function num_cmp(a,b){return a-b;}
function render_line(ctx,x,y,w,t){
        var theta = (t/10);
        var points = [
            1+Math.cos(theta),
            1+Math.cos(theta+Math.PI/2),
            1+Math.cos(theta+2*Math.PI/2),
            1+Math.cos(theta+3*Math.PI/2),
            ].sort(num_cmp);

        var middle_index = theta/(Math.PI/2) - Math.floor(theta/(Math.PI/2)) < 0.5?2:1;
        var color_select = theta/(Math.PI) - Math.floor(theta/(Math.PI));
        color_select = color_select <= 0.75 && color_select >= 0.25;

        ctx.fillStyle = !color_select?c1:c2;
        ctx.fillRect(x +points[0]*w-w,y, w*(points[middle_index]-points[0]),1);
        ctx.fillStyle = color_select?c1:c2;
        ctx.fillRect(x +points[middle_index]*w-w,y, w*(points[3]-points[middle_index]),1);
        y=y;
}

function render(ctx){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,560,560);
    for(y=0;y<560;y++){
        render_line(ctx, 280+100*Math.cos(t/20), y, 100, t+0.05*y*Math.sin(t/30));
    }
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

