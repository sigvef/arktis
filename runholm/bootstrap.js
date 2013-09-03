missedGFXFrames = 0;

/* smoothstep interpolaties between a and b, at time t from 0 to 1 */
function smoothstep(a, b, t) {
	var v = t * t * (3 - 2 * t);
	return b * v + a * (1 - v);
};

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
        window.setTimeout(callback, 0);
    };
})();

function loadloop(){
    if(loaded > 0){
        canvas.width = canvas.width;
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "black";
        ctx.fillText("Loading "+loaded, 8*GU,4.5*GU);
        requestAnimFrame(loadloop);
    }else{
        video.play();
        audio.play();
        requestAnimFrame(loop);
    }
}

function loop(){
    t = +new Date();
    dt += (t-old_time);
    old_time = t;
    while(dt>20){
        missedGFXFrames++;
        update();
        dt-= 20;
    }
    /* clearing canvas */
    canvas.width = canvas.width;
	missedGFXFrames--;
    render(ctx);

    /* post process scanlines */
    if(true || missedGFXFrames < 20){
    ctx.drawImage(scanlinecanvas,0,0);
    }
    
    /* post process glow */
    if(true || missedGFXFrames < 10){
	    blurcanvas.width = blurcanvas.width;
	    blurctx.scale(0.5,0.5);
	    blurctx.drawImage(canvas,0,0);
	    for(var i=0;i<4;i++){
		    glowcanvas.width = glowcanvas.width;
		    glowctx.scale(2,2);
		    glowctx.drawImage(blurcanvas,0,0);
		    blurcanvas.width = blurcanvas.width;
		    blurctx.scale(0.5,0.5);
		    blurctx.drawImage(glowcanvas,0,0);
	    }
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.5;
    ctx.drawImage(glowcanvas,0,0);
    ctx.restore();
    }


    requestAnimFrame(loop);
}

function bootstrap(){

    loaded = 1;

	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	canvas.style.zIndex = 999;
	glowcanvas = document.createElement("canvas");
	glowctx = glowcanvas.getContext("2d");
	blurcanvas = document.createElement("canvas");
	blurctx = blurcanvas.getContext("2d");
	scanlinecanvas = document.createElement("canvas");
	scanlinectx = scanlinecanvas.getContext("2d");

    video = document.createElement("video");
    loaded++;
    video.addEventListener("canplay",function(){
        loaded--;
    });
    document.body.appendChild(video);
    video.src = "rh.mp4";
    audio= document.createElement("audio");
    loaded++;
    audio.addEventListener("canplay",function(){
        loaded--;
        this.volume = 0.5;
    });
    audio.src = "rune.mp3";

    logo = new Image();
    loaded++;
    logo.addEventListener("load", function(){
        loaded--;
    });
    logo.src = "logo.gif";
	
	dt = 0;
	t = 0;
	time = +new Date();
	old_time = time;
    st = 0;

    for(var i=0;i<scenes.length;i++){
        scenes[i].load();
    }

	resize();

	document.body.appendChild(canvas);


    console.log("bootstrapping loaded");
    loaded--;
	requestAnimFrame(loadloop);
}

function resize(e){
	if(window.innerWidth/window.innerHeight > 16/9){
		GU = (window.innerHeight/9);
	}else{
		GU = (window.innerWidth/16);
	}
	canvas.width = 16*GU;
	canvas.height = 9*GU;
	canvas.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
	video.height= 9*GU;
	video.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-9*GU/16*9)/2)+"px";
	blurcanvas.width = 16*GU/2;
	blurcanvas.height = 9*GU/2;
	glowcanvas.width = 16*GU;
	glowcanvas.height = 9*GU;
	scanlinecanvas.width = 16*GU;
	scanlinecanvas.height = 9*GU;
	scanlinecanvas.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";
	scanlinectx.fillStyle = "rgba(0,0,0,0.05)";
    /*
	for(var i=0;i<9;i++){
		scanlinectx.fillRect(0,i*GU+0.0*GU,16*GU,0.1*GU);
		scanlinectx.fillRect(0,i*GU+0.2*GU,16*GU,0.1*GU);
		scanlinectx.fillRect(0,i*GU+0.4*GU,16*GU,0.1*GU);
		scanlinectx.fillRect(0,i*GU+0.6*GU,16*GU,0.1*GU);
		scanlinectx.fillRect(0,i*GU+0.8*GU,16*GU,0.1*GU);
	}
    */
}

window.onresize = resize;
