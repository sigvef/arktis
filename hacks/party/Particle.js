function Particle(x,y){
    this.x = x;
    this.y = y;
    this.dx = 0.5-Math.random();
    this.dy = 0.5-Math.random();
    this.ddx = 0;
    this.ddy = 0;
    this.dest_x = x;
    this.dest_y = y;
    this.c = Math.floor(128+Math.random()*128);
    this.drift = true;
}

Particle.prototype.update = function(){
    if(!this.drift){
        this.dx += this.ddx;
        this.dy += this.ddy;
    }
    this.x += this.dx;
    this.y += this.dy;

    if(!this.drift){
        var dx = this.dest_x-this.x;
        var dy = this.dest_y-this.y

            var len = Math.sqrt(dx*dx + dy*dy);
        if(len != 0){
            this.ddx = dx/len - this.dx*0.1;
            this.ddy = dy/len - this.dy*0.1;
        }else{
        }
    }
}

Particle.prototype.render = function(ctx){
    ctx.fillStyle = "rgb("+this.c+","+this.c+","+this.c+")";
    ctx.fillRect(this.x, this.y, 3,3);

} 
