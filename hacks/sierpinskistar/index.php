<!DOCTYPE html>

<html>
    <head><title>Sierpinski star :: Arktis by Sigve Sebastian Farstad</title>
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
<a href="">Sierpinski star</a>
</nav>
<h1>Sierpinski star</h1>
</header>
<p>A quick canvas experiment that iteratively draws larger and larger Sierpinski stars using Lindenmayer systems.</p>

<canvas style="border-top:1px solid #999;margin:20px auto 0;display:block;"id="canv" width="580" height="580">Your browser does not support canvas.</canvas>
<script>

var canvas = document.getElementById('canv');

 
var ctx = canvas.getContext('2d');
ctx.strokeStyle = "rgba(0,0,0,0.2)";

var MOVE_SPEED = 2;

function Turtle(x,y,direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.drawing = true;
    this.setDrawing = function(drawing){
        this.drawing = drawing;
    }
    
    this.jumpTo = function(x,y,direction){
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    
    this.turn = function(angle){
        this.direction += angle;
        
        //TODO: obvious speed-up by replacing the whiles with two single ifs and some math.
        while(this.angle > 2*Math.PI){
            this.angle -= 2*Math.PI;
        }
        while(this.angle < 0){
            this.angle += 2*Math.PI;
        }
    }
    
    this.tick = function(){
        var dx = 0;
        var dy = 0;
        
        
        if(this.direction > Math.PI){
            dx = -Math.cos(this.direction - Math.PI )*MOVE_SPEED;
            dy = -Math.sin(this.direction - Math.PI )*MOVE_SPEED;
        }else{
            dx = -Math.cos(this.direction - Math.PI )*MOVE_SPEED;
            dy = -Math.sin(this.direction - Math.PI )*MOVE_SPEED;
        }
        if(!(this.x < 0 || this.x > 580 || this.y < 0 || this.y > 580)){
            if(this.drawing){
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(this.x+dx,this.y+dy);
                ctx.closePath();
                ctx.stroke();
            }
        }
        this.x += dx;
        this.y += dy;
    }
}

function SierpinskiController(x,y,direction){
    this.A = 0 //draw forward
    this.B = 1 //draw forward
    this.PLUS = 2 //turn left by this.angle
    this.MINUS = 3 //turn right by this.angle
    this.turtle = new Turtle(x,y,direction);
    this.angle = Math.PI/3;
    this.strs = [[],[this.A]]; //this.A is the starting string
    this.progressCounter = 0;
    this.activeStr = 0;
    this.tickCounter = 0;
    this.tick = function(){
        this.tickCounter++;
        if(this.progressCounter < this.strs[this.activeStr].length){
            
            this.processSymbol(this.strs[this.activeStr][this.progressCounter]);
            this.progressCounter++;
            
        }else{
            
            this.strs[this.activeStr].length = 0;
            this.activeStr++;
            
            if(this.activeStr+1 > this.strs.length){
                this.activeStr = 0;
                
            }
            this.progressCounter =  0;
            this.turtle.jumpTo(290,290,this.turtle.direction);
        }
        
    }
    
    this.processSymbol = function(symb){
        var nextStr = this.activeStr+1;
        if(nextStr >= this.strs.length){
            nextStr = 0;
        }
        if(symb == this.A){
            this.turtle.setDrawing(true);
            this.turtle.tick();
            this.strs[nextStr].push(this.B);
            this.strs[nextStr].push(this.MINUS);
            this.strs[nextStr].push(this.A);
            this.strs[nextStr].push(this.MINUS);
            this.strs[nextStr].push(this.B);
        }
        else if(symb == this.B){
            this.turtle.setDrawing(true);
            this.turtle.tick();
            this.strs[nextStr].push(this.A);
            this.strs[nextStr].push(this.PLUS);
            this.strs[nextStr].push(this.B);
            this.strs[nextStr].push(this.PLUS);
            this.strs[nextStr].push(this.A);
        }
        else if(symb == this.PLUS){
            this.turtle.turn(this.angle);
            this.strs[nextStr].push(this.PLUS);
        }
        else if(symb == this.MINUS){
            this.turtle.turn(-this.angle);
            this.strs[nextStr].push(this.MINUS);
        }
    }
    
}

var sc1 = new SierpinskiController(290,290,0);
var sc2 = new SierpinskiController(290,290,Math.PI/3);
var sc3 = new SierpinskiController(290,290,2*Math.PI/3);
var sc4 = new SierpinskiController(290,290,Math.PI);
var sc5 = new SierpinskiController(290,290,4*Math.PI/3);
var sc6 = new SierpinskiController(290,290,5*Math.PI/3);


var timer = function(){
    sc1.tick();
    sc2.tick();
    sc3.tick();
    sc4.tick();
    sc5.tick();
    sc6.tick();
    
    
    
    
    setTimeout(function(){timer()},0);
}
timer();





</script>

<? require('../../footer.inc');?>
</body>
</html>

