<!DOCTYPE html>

<html>
    <head><title>Muro :: Arktis by Sigve Sebastian Farstad</title>
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
<a href="">Muro</a>
</nav>
<h1>Muro</h1>
</header>
<p>Muro.</p>
        <canvas style="display:block;margin:50px auto;" id="muro" width="560" height="560">Your browser does not support canvas.</canvas>
    <script>
        var canvas = document.getElementById('muro');  
        var ctx = canvas.getContext('2d');  

        function Hare(steps){
            
            this.x = 0;
            this.y = 0;
            this.moveList = [];
            for(var i=0;i<steps*2;i++)
                this.moveList.push(0)
            this.moveListPointer = 0;
            this.strokeStyle = "rgba("+Math.floor(Math.random()*255+1)+","+Math.floor(Math.random()*255+1)+","+Math.floor(Math.random()*256)+",0.1)";
            ctx.fillStyle = "rgba(255,255,255,0.05)";


            this.jump = function(x,y){
                this.x = x;
                this.y = y;
                for(var i=0;i<this.moveList.length;i+=2){

                    this.moveList[i] = x;
                    this.moveList[i+1] = y;
                }
            }
            
        this.moveTo = function(x,y){
            this.move(x-this.x,y-this.y);
        }

        this.move = function (x,y){
            this.moveList[this.moveListPointer] = this.x+x;
            this.moveList[this.moveListPointer+1] = this.y+y;
            this.moveListPointer+=2;
            this.moveListPointer = this.moveListPointer%this.moveList.length;

            this.x = this.x+x;
            this.y = this.y+y;
            
            ctx.beginPath();
            for(var i=0;i<this.moveList.length;i++){
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(this.moveList[(this.moveListPointer+10+2*i)%this.moveList.length],
                           this.moveList[(this.moveListPointer+11+2*i)%this.moveList.length]);
            }
            ctx.stroke();
        }
    }

            
        function TrigHareController(){
       
            this.hare = new Hare(10); 
            this.cosfact = Math.random()/5;
            this.sinfact = Math.random()/5;
            this.stp = 0;
            this.hare.jump(Math.floor(Math.random()*560),Math.floor(Math.random()*560));

            this.step = function(){
                ctx.strokeStyle = this.hare.strokeStyle;
                this.hare.move(15*Math.cos(this.stp*this.cosfact),15*Math.sin(this.stp*this.sinfact)); 
                this.stp++;
                
            }
        }
        
        var mouseHare = new Hare(10);

        function mousemove(e){
            var mouseX, mouseY;

            if(e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
            }
            else if(e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
            }
            //mouseHare.moveTo(mouseX,mouseY);
        }

        canvas.addEventListener('mousemove',mousemove,false);

        var trigHares = new Array();
        for(var i=0;i<2;i++) trigHares.push(new TrigHareController());
        var rot = 0;
        var rotspeed = Math.random()*0.02;
        function stepper(){
            ctx.fillRect(0,0,560,560);
            for(var i=0;i<trigHares.length;i++) trigHares[i].step();
            setTimeout(stepper,15);
        }
        stepper();
        // canvas.addEventListener('mousemove', pollMouse, false);
    </script>

<? require('../../footer.inc');?>
    </body>
</html>

