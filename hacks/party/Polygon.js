function Polygon(x,y){
    this.points = [];
    this.edge_lengths = [];
    this.circumference = 0;
    this.triangles = [];
    this.x = x;
    this.y = y;
    this.scale = 1;

    Polygon.prototype.get_random_edge_point = function(){

        var rand = Math.random()*this.circumference;
        var i = 0;
        while(rand>0){
            rand -= this.edge_lengths[i];
            i++;
        }
        i--;
        rand += this.edge_lengths[i];

        var x =this.x + this.scale*(this.points[i*2] + (this.points[((i+1)*2)%this.points.length]-this.points[i*2])*rand/this.edge_lengths[i]);
        var y =this.y + this.scale*( this.points[i*2+1] + (this.points[((i+1)*2+1)%this.points.length]-this.points[i*2+1])*rand/this.edge_lengths[i]);


        return {x:x,y:y};
    }

    Polygon.prototype.render = function(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.fillStyle = "#0f0";
        ctx.fillRect(this.points[this.points.length-2]-1,this.points[this.points.length-1]-1,3,3);
        ctx.strokeStyle = "#0f0";
        ctx.beginPath();
        ctx.moveTo(this.points[0],this.points[1]);
        for(var i=0;i<this.points.length;i+=2){
            ctx.lineTo(this.points[i],this.points[i+1]);
        }
        //ctx.lineTo(this.points[0],this.points[1]);
        ctx.stroke();
        ctx.restore();
    }

    Polygon.prototype.add_point = function(x,y){
        this.points.push(x);
        this.points.push(y);
        if(this.points.length >= 2){
            this.edge_lengths.push(Math.sqrt(Math.pow(this.points[0]-x,2)+Math.pow(this.points[1]-y,2)));
                this.edge_lengths[this.edge_lengths.length-2] = Math.sqrt(Math.pow(
                            this.points[this.points.length-4]-x,2)+
                        Math.pow(this.points[this.points.length-3]-y,2));
        }
        else{
            this.edge_lengths.push(0);
        }
        this.recalculate_circumference();
    }

    Polygon.prototype.recalculate_circumference = function(){
        var sum = 0;
        for(var i=0;i<this.edge_lengths.length;i++){
            sum += this.edge_lengths[i]; 
        }
        this.circumference = sum;
    }
}
