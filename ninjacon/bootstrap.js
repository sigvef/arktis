FRAME_LENGTH = 20;
DIRTY = true;
_t = t = dt = old_time = 0;
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
window.makeFullscreen = function(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
};

function clamp(min, value, max){
    return Math.min(max, Math.max(min, value));
}

function smoothstep(a, b, t) {
    t = Math.max(0, Math.min(1, t));
    var v = t*t*t*(t*(t*6.0-15.0)+10.0);
    return b * v + a * (1 - v);
};

function lerp(a, b, t) {
        t = clamp(0, t, 1);
        return b * t + a * (1 - t);
} 

function loop(){
    _t = music.currentTime * 1000 + 1000 / 120;
    dt += (_t-old_time);
    old_time = _t;
    while(dt >= FRAME_LENGTH){
        update();
        t += 1;
        dt-= FRAME_LENGTH;
        DIRTY = true;
    }

    if(DIRTY){
        render();
        DIRTY = false;
    }

    if (!music.ended){
        requestAnimFrame(loop);
    }
}


function start(){
    old_time = 0;
    dt = 0;
    var button = document.getElementById('playbutton');
    button.addEventListener('click', function(){
        button.parentElement.removeChild(button);
        setTimeout(function(){
            actuallystart();
        }, 500);
    });
}

function actuallystart(){
    music.play();
    setTimeout(loop, 0);
}

function getGUContext(canvas){
    var cx = canvas.getContext('2d');
    cx.moveToGU = function(x, y){
        cx.moveTo(x * GU, y * GU);
    };

    cx.lineToGU = function(x, y){
        cx.lineTo(x * GU, y * GU);
    };

    cx.arcGU = function(x, y, r, start, end, some_bool){
        cx.arc(x * GU, y * GU, r * GU, start, end, some_bool);
    };

    cx.fillRectGU = function(x, y, w, h){
        cx.fillRect(x * GU, y * GU, w * GU, h * GU);
    }

    cx.fillTextGU = function(text, x, y){
        cx.fillText(text, x * GU, y * GU);
    }

    cx.drawImageGU = function(image, x, y){
        cx.drawImage(image, x * GU, y * GU);
    }
    return cx;
}

var canvasesToResize = [];
function setCanvasSizeGU(canvas, w, h){
    canvasesToResize.push({canvas:canvas, w:w, h:h});
}

function bootstrap(){
    canvas = document.getElementById('c');
    ctx = getGUContext(canvas);

    document.addEventListener("keydown",function(e){
        if(e.keyCode == /*ENTER*/ 13) {
            var steps = 100;
            var step = 10;
            var startText = document.getElementById('startText');
            for(var i=0;i<steps;i++){
                setTimeout((function(i){ return function(){
                    startText.style.opacity = 1 - (i / steps);
                };})(i), i * step);
            }
            setTimeout(function(){
                document.body.removeChild(startText);
                actuallystart();
            }, steps * step);
        }

        if(e.keyCode == /*ESC*/ 27){
            window.open('', '_self', ''); //bug fix
            window.close(); 
        }

        if(e.keyCode == /*R*/ 82){
            //sm.jumpToScene(sm.activeKey);
        }

        if(e.keyCode == /*LEFT*/ 37){
            //sm.jumpToScene(sm.sortedScenes[sm.activeSceneIndex - 1].NAME);
        }

        if(e.keyCode == /*RIGHT*/ 39){
            //sm.jumpToScene(sm.sortedScenes[sm.activeSceneIndex + 1].NAME);
        }

        if(e.keyCode == /*SPACE*/ 32){
            music.paused ? music.play() : music.pause();
        }

        if(e.keyCode == /*PLUS*/ 187){
            music.playbackRate *= 1.1;
        }

        if(e.keyCode == /*MINUS*/ 189){
            music.playbackRate /= 1.1;
        }

        if(e.keyCode == /*ZERO*/ 48){
            music.playbackRate = 1;
        }

        if(e.keyCode == /*M*/ 77){
            music.muted = !music.muted;
        }
    });

    resize();
    music = document.getElementById("music");
    setTimeout(start,0);
}

function resize(){
    if(window.innerWidth/window.innerHeight > 16/9){
        GU = (window.innerHeight/9);
        }else{
        GU = (window.innerWidth/16);
    }
    canvas.width = 16 * GU;
    canvas.height = 9 * GU;
    canvas.style.zIndex = 10;
    canvas.style.position = 'absolute';
    canvas.style.margin = ((window.innerHeight - 9*GU) /2)+"px 0 0 "+((window.innerWidth-16*GU)/2)+"px";

    for(var i=0;i<canvasesToResize.length;i++){
        var c = canvasesToResize[i];
        c.canvas.width = c.w * GU;
        c.canvas.height = c.h * GU;
    }
}
window.onresize = resize;

function shuffle(array, rng) {
    rng = rng || Math.random;
    var counter = array.length;
    while (counter --> 0) {
        var index = rng() * counter | 0;
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
}

function color(r, g, b, a){
    return a != undefined
           ? 'rgba(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ',' + a + ')'
           : 'rgb(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ')';
}

function Random(seed){
    var m_w = seed || 123456791;
    var m_z = 987654321;
    var mask = 0xffffffff;

    return function random() {
        m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
        var result = ((m_z << 16) + m_w) & mask;
        result /= 4294967296;
        return result + 0.5;
    }
}
