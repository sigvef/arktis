function Player(id){

    this.id = id;
    this.x = 0;
    this.y = 0;
    this.health = 100;
    this.angle = Math.PI/2;
    this.power = 0;
    this.falling = false;
    this.GUNLENGTH = 10;
    this.controls = {};
    this.MAXPOWER = 36*2;
    this.score = 0;
        this.color = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")";
        var mainscorediv = document.getElementById("score");
        var scorediv = document.createElement("div");
        scorediv.setAttribute("style","display:inline-block;margin-right:20px;");
        var avatardiv = document.createElement("div");
        avatardiv.setAttribute("style", "width:1em;height:1em;display:inline-block;background:"+this.color+";");
        this.scoretext = document.createElement("span"); 
        scorediv.appendChild(avatardiv);
        scorediv.appendChild(this.scoretext);
        mainscorediv.appendChild(scorediv);

        this.incrementScore = function(){
            this.setScore(this.score+1); 
        }

        this.setScore = function(score){
            this.score = score;
            this.scoretext.innerHTML = ": "+this.score;
        }
        this.setScore(0);

        this.setControls = function(controls){
            this.controls = controls;
        }

        this.spawn = function(){
            this.x = Math.floor(Math.random()*W);
            this.y = 0;
            this.health = 100;
            this.angle = Math.PI/2-5;
            this.power = 0;
            this.falling = false;
        }

        this.fire = function(){
            bm.addBullet({owner:this.id,x:this.x, y:this.y, dx: this.power*Math.cos(this.angle)/10, dy: this.power*Math.sin(this.angle)/10});
        }

        this.update = function(){
            if(KEYS[this.controls.left]){
                this.angle -= Math.PI/64;
            }
            if(KEYS[this.controls.right]){
                this.angle += Math.PI/64;
            }

            if(KEYS[this.controls.fire]){
                this.power += 1;
                if(this.power > this.MAXPOWER){
                    this.power = this.MAXPOWER;
                }
            } else if(this.power > 0){
                this.fire();
                this.power = 0;
            }

            if(this.falling){
                this.y += 1;
                if(this.y+5>H) this.y =H-5;
            }
        }

        this.render = function(){
            ctx.fillStyle = this.color;
            if(MGMODE){
                ctx.drawImage(MGSPRITE, this.x-5, this.y-5);
            }else{
                ctx.fillRect( this.x-5, this.y-5, 10,10); 
            }
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(this.x+this.GUNLENGTH*Math.cos(this.angle), this.y+this.GUNLENGTH*Math.sin(this.angle));
            ctx.stroke();

            if(this.power){
                ctx.strokeStyle = "rgba(255,255,255,0.5)";
                ctx.strokeRect(this.x-20, this.y-20, 40, 6);
                ctx.fillRect(this.x-18, this.y-18, this.power/2, 2);
            }
        }
    }
