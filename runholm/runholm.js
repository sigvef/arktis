
function update(){
    st++;
    st > triggertimes[scenetracker+1] && scenetracker++;
    scenes[scenetracker].update();
}

function render(ctx){
    scenes[scenetracker].render(ctx);
}

triggertimes = [0,10.54/20*1000, 21.09/20*1000, 31.64/20*1000, 42.19/20*1000 ];
scenetracker = 0;

scenes = [

    /* intro */
    {
text: "\"Æ har faktisk skaffa mæ en iPhone\"" ,
        load:function(){},
        update:function(){
        },
        render: function(ctx){
            if(st> 6.2/20*1000){
            ctx.font = "bold "+(0.7*GU)+"px Arial";
            ctx.textAlign = "center";
            ctx.save();
            ctx.translate(8*GU,4.5*GU);
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            ctx.fillText(this.text,0.08*GU,4.08*GU);
            ctx.fillStyle = "white";
            ctx.fillText(this.text,0,4*GU);
            ctx.restore();
            }
        }
    },

    /* sunray scene */
    {
        x:4,
        y:4.5,
        textzoom : 1,
        undertext : "",
        load:function(){},
        update:function(){
            this.x += 0.1*Math.sin(st/41);
            this.y += 0.02*Math.cos(st/97);
            this.textzoom = 1+0.04*Math.sin(st/1000*20*Math.PI*2/60*182/2);
            this.undertext = "woooooo!".substring(0,0|(st/1000*20*6)-15*6);
        },
        render: function(ctx){
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,16*GU,9*GU);
            ctx.fillStyle = "pink";
            var timer = st/323;
            for(var i=timer;i<timer+Math.PI*2;i+=Math.PI/8){
                ctx.beginPath(); 
                ctx.moveTo(this.x*GU,this.y*GU);
                ctx.lineTo(this.x*GU+Math.sin(i)*32*GU, this.y*GU+Math.cos(i)*18*GU);
                ctx.lineTo(this.x*GU+Math.sin(i+Math.PI/16)*32*GU, this.y*GU+Math.cos(i+Math.PI/16)*18*GU);
                ctx.lineTo(this.x*GU,this.y*GU);
                ctx.closePath();
                ctx.fill();
            }
            ctx.fillStyle = "#CC3232";
            var timer = st/152;
            for(var i=timer;i<timer+Math.PI*2;i+=Math.PI/8){
                ctx.beginPath(); 
                ctx.moveTo(this.x*GU,this.y*GU);
                ctx.lineTo(this.x*GU+Math.sin(i)*32*GU, this.y*GU+Math.cos(i)*18*GU);
                ctx.lineTo(this.x*GU+Math.sin(i+Math.PI/16)*32*GU, this.y*GU+Math.cos(i+Math.PI/16)*18*GU);
                ctx.lineTo(this.x*GU,this.y*GU);
                ctx.closePath();
                ctx.fill();
            }
            ctx.fillStyle = "orange";
            var timer = st/60;
            for(var i=timer;i<timer+Math.PI*2;i+=Math.PI/8){
                ctx.beginPath(); 
                ctx.moveTo(this.x*GU,this.y*GU);
                ctx.lineTo(this.x*GU+Math.sin(i)*32*GU, this.y*GU+Math.cos(i)*18*GU);
                ctx.lineTo(this.x*GU+Math.sin(i+Math.PI/16)*32*GU, this.y*GU+Math.cos(i+Math.PI/16)*18*GU);
                ctx.lineTo(this.x*GU,this.y*GU);
                ctx.closePath();
                ctx.fill();
            }

            ctx.font = "bold "+(GU)+"px Arial";
            ctx.textAlign = "center";
            ctx.save();
            ctx.translate(8*GU,4.5*GU);
            ctx.scale(this.textzoom, this.textzoom);
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            ctx.fillText("Rune har fått seg iPhone!",0.08*GU,0.08*GU);
            ctx.fillText(this.undertext,0.08*GU,1.3*GU);
            ctx.fillStyle = "white";
            ctx.fillText("Rune har fått seg iPhone!",0,0);
            ctx.fillText(this.undertext,0,1.2*GU);
            ctx.restore();

            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            var color = 0;
            color *= 0.2;
            ctx.fillStyle = "rgb("+color+","+color+","+color+")";
            ctx.fillRect(0,0,16*GU,9*GU);
            ctx.restore();
        }
    },

    /* particles */
    {
colors:["#63BC47", "#FBB724", "#F58220", "#E03A3E", "#963F97", "#049CD9"],
        particles: [],
        textzoom:1,
        load:function(){
            for(var i=0;i<128;i++){
                this.particles.push({x:Math.random()*16,y:Math.random()*9});
            }
        },
        update:function(){
            for(var i in this.particles){
                var p = this.particles[i];
                p.x += 0.3*Math.sin(st/5000*i);
                p.y += 0.3*Math.cos(st/4000*i);
            }
            this.textzoom = 1+0.04*Math.sin(st/1000*20*Math.PI*2/60*182/2);
        },
        render: function(ctx){
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,16*GU,9*GU);
            for(var i=0;i<16;i++){
                ctx.fillStyle = this.colors[i%this.colors.length];
                var y = 4.5*(1+Math.sin(st/4000*i*i));
                ctx.fillRect(0,y*GU,16*GU,GU);
            }
                    ctx.save();
                    ctx.fillStyle = "black";
                    ctx.globalAlpha = 0.2;
                    var scale = 1/(2000-st)*6000/GU*logo.width/1000;
                    ctx.translate(8*GU,4.5*GU);
                    ctx.scale(scale,scale);
            for(var i in this.particles){
                var p = this.particles[i];
                ctx.drawImage(logo,p.x*GU-logo.width/2,p.y*GU-logo.height/2);
            }
                    ctx.restore();
            ctx.font = "bold "+(1.3*GU)+"px Arial";
            ctx.textAlign = "center";
            ctx.save();
            ctx.translate(8*GU,4.5*GU);
            ctx.rotate(st*st/34000);
            ctx.scale(this.textzoom, this.textzoom);
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            ctx.fillText("Apple! :D:D:D",0.08*GU,0.08*GU);
            ctx.fillStyle = "white";
            ctx.fillText("Apple! :D:D:D",0,0);
            ctx.restore();
        }
    },

    /* lastscene */
    {
        colors:["#63BC47", "#FBB724", "#F58220", "#E03A3E", "#963F97", "#049CD9"],
               textzoom:1,
        load:function(){},
        update:function(){
            this.textzoom = 1+0.04*Math.sin(st/1000*20*Math.PI*2/60*182/2);
        },
        render:function(ctx){
           ctx.fillStyle = "white";
           ctx.fillRect(0,0,16*GU,9*GU);
            ctx.font = "bold "+(1.3*GU)+"px Arial";
            ctx.textAlign = "center";
            ctx.save();
            ctx.translate(8*GU,4.5*GU);
            ctx.rotate(st*st/34000);
            ctx.scale(this.textzoom, this.textzoom);
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            ctx.fillText("weee! <3",0.08*GU,1.08*GU);
            ctx.fillStyle = "white";
            ctx.fillText("weee! <3",0,1);
            ctx.restore();
            for(var i=0;i<16;i++){
                ctx.fillStyle = this.colors[i%this.colors.length];
                ctx.fillRect(i*GU,0,GU,GU*9*0.5*(1+Math.sin(st/20+i*0.1)));
            }
            ctx.save();
            ctx.translate(8*GU, 4.5*GU);
            ctx.scale(this.textzoom*this.textzoom,this.textzoom*this.textzoom);
            ctx.rotate(Math.PI,Math.PI);
            ctx.translate(-8*GU, -4.5*GU);
            ctx.drawImage(canvas,0,0);
            ctx.translate(8*GU, 4.5*GU);
            ctx.rotate(Math.PI/2,Math.PI/2);
            ctx.translate(-8*GU, -4.5*GU);
            ctx.drawImage(canvas,0,0);
            ctx.restore();
        }
    },

    /* loop hack */
    {
        load:function(){},
        update:function(){
            st = 10.54/20*1000;
            audio.currentTime = 10.54;
            scenetracker = 1;
        },
        render:function(ctx){}

    }
];
