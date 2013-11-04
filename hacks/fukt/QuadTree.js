function QuadTree(x, y, w, h, depth, parent_node){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.children = [];
    this.items = [];
    this.depth = depth;
    this.leaf = true;
    this.parent_node = parent_node;
}

QuadTree.prototype.TOP_LEFT      = 0;
QuadTree.prototype.TOP_RIGHT     = 1;
QuadTree.prototype.BOTTOM_RIGHT  = 2;
QuadTree.prototype.BOTTOM_LEFT   = 3;
QuadTree.prototype.BUCKET_SIZE   = 4;
QuadTree.prototype.MAXIMUM_DEPTH = 6;
QuadTree.prototype.HACKY_SKIP_THRESHOLD = 16;

QuadTree.prototype.DEBUG =false;

QuadTree.prototype.debug = !QuadTree.prototype.DEBUG?function(){}:
function(){
    var s = "[QuadTree "+this.x+" "+this.y+" "+this.depth+"]:";
    for(var i in arguments){
        s += arguments[i]+" ";
    }
    console.log(s);
}

QuadTree.prototype.overlap = function(){
    if(this.leaf){
        for(var i=0;i<this.items.length;i++){
            for(var j=i+1;j<this.items.length;j++){
                var dx = this.items[j].x - this.items[i].x;
                var dy = this.items[j].y - this.items[i].y;
                var d = Math.sqrt(dx*dx+dy*dy);
                var r = this.items[i].radius + this.items[j].radius;
                if( r > d){
                    var f = ((this.items[i].radius + this.items[j].radius)/(2*Math.sqrt(dx*dx+dy*dy))-1/2)/2;
                    this.items[i].x -= dx*f;
                    this.items[i].y -= dy*f;

                    this.items[j].x += dx*f;
                    this.items[j].y += dy*f;
                }
            }
        }
    }else{
        for(var i=0;i<4;i++){
            this.children[i].overlap();
        }
    }
}

QuadTree.prototype.collide = function(){
    if(!this.leaf){
        for(var i=0;i<4;i++){
            this.children[i].collide();
        }
    }else{
        if(this.items.length < QuadTree.prototype.HACKY_SKIP_THRESHOLD){
            for(var i=0;i<this.items.length;i++){
                this.items[i].radius = this.items.length*0.5;
                this.items[i].frozen = false;
                for(var j=i+1;j<this.items.length;j++){
                    this.items[i].collidesWith(this.items[j]);
                }
            }
        }else{
            for(var i=0;i<this.items.length;i++){
                this.items[i].frozen = true;

            }
        }
    }

}

QuadTree.prototype.insert = function(item){
    //this.debug("INSERT!");
    if(this.leaf){
        if (this.MAXIMUM_DEPTH == this.depth || this.items.length < this.BUCKET_SIZE){
            //this.debug("inserted.");
            this.items.push(item);
        }else if(this.items.length == this.BUCKET_SIZE){
            this.split();
            this.insert(item);
        }
    }else{
        //this.debug("not leaf, go deeper...");
        for(var i=0;i<4;i++){
            if(this.children[i].contains(item)){
                this.children[i].insert(item); 
            }
        }
    }
    //this.debug("--END INSERT!");
}

QuadTree.prototype.contains = function(item){
    return this.depth == 0 || this.x <= item.x+item.w*0.5 && this.x+this.w >= item.x-item.w*0.5 && this.y <= item.y+item.h/2 && this.y+this.h >= item.y-item.h*0.5;
}

QuadTree.prototype.completely_contains = function(item){
    return this.depth == 0 || (item.x-item.w/2 >= this.x && item.x+item.w/2 <this.x+this.w && item.y-item.h/2 >= this.y && item.y + item.h/2 < this.y + this.h);
}

QuadTree.prototype.render_debug_wireframe = function(ctx, color){
    ctx.strokeStyle = color;
    if(!this.leaf){
        for(var i=0;i<4;i++){
            this.children[i].render_debug_wireframe(ctx, color);
        }
    }
        ctx.strokeRect(this.x, this.y, this.w, this.h);
}

QuadTree.prototype.render = function(ctx){
    if(!this.leaf){
        for(var i=0;i<4;i++){
            this.children[i].render(ctx);
        }
    }
    if(this.depth == this.MAXIMUM_DEPTH){
        ctx.fillStyle = "rgb(0,140,240)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    else if(this.depth+1 == this.MAXIMUM_DEPTH){
        ctx.fillStyle = "rgba(0,140,240,0.1)";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}


QuadTree.prototype.split = function(){
    //this.debug("SPLIT!");
    var dw = this.w/2;
    var dh = this.h/2;
    this.children[this.TOP_LEFT]     = new QuadTree(this.x,    this.y,    dw, dh, this.depth+1, this);
    this.children[this.TOP_RIGHT]    = new QuadTree(this.x+dw, this.y,    dw, dh, this.depth+1, this);
    this.children[this.BOTTOM_RIGHT] = new QuadTree(this.x+dw, this.y+dh, dw, dh, this.depth+1, this);
    this.children[this.BOTTOM_LEFT]  = new QuadTree(this.x,    this.y+dh, dw, dh, this.depth+1, this);
    this.leaf = false;

    for(var i=0;i<this.items.length;i++){
        for(var j=0;j<4;j++){
            if(this.children[j].contains(this.items[i])){
                //this.debug("child",i,"contains item, lets insert it there");
                this.children[j].insert(this.items[i]);
            }
        }
    }
    this.items.length = 0;
    //this.debug("--END SPLIT!");
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
