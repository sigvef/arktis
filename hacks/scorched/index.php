<!DOCTYPE html>
<html>
<script>W = 580; H = 580;</script>
    <head><title>Action Scorched :: Arktis by Sigve Sebastian Farstad</title>
<meta charset="UTF-8">
<meta name=viewport content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css.css" type="text/css" />
<script src="terrain.js"></script>
<script src="player.js"></script>
<script src="CollisionManager.js"></script>
<script src="BulletManager.js"></script>

<? require("../../stats.inc");?>
    </head>
<body>
<header>
<nav>
<a href="/">Arktis</a>
»
<a href="/hacks">Hacks</a>
»
<a href="">Action Scorched</a>
</nav>
<h1><? if(isset($_GET["mg"]))echo "Penis ";?>Action Scorched</h1>
<canvas style="background:#222;border-top:1px solid #999;margin:20px auto 0;display:block;"id="canv" width="580" height="580">Nettleseren din støtter ikke canvas. Prøv en nyere nettleser.</canvas>
<div id="score"></div>
<p>Scorched in <em>real time</em>.</p>
<h3>Controls</h3>
<h4>Player 1</h4>
<dl>
<dt>A</dt>
<dd>Rotate gun to the left.</dd>
<dt>D</dt>
<dd>Rotate gun to the right.</dd>
<dt>S</dt>
<dd>Hold to build shot power, release to fire.</dd>
</dl>
<h4>Player 2</h4>
<dl>
<dt>V</dt>
<dd>Rotate gun to the left.</dd>
<dt>N</dt>
<dd>Rotate gun to the right.</dd>
<dt>B</dt>
<dd>Hold to build shot power, release to fire.</dd>
</dl>
<h4>Player 3</h4>
<dl>
<dt>J</dt>
<dd>Rotate gun to the left.</dd>
<dt>L</dt>
<dd>Rotate gun to the right.</dd>
<dt>K</dt>
<dd>Hold to build shot power, release to fire.</dd>
</dl>
<script>

var MGMODE = <? if(isset($_GET["mg"])) echo "true"; else echo "false";?>;
<? if(isset($_GET["mg"])){ echo "var MGSPRITE = new Image();MGSPRITE.src='mg.png';";}?>
var KEYS = {};
var canvas = document.getElementById("canv");
var ctx = canvas.getContext("2d");
var terrain = new Terrain();
terrain.generate();

var bm = new BulletManager();
var players = [];
var i=0;
players.push(new Player(i++));
players.push(new Player(i++));
players.push(new Player(i++));
players[0].setControls({left:65,right:68,fire:83});
players[1].setControls({left:74,right:76,fire:75});
players[2].setControls({left:86,right:78,fire:66});
for(var i=0;i<players.length;i++){
    players[i].spawn();
}


var cm = new CollisionManager();
cm.setTerrain(terrain);
cm.setPlayers(players);
cm.setBulletManager(bm);

function update(){
    bm.update();
    cm.update();
    for(var i=0;i<players.length;i++){
        players[i].update();
    }
}

function render(){
    canvas.width = canvas.width;
    terrain.render();
    bm.render();
    for(var i=0;i<players.length;i++){
        players[i].render();
    }
}

var d = new Date();
var olddate = d;
var dt=0;
function loop(){
    //todo: timing
    d = new Date();
    dt += d - olddate; 
    var dorender = false;
    while(dt>10){
        update();
        dt-=10;
        dorender = true;
    }
    if (dorender) render();    
    olddate = d;
    setTimeout(loop,0);
}

document.addEventListener("keydown", function(e){
    console.log(e.keyCode);
    KEYS[e.keyCode] = true; 
});
document.addEventListener("keyup", function(e){
    KEYS[e.keyCode] = false; 
});

loop();

</script>

<? require('../../footer.inc');?>
    </body>
</html>
