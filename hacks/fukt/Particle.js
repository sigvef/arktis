function Particle(x,y,radius,mass){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.w = 2*this.radius;
    this.h = 2*this.radius;
    this.is_colliding = false;
    this.frozen = false;
    this.radius = radius;
    this.mass = mass;
}

Particle.prototype.radius = 1;
Particle.prototype.mass = 1;


Particle.prototype.image = (function(){

    var c = document.createElement("canvas");
    c.width = Particle.prototype.radius*24*2;
        c.height = Particle.prototype.radius*24*2;
    var x = c.getContext("2d");
    x.fillStyle = "black";
    x.clearRect(0,0,c.width,c.height);
    var gradient = x.createRadialGradient(c.width/2,c.height/2,1,c.width/2,c.height/2, c.width/2);
    gradient.addColorStop(0, "rgba(153,204,255,0.1)");
    gradient.addColorStop(1, "rgba(153,204,255,0)");
    x.fillStyle = gradient;
    x.globalAlpha = 1;
    x.fillRect(0,0,c.width,c.height);
    var img = new Image();
    img.src = c.toDataURL("image/png");
    document.childNodes[1].appendChild(img);
    return img;

})();

/* takes in another particle, returns the distance between the two particles, center to center */
Particle.prototype.distance = function(p){
    return Vec2D.prototype._length(this.x-p.x, this.y-p.y);
}


/* see the gamasutra article "pool hall lessons" */
Particle.prototype.collidesWith = function(p){

    var original_length = Vec2D.prototype._length(this.dx, this.dy);
    var original_dx = this.dx;
    var original_dy = this.dy;

    p.dx -= original_dx;
    p.dy -= original_dy;

    var distance = this.distance(p);
    distance -= this.radius + p.radius;
    if(Vec2D.prototype._length(this.dx, this.dy) < distance){
        p.dx += this.dx;
        p.dy += this.dy;
        return false;
    }

    var Nx = this.dx;
    var Ny = this.dy;
    var N_length = Vec2D.prototype._length(Nx, Ny);
    Nx /= N_length;
    Ny /= N_length;
    var Cx = p.x-this.x;
    var Cy = p.y-this.y;
    var D = Vec2D.prototype._dot(Nx,Ny, Cx,Cy);
    if(D <= 0){
        p.dx += this.dx;
        p.dy += this.dy;
        return false;
    }

    var length_C = Vec2D.prototype._length(Cx,Cy);
    var F = length_C*length_C - D*D;
    var sum_radii_squared = (this.radius + p.radius) * (this.radius + p.radius);
    if(F >= sum_radii_squared){
        p.dx += this.dx;
        p.dy += this.dy;
        return false;
    }
    
    var T = sum_radii_squared - F;
    distance = D - Math.sqrt(T);
    var mag = Vec2D.prototype._length(this.dx, this.dy);
    if(mag < distance){
        p.dx += this.dx;
        p.dy += this.dy;
        return false;
    }


    distance = Vec2D.prototype._length(this.dx, this.dy)/original_length;
    p.dx *= distance;
    p.dy *= distance;
    this.dx *= distance;
    this.dy *= distance;
    p.dx += original_dx;
    p.dy += original_dy;
    p.is_colliding = true;
    this.is_colliding = true;

    Nx = p.x-this.x;
    Ny = p.y-this.y;
    N_length = Vec2D.prototype._length(Nx,Ny);
    Nx /= N_length;
    Ny /= N_length;


    var a2 = Vec2D.prototype._dot(this.dx, this.dy, Nx, Ny);
    var a1 = Vec2D.prototype._dot(p.dx, p.dy, Nx, Ny);


    var P = (2*(a1-a2))/(this.mass+p.mass);
    this.dx += Nx*p.mass*P;
    this.dy += Ny*p.mass*P;

    p.dx -= Nx*this.mass*P;
    p.dy -= Ny*this.mass*P;
    
    return true;
}

Particle.prototype.render = function(ctx){
    if(RENDER_BLUR){
        ctx.drawImage(this.image, (this.x-this.image.width*0.5)|0, (this.y-this.image.height*0.5)|0);
    }else{
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
    }
        
}
