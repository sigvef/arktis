<!DOCTYPE html>
<html>
    <head><title>Fukt :: Arktis by Sigve Sebastian Farstad</title>
<meta charset="UTF-8">
<link rel="stylesheet" href="/css.css" type="text/css" />
<script src=QuadTree.js></script>
<script src=Particle.js></script>
<script src=Vector.js></script>
<style>
label {
    display: block;
}
</style>

<? require("../../stats.inc");?>
    </head>

    <body>
<header>
<nav>
<a href="/">Arktis</a>
»
<a href="/hacks">Hacks</a>
»
<a href="">Fukt</a>
</nav>
<h1>Fukt</h1>

<canvas width=560 height=560 id="fukt"></canvas>
<form>
<label>Number of particles: <span id=num_parts>0</span></label>
<label><input id="checkbox_threshold" type=checkbox checked> Threshold smoothing</label>
<label><input id="checkbox_blur" type=checkbox checked> Particle blur</label>
<label><input id="checkbox_quadtree" type=checkbox > Render quad tree overlay</label>
<label><input id="checkbox_gravity" type=checkbox checked> Apply gravity</label>
</form>
<script>
/* Irish's shim */
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

var checkbox_blur = document.getElementById("checkbox_blur");
checkbox_blur.addEventListener("click",function(e){
    RENDER_BLUR = checkbox_blur.checked;
});

var checkbox_quadtree = document.getElementById("checkbox_quadtree");
checkbox_quadtree.addEventListener("click",function(e){
    RENDER_QUADTREE = checkbox_quadtree.checked;
});

var checkbox_threshold = document.getElementById("checkbox_threshold");
checkbox_threshold.addEventListener("click",function(e){
    RENDER_THRESHOLD = checkbox_threshold.checked;
});

var checkbox_gravity = document.getElementById("checkbox_gravity");
checkbox_gravity.addEventListener("click",function(e){
    APPLY_GRAVITY = checkbox_gravity.checked;
});

RENDER_THRESHOLD =true;
RENDER_BLUR =true;
RENDER_QUADTREE =false;
BENCHMARK = false;
APPLY_GRAVITY = true;
var canvas = document.getElementById("fukt");
var ctx = canvas.getContext("2d");

canvas.addEventListener("click",canvas_onclick);

var time, old_time, dt, t;
ctx.fillRect(0,0,560,560);

dampening = 0.5;
var particles = [];

var NUMBER_OF_PARTICLES = 2000;
var num_parts = document.getElementById("num_parts");
num_parts.innerHTML = NUMBER_OF_PARTICLES;

var water_canvas = document.createElement("canvas");
water_canvas.width = 56*5;
water_canvas.height = 56*5;
var water_ctx = water_canvas.getContext("2d");

var tree = new QuadTree(0,0,560,560,0);

for(var i=0;i<NUMBER_OF_PARTICLES;i++){
    var particle = new Particle(50+Math.random()*460, 50+Math.random()*460, 2, 1); 
    particle.dx = 3*(0.5-Math.random());
    particles.push(particle);
    tree.insert(particle);
}

function canvas_onclick(e){
    e.preventDefault();
    e.stopPropagation();
    var x = e.pageX-this.offsetLeft;
    var y = e.pageY-this.offsetTop;

    particles.push(new Particle(x,y));
    return false;
}

function blur(imgdata, w, h){

}

function threshold(imgdata, w, h){
    var data = imgdata.data;
    var r,g,b;
    for(var i=0;i<data.length;i+=4){
        var d = data[i+2];
        if(d>100){
            r = 0x99;
            g = 0xCC;
            b = 0xFF;    
        }else if(d>60){
            r = 0xAA;
            g = 0xDD;
            b = 0xFF; 
        }else{
            r = 0xFF;
            g = 0xFF;
            b = 0xFF;
        }
        data[ i ] = r;
        data[i+1] = g;
        data[i+2] = b;
    }
}

var water_buf = document.createElement("canvas");
water_buf.width = water_canvas.width;
water_buf.height = water_canvas.height;
var water_buf_ctx = water_buf.getContext("2d");

function render(ctx){

    water_ctx.globalAlpha = 1;
    water_ctx.fillStyle = "black";
    water_ctx.fillRect(0,0,560,560);
    water_ctx.fillStyle = "rgb(0, 140, 240)";
    water_ctx.save();
    water_ctx.scale(water_canvas.width/canvas.width,water_canvas.height/canvas.height);
    water_ctx.globalCompositeOperation = 'source-over';
    for(var i=0;i<particles.length;i++){
        particles[i].render(water_ctx);
    }
    /*
    //var start_time = new Date();
    var end_time = new Date();
    console.log(end_time-start_time);
*/
    water_ctx.restore();
        water_ctx.save();
    water_ctx.scale(0.5,0.5);
        water_ctx.fillStyle = "rgb(0,140,240)";
        //tree.render(water_ctx, "pink");
    water_ctx.restore();
    if(RENDER_BLUR){
        water_ctx.save();
        water_ctx.globalAlpha = 0.5;
        water_ctx.drawImage(water_canvas, 0, 2);
        water_ctx.drawImage(water_canvas, 0, -2);
        water_ctx.drawImage(water_canvas, 2, 0);
        water_ctx.drawImage(water_canvas, -2, 0);
        water_ctx.restore();
    }
    if(RENDER_THRESHOLD){
    var water_imgdata = water_ctx.getImageData(0,0,water_canvas.width,water_canvas.height);
        threshold(water_imgdata);
    water_ctx.putImageData(water_imgdata,0,0);
    }
    if(RENDER_QUADTREE){
        water_ctx.save();
    water_ctx.scale(0.5,0.5);
        tree.render_debug_wireframe(water_ctx, "pink");
    water_ctx.restore();
    }

    water_buf_ctx.fillStyle = "rgba(255,255,255,1)";
    water_buf_ctx.fillRect(0,0,water_buf.width, water_buf.height);
    water_buf_ctx.drawImage(water_canvas,0,0);
    ctx.clearRect(0,0,560,560);
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(-ROT);
    ctx.scale(0.5,0.5);
    ctx.translate(-canvas.width/2, -canvas.height/2);
    ctx.strokeStyle = "gray";
    ctx.lineWidth=1;
    ctx.scale(canvas.width/water_canvas.width,canvas.height/water_canvas.height);
    ctx.globalAlpha = 0.7;
    ctx.drawImage(water_buf, 0, 0);
    ctx.strokeRect(0,0,water_canvas.width,water_canvas.height);
    ctx.globalAlpha = 1;
    ctx.restore();
    ctx.strokeRect(0,0,560,560);

}

var ROT = 0;
var ROT_SPEED = 0;
var GRAVITY = new Vec2D(0,0.2);

function update(){
    for(var i=0;i<particles.length;i++){
        if(APPLY_GRAVITY){
            particles[i].dx += GRAVITY.x;
            particles[i].dy += GRAVITY.y;
        }
        particles[i].is_colliding = false;
    }
    GRAVITY.x = 0;
    GRAVITY.y = 0.2;
    GRAVITY.rotate(ROT);
    ROT += ROT_SPEED;
    ROT_SPEED = Math.sin(t/290)/150;
    for(var i=0;i<particles.length;i++){
        if(particles[i].dy+particles[i].y > 560-particles[i].radius){
            particles[i].dy *= -dampening;
            particles[i].y = 560-particles[i].radius;
            particles[i].is_colliding = true;
        }
        if(particles[i].dy+particles[i].y < 0+particles[i].radius){
            particles[i].dy *= -dampening;
            particles[i].is_colliding = true;
            particles[i].y = 0+particles[i].radius;
        }
        if(particles[i].dx+particles[i].x < 0+particles[i].radius){
            particles[i].dx *= -dampening;
            particles[i].is_colliding = true;
            particles[i].x = 0+particles[i].radius;
        }
        if(particles[i].dx+particles[i].x > 560-particles[i].radius){
            particles[i].dx *= -dampening;
            particles[i].is_colliding = true;
            particles[i].x = 560-particles[i].radius;
        }
    }
    tree = new QuadTree(0,0,560,560,0);
    for(var x=0;x<particles.length;x++){
        tree.insert(particles[x]);
    }

    tree.collide();

    for(var i=0;i<particles.length;i++){
        particles[i].x += particles[i].dx;
        particles[i].y += particles[i].dy;
    }

    /* gravity lift hack */
    tree.overlap();
    t++;
}

function benchmark(name,func){
    var start_time = new Date();
    func.apply(this, Array.prototype.slice.call(arguments,2));
    var end_time = new Date();
    if(BENCHMARK){
        console.log("[BENCHMARK]: "+name+" took "+(end_time-start_time)+" ms");
    }
}

dirty = false;

function loop(){
    dt += (time-old_time);
    old_time = time;
    time = new Date();
    dt = dt%1000;
    while(dt>20){
        update();
        //benchmark("Main update loop", update);
        dt-=20;
        dirty = true;
    }
    if(dirty){
        //benchmark("render", render, ctx);
        render(ctx);
        dirty = false;
    }
    //render(ctx);
    requestAnimFrame(loop);
}

function start(){
    time = new Date();
    old_time = time;
    t = 0;
    dt = 0;
    requestAnimFrame(loop);
}


start();
</script>
<? require('../../footer.inc');?>
    </body>
</html>

