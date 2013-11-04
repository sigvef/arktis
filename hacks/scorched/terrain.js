function Terrain(){

    this.terrain = Array(W);

    this.generate = function(){
        //lets make some random points, and smoothstep interpolate between them
        var level = Math.floor(Math.random()*W/2 + W/4);
        var prevlevel = level;
        var stepsize = W/4;
        for(var i=0;i<this.terrain.length;i+=stepsize){
            prevlevel = level;
            level = Math.floor(Math.random()*W/2+W/4);
            var v = 0;
            for(var j=0;j<stepsize;j++){
                //1. normalize
                v = j/stepsize;
                //2. smoothstepize
                v = v*v*(3-2*v);
                //3. interpolateize
                this.terrain[i+j] = level*v + prevlevel*(1-v);
                //4. PROFITZE!!
            }
        }
    }

    this.explode = function(x,y){
        var size = 40;
        for(var i=0;i<40;i++){
            this.terrain[Math.floor(x)+i-size/2] -= Math.floor(Math.abs(size/2*Math.sin(i/size*Math.PI)));
        }
    }

    this.render = function(){
        ctx.fillStyle = "rgb(0,255,0)";
        for(var i=0;i<this.terrain.length;i++){
            ctx.fillRect(i, H-this.terrain[i], 1, this.terrain[i]);
        }
    }

}
