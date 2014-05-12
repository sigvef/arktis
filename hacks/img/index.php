<!DOCTYPE html>

<html>
    <head><title>Bildebehandling :: Arktis by Sigve Sebastian Farstad</title>
<meta charset="UTF-8">
<meta name=viewport content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/css.css" type="text/css" />

<? require("../../stats.inc");?>
<style>
    #filters {margin: 10px 0 0;display:block;overflow:hidden}
    span{
        padding:0px 5px;
        margin:2px 2px;
        background: #222;
        color:#fff;
        border: 1px solid #222;
        border-radius: 3px;
font-family:sans-serif;
font-size:11px;
        float:left;
    }

</style>
    </head>
<body>


<header>
<nav>
<a href="/">Arktis</a>
»
<a href="/hacks">Hacks</a>
»
<a href="">Image manipulation</a>
</nav>
<h1>Image manipulation</h1>
</header>

<p>Manipulate images by applying filters.</p>
<select id="filterType">
<option>Warp</option>
<option>Blur</option>
<option>Color shift</option>
<option>Noise</option>
<option>Scanline</option>
<option>Grayscale</option>
<option>Invert</option>
<option>Reverse</option>
<option>Intensify</option>
<option>Dullify</option>
<option>Web Safe&trade;</option>
</select>
<button id="add">Apply</button>
<button disabled id="remove">Undo</button>
<div id="filters">
<span>Original</span>
</div>
<canvas width=580 height=326 id="canvas" title="Original image by Daniel Y. Go: http://www.flickr.com/photos/danielygo/"></canvas>

<? require('../../footer.inc');?>

<script>

    
    function FilterManager(formId,ctx){
        this.DOMfilters = document.getElementById(formId);
        this.filters = [];
        this.original = document.createElement("img");
        this.original.src = "color.jpg";
        var that = this;
        this.original.addEventListener("load",function(e){
            ctx.drawImage(that.original,0,0);
            that.img = ctx.getImageData(0,0,canvas.width,canvas.height);
            that.render(ctx); 
        });

        this.pop = function(){
           if( this.filters.length == 0) return;
           this.filters.pop(); 
           this.DOMfilters.removeChild(this.DOMfilters.children[this.DOMfilters.children.length-1]);
           this.render(ctx);
        }
        this.add = function(type){
            var cache = !!this.filters.length ? this.filters[this.filters.length-1].img:this.img;
            this.filters.push(new Filter(type,cache));
            this.filters[this.filters.length-1].img = this.filters[this.filters.length-1].apply(cache);
            this.DOMfilters.appendChild(this.createDOMFilterNode(type));
            this.render(ctx);
        }

        this.createDOMFilterNode = function(type){
            var node = document.createElement("span"); 
            node.innerHTML = type;
            return node;
        }

        this.render = function(ctx){
            var img = !!this.filters.length?this.filters[this.filters.length-1].img:this.img;
            /*
            for(var i=0;i<this.filters.length;i++){
                img = this.filters[i].apply(img); 
            }
             */
            ctx.putImageData(img,0,0);
        }
    }
    
    function blurgen(factor){
        return (function(img){
                var can = document.createElement("canvas");
                can.width = canvas.width;
                can.height = canvas.height;
                var cx = can.getContext("2d");
                cx.save();
                cx.putImageData(img,0,0);
                cx.scale(1/factor,1/factor);
                cx.drawImage(can,0,0);
                cx.restore();
                cx.scale(factor,factor);
                cx.drawImage(can,0,0);
                return cx.getImageData(0,0,can.width,can.height);
        });
    }

    function Filter(type,imgcache){
        this.type = type;
        this.img = imgcache;
        var can = document.createElement("canvas");
        can.width = canvas.width;
        can.height = canvas.height;
        var cx = can.getContext("2d");
        this.apply = {
            "Blur": blurgen(2),
            "Color shift":function(img){
                cx.putImageData(img,0,0);
                var newimg = cx.getImageData(0,0,can.width,can.height);
                for(var i=0;i<newimg.data.length;i+=4){
                    var tmp = newimg.data[i+2];
                    newimg.data[i+2] = newimg.data[i+1];
                    newimg.data[i+1] = newimg.data[i];
                    newimg.data[i] = tmp;
                } 
                return newimg;
            },
            "Web Safe™":function(img){
                cx.putImageData(img,0,0);
                var newimg = cx.getImageData(0,0,can.width,can.height);
                for(var i=0;i<newimg.data.length;i++){
                    newimg.data[i] = 32*Math.floor(img.data[i]/(32));
                } 
                return newimg;
            },
            "Dullify":function(img){
                cx.putImageData(img,0,0);
                var newimg = cx.getImageData(0,0,can.width,can.height);
                for(var i=0;i<newimg.data.length;i+=4){
                    newimg.data[i] /= 1.1;
                    newimg.data[i+1] /= 1.1;
                    newimg.data[i+2] /= 1.1;
                } 
                return newimg;
            },
            "Scanline":function(img){
                cx.putImageData(img,0,0);
                cx.fillStyle = "rgba(0,0,0,0.1)";
                for(var i=0;i<can.height;i+=10){
                    cx.fillRect(0,i,can.width,5);
                } 
                var newimg = cx.getImageData(0,0,can.width,can.height);
                return newimg;
            },
            "Noise":function(img){
                cx.putImageData(img,0,0);
                var newimg = cx.getImageData(0,0,can.width,can.height);
                for(var i=0;i<newimg.data.length;i+=4){
                    newimg.data[i] += (Math.random()-0.5)*20;
                    newimg.data[i+1] += (Math.random()-0.5)*20;
                    newimg.data[i+2] += (Math.random()-0.5)*20;
                } 
                return newimg;
            },
            "Intensify":function(img){
                cx.putImageData(img,0,0);
                var newimg = cx.getImageData(0,0,can.width,can.height);
                for(var i=0;i<newimg.data.length;i+=4){
                    newimg.data[i] *= 1.1;
                    newimg.data[i+1] *= 1.1;
                    newimg.data[i+2] *= 1.1;
                } 
                return newimg;
            },
            "Grayscale":function(img){
                cx.putImageData(img,0,0);
                var newimg = cx.getImageData(0,0,can.width,can.height);
                for(var i=0;i<newimg.data.length;i+=4){
                    var temp = (newimg.data[i] +
                               newimg.data[i+1] +
                               newimg.data[i+2])/3;
                    newimg.data[i] = temp;
                    newimg.data[i+1] = temp;
                    newimg.data[i+2] = temp;
                } 
                return newimg;
            },
            "Reverse":function(img){
                cx.putImageData(img,0,0);
                cx.save();
                cx.scale(-1,1);
                cx.drawImage(can,-can.width,0);
                cx.restore();
                return cx.getImageData(0,0,can.width, can.height);
            },
            "Invert":function(img){
                cx.putImageData(img,0,0);
                var newimg = cx.getImageData(0,0,can.width,can.height);
                for(var i=0;i<newimg.data.length;i+=4){
                    newimg.data[i] = 256-img.data[i];
                    newimg.data[i+1] = 256-img.data[i+1];
                    newimg.data[i+2] = 256-img.data[i+2];
                } 
                return newimg;
            },
            "Warp":function(img){
                cx.putImageData(img,0,0);
                var newimg = cx.getImageData(0,0,can.width,can.height);
                var x = 0, y = 0;
                var w = can.width;
                var h = can.height;
                for(var i=0;i<newimg.data.length;i+=4){
                    newimg.data[i] = img.data[xy(x*Math.cos(0.5*Math.PI*x/w),y*Math.sin(0.5*Math.PI*y/h),w)];
                    newimg.data[i+1] = img.data[1+xy(x*Math.cos(0.5*Math.PI*x/w),y*Math.sin(0.5*Math.PI*y/h),w)];
                    newimg.data[i+2] = img.data[2+xy(x*Math.cos(0.5*Math.PI*x/w),y*Math.sin(0.5*Math.PI*y/h),w)];

                    x++;
                    if(x >= can.width){
                        x=0;y++;
                    }
                } 
                return newimg;
            }
        }[type];
    }


    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var fm = new FilterManager("filters",ctx);
    var filterType = document.getElementById("filterType");
    var removeButton = document.getElementById("remove");

    document.getElementById("add").addEventListener("click",function(){
        fm.add(filterType.value); 
        removeButton.disabled = !fm.filters.length;
    });
    removeButton.addEventListener("click",function(){
        fm.pop(); 
        removeButton.disabled = !fm.filters.length;
    });

    function xy(x,y, width){
        return Math.floor(4*(Math.floor(y)*width+Math.floor(x)));
    }


</script>
</body>
</html>

