<!DOCTYPE html>

<html>
    <head><title>IFS :: Arktis by Sigve Sebastian Farstad</title>
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
<a href="">IFS</a>
</nav>
<h1>IFS</h1>
<canvas width=560 height=560 id="ifs"></canvas>
<script>

var canvas = document.getElementById("ifs");
var ctx = canvas.getContext("2d");

transforms = [];

function add_transform(a,b,c,d,e,f){
    transforms.push({a:a,b:b,c:c,d:d,e:e,f:f});
}

/* SPIRAL */
/*
add_transform(0.25,       0,     0,  0.25,     0,    0.5, 0.073);
add_transform(0.823, -0.475, 0.475, 0.823, 0.301, -0.172, 0.927);
 */


/* SERPINSKI */
add_transform(0.5, 0, 0, 0.5, 0,     0, 1/3);
add_transform(0.5, 0, 0, 0.5, 0.5, 0.5, 1/3);
add_transform(0.5, 0, 0, 0.5, 1,     0, 1/3);

/* FERN */
/*
add_transform(0, 0, 0, 0.16, 0, 0, 0.01);
add_transform(0.85, 0.04, -0.04, 0.85, 0, 1.6, 0.85);
add_transform(0.2, -0.26, 0.23, 0.22, 0, 1.6, 0.07);
add_transform(-0.15, 0.28, 0.26, 0.24, 0, 0.44, 0.07);
 */
colors = [
    "rgba(255,255,255,0.25)",
    "rgba(255,255,255,0.25)",
    "rgba(255,255,255,0.25)",
    "rgba(255,255,255,0.25)"
    ]

function transform(point,ctx){
    var rand = (Math.random()*transforms.length)|0;
    var transform = transforms[rand];
    ctx.fillStyle = colors[rand];
    old_x = point.x;
    point.x = transform.a*point.x + transform.b*point.y + transform.e;
    point.y = transform.c*old_x + transform.d*point.y + transform.f;
}

var time, old_time, dt, t;
point = {x:0,y:0};
ctx.fillStyle = "black";
ctx.fillRect(0,0,560,560);
ctx.fillStyle = "black";
var ZOOM = 0.5;
var ROT = 0.0;
var focal_x = 0;
var focal_y = 0;

function render(ctx){
    ctx.fillStyle = "black";
    ctx.globalCompositeOperation = "source-over";
    ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    for(var i=0;i<16;i++){
        ctx.save();
        ctx.translate(focal_x*ctx.canvas.width, focal_y*ctx.canvas.height);
        ctx.rotate(ROT+i/4*Math.PI);
        ctx.scale(ZOOM/+(i<4),ZOOM/+(i<4));
        ctx.drawImage(fractal,-fractal.width/2,-fractal.height/2);
        ctx.restore();
    }

}

function update(){
    t++;
    ROT += 0.01;
    ZOOM += 0.01;
    focal_x = 0.5+0.5*Math.sin(ROT);
    focal_y = 0.5+0.5*Math.cos(ROT);
    while(ZOOM > 1){
        ZOOM -=0.5;
    }
}

function generate_texture(){
    var c = document.createElement("canvas"); 
    var x = c.getContext("2d");
    c.width = canvas.width*4;
    c.height = canvas.height*4;
    x.clearRect(0,0,c.width,c.height);
    for(var i=0;i<300000;i++){
        transform(point,x);
        x.fillRect(focal_x+point.x*c.width,focal_y+point.y*c.height,1,1);
    }

    var img = new Image();
    img.src = c.toDataURL("image/png");
    return img;
}

fractal = generate_texture();


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

