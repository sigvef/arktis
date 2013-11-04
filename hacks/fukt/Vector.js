function Vec2D(x,y){
    this.x = x;
    this.y = y;
}

Vec2D.prototype._length = function(x, y){
    return Math.sqrt(x*x +y*y);
}
Vec2D.prototype.length = function(){
    return Math.sqrt(this.x*this.x + this.y*this.y);
}

Vec2D.prototype._lengthSquared = function(x, y){
    return x*x +y*y;
}
Vec2D.prototype.lengthSquared = function(){
    return this.x*this.x + this.y*this.y;
}

Vec2D.prototype._dot = function(x1,y1, x2,y2){
    return x1*x2 + y1*y2;
}
Vec2D.prototype.dot = function(vector){
    return this.x*vector.x + this.y*vector.y;
}

Vec2D.prototype.normalize = function(){
    var length = this.length();
    this.x /= length;
    this.y /=length;
    return this;
} 

Vec2D.prototype.scale = function(scalar){
    this.x *= scalar;
    this.y *= scalar;
    return this;
}

Vec2D.prototype.add = function(vector){
    this.x += vector.x;
    this.y += vector.y;
    return this;
}

Vec2D.prototype.subtract = function(vector){
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
}

Vec2D.prototype.set = function(x,y){
    this.x = x;
    this.y = y;
    return this;
}

Vec2D.prototype.copy = function(){
    return new Vec2D(this.x, this.y);
}

Vec2D.prototype.rotate = function(theta){
    var temp_x = this.x;
    this.x = this.x * Math.cos(theta) - this.y * Math.sin(theta);
    this.y = temp_x * Math.sin(theta) + this.y * Math.cos(theta);
}
