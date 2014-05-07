function Terminal(){
    this.lines = [];
    this.split = 0;

    for(var y = 0; y < 25; y++){
        this.lines[y] = [];
        for(var x = 0; x < 80; x++){
            this.lines[y][x] = ' ';
        }
    }

    this.x = 3.5;
    this.y = 1.5;
    this.w = 9;
    this.h = 6;
    this.padding = 0.1;
    this.lineHeight = 0.15;
    this.canvas = document.createElement('canvas');
    this.ctx = getGUContext(this.canvas);
    this.largeblurcanvas = document.createElement('canvas');
    this.largeblurctx = getGUContext(this.largeblurcanvas);
    this.blurcanvas = document.createElement('canvas');
    this.blurctx = getGUContext(this.blurcanvas);
}

Terminal.prototype.render = function(ctx){

    this.lineHeight = 1.6 * this.ctx.measureText('M').width / GU;
    this.w = this.padding * 2 + this.ctx.measureText('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM').width / GU;

    this.h = this.padding * 2 + this.lineHeight * 25;
    this.y = (9 - this.h) / 2;
    this.canvas.width = this.w * GU;
    this.canvas.height = this.h * GU;
    this.largeblurcanvas.width = this.canvas.width;
    this.largeblurcanvas.height = this.canvas.height;
    this.blurcanvas.width = this.canvas.width / 2;
    this.blurcanvas.height = this.canvas.height / 2;

    this.ctx.fillStyle = color(0, 0, 0, 0.13);
    this.ctx.fillRectGU(0, 0, this.w, this.h);

    this.ctx.font = (0.15 * GU) + 'px monospace';
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = '#fd0';
    for(var i=0;i<this.lines.length;i++){
        this.ctx.fillTextGU(this.lines[i].join(''),
                            this.padding,
                            this.padding + i * this.lineHeight);
    }

    var w = smoothstep(0, this.w, 1 - (905 - t) / 100);
    var x = (16 - w) / 2;

    ctx.save();
    ctx.translate(8 * GU, 4.5 * GU);
    var shrinkAtMiddleT = (t - 2078) / ((2118 - 2078) / 2);
    if(shrinkAtMiddleT > 1){
        shrinkAtMiddleT = 2 - shrinkAtMiddleT;
    }
    var shrinkAtMiddle = smoothstep(0, 0.5, shrinkAtMiddleT);
    var zoomInAtStart = smoothstep(5, 0, (t - 600) / (900 - 600));
    var zoomInForConsoleDemo = smoothstep(0, 0.4, (t - 1250) / (1284 - 1250));
    var bounce = 1 + 0.02 * Math.sin(2 * Math.PI * beat);
    var scaler = zoomInAtStart + zoomInForConsoleDemo + bounce - shrinkAtMiddle;
    ctx.scale(scaler, scaler);

    var spinAtMiddle = smoothstep(0, Math.PI, smoothstep(0, 1, (t - 2078) / (2118 - 2078)));
    var flip = t >= 2098 ? Math.PI : 0;
    var rotater = flip + spinAtMiddle + 0.1 * Math.sin(2 * Math.PI * beat / 2) * (1 - 2 * zoomInForConsoleDemo);
    ctx.rotate(rotater);
    ctx.translate(-8 * GU, -4.5 * GU);
    ctx.shadowColor = color(0, 0, 0);
    ctx.shadowBlur = 20;
    if((w * GU | 0) > 0){

        this.largeblurctx.drawImage(this.canvas, 0, 0);
        for(var i = 0;i < 3; i++){
            this.blurctx.save();
            this.blurctx.scale(1/2, 1/2);
            this.blurctx.drawImage(this.largeblurcanvas, 0, 0);
            this.blurctx.restore();
            this.largeblurctx.save();
            this.largeblurctx.scale(2, 2);
            this.largeblurctx.drawImage(this.blurcanvas, 0, 0);
            this.largeblurctx.restore();
        }
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.globalAlpha = 0.7;
        this.ctx.drawImage(this.largeblurcanvas, 0, 0);
        this.ctx.restore();

        if(t < 2800) {
        ctx.drawImage(this.canvas,
                (this.w - w) / 2 * GU | 0, 0, w * GU | 0, this.h * GU | 0,
                x * GU | 0, this.y * GU | 0, w * GU | 0, this.h * GU | 0);
        }else {

        this.split = smoothstep(0, 100, (t - 2800) / ( 3250 - 2800));

        ctx.drawImage(this.canvas,
                      0, 0, this.canvas.width / 2, this.canvas.height,
                      (-this.split + x) * GU | 0 , this.y * GU | 0,
                      this.canvas.width / 2, this.canvas.height);
        ctx.drawImage(this.canvas,
                      this.canvas.width / 2, 0,
                      this.canvas.width / 2, this.canvas.height,
                      (this.w / 2 + this.split + x) * GU | 0 ,
                      this.y * GU | 0,
                      this.canvas.width / 2, this.canvas.height);
        }
    }
    ctx.restore();
}

Terminal.prototype.update = function(){
}

Terminal.prototype.set = function(chr, x, y){
    x = x | 0;
    y = y | 0;
    if(x >= 0 && x < 80 && y >= 0 && y < 25){
        this.lines[y][x] = chr;
    }
}

Terminal.prototype.print = function(text){
    var i = 0;
    while(i < text.length) {
        this.lines.shift();
        this.lines[24] = [];
        for(var j = 0; j < 80; j++){
            this.lines[24][j] = ' ';
        }
        for(var x = 0; x < 80; x++){
            if(i == text.length) {
                break;
            }
            this.set(text.charAt(i++), x, 24);
        }
    }
}
