<!DOCTYPE html>
<html>
<head>
<title>
Party polygon renderer :: Arktis by Sigve Sebastian Farstad
</title>
<meta charset="UTF-8">
<meta name=viewport content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css.css" type="text/css" />
<script src="Particle.js"></script>
<script src="Polygon.js"></script>
<script src="data.js"></script>
<? require("../../stats.inc");?>
<style>
canvas{background:black;}
</style>
</head>
<body>

<header>
<nav>
<a href="/">Arktis</a>
»
<a href="/hacks">Hacks</a>
»
<a href="">Party polygon renderer</a>
</nav>
<h1>Party polygon renderer</h1>
</header>

<canvas id="party" width=560 height=560></canvas>
<label>Number of particles: <span id="particle_count">1024</span><input style="width:100%;" type="range" value=1024 min=0 max=4096 id="particle_slider"/></label>

<script>
var NUMBER_OF_PARTICLES =4*1024;//1024*2;
var number_of_particles_to_render = 1024;
var canvas = document.getElementById("party");
var ctx = canvas.getContext("2d");

var particle_slider = document.getElementById("particle_slider");
var particle_count = document.getElementById("particle_count");
particle_slider.addEventListener("change",function(){
    number_of_particles_to_render = +particle_slider.value;
    particle_count.innerHTML = particle_slider.value;
});

var current_polygon = new Polygon(0,0);

canvas.addEventListener("click", canvas_onclick);
canvas.addEventListener("touchstart", canvas_ontouch);
canvas.addEventListener("touchmove", canvas_ontouch);
canvas.addEventListener("touchend", finish_current_polygon);

function finish_current_polygon(){
    set_active_polygon(current_polygon);
    current_polygon = new Polygon(0,0);
}

function canvas_onclick(e){
    e.preventDefault();
    e.stopPropagation();
    var x = e.pageX-this.offsetLeft;
    var y = e.pageY-this.offsetTop;

    var dx = current_polygon.points[0] - x;
    var dy = current_polygon.points[1] - y;
    if(dx*dx+dy*dy < 100){
        finish_current_polygon();
    }else{
    current_polygon.add_point(x,y);
    }
    return false;
}

function canvas_ontouch(e){
    e.preventDefault();
    e.stopPropagation();
    var x = e.pageX-this.offsetLeft;
    var y = e.pageY-this.offsetTop;

    current_polygon.add_point(x,y);
    return false;

}

var particles = [];
for(var i=0;i<NUMBER_OF_PARTICLES;i++){
    particles.push(new Particle(Math.random()*560,Math.random()*560));
}

function drift(){
    
for(var i=0;i<NUMBER_OF_PARTICLES;i++){
    particles[i].drift = true;
}
}

function set_active_polygon(polygon){
    for(var i=0;i<NUMBER_OF_PARTICLES;i++){
        var point = polygon.get_random_edge_point();
        particles[i].dest_x = point.x;
        particles[i].dest_y = point.y;
        particles[i].drift = false;
    }
}


var time;
var old_time;
var dt = 0;

function update(){
    for(var i=0;i<number_of_particles_to_render;i++){
        particles[i].update();
    }
}

function render(){
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,560,560);
    ctx.globalCompositeOperation = "lighter";
    for(var i=0;i<number_of_particles_to_render;i++){
        particles[i].render(ctx);
    }
    current_polygon.render(ctx);
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
    render();
    setTimeout(loop,0);
}

window.addEventListener("load",function(){
    time =  new Date();
    old_time = time;
    setTimeout(loop,0);
});

setInterval(function(){
    set_active_polygon(polygons[(polygon_tracker++)%polygons.length]);
},4000);
</script>
<? require('../../footer.inc');?>
</body>
</html>
