function BulletManager(){

    this.can = document.createElement("canvas");
    this.can.width = W;
    this.can.height = H;
    this.cx = this.can.getContext("2d");

    this.bullets = [];

    this.addBullet = function(bullet){
        this.bullets.push(bullet);
    }

    this.update = function(){
        for(var i=0;i<this.bullets.length;i++){
            this.bullets[i].x += this.bullets[i].dx;
            this.bullets[i].y += this.bullets[i].dy;
            this.bullets[i].dy += 0.05; //gravity
        }
    }

    this.render = function(){
        this.cx.fillStyle = "rgba(0,0,0,0.01)";
        this.cx.fillRect(0,0,W,H);
        for(var i=0;i<this.bullets.length;i++){
            this.cx.fillStyle = "white";
            if(MGMODE){
                this.cx.drawImage(MGSPRITE, this.bullets[i].x-5, this.bullets[i].y-5);
            }else{
                this.cx.fillRect(this.bullets[i].x, this.bullets[i].y,1,1);
            }
        }
        ctx.globalCompositeOperation = "lighter";
        ctx.drawImage(this.can,0,0);
        ctx.globalCompositeOperation = "source-over";
    }
}
