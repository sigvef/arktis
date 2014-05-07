function Mesh(){
    this.random = new Random(0x2038b);
    this.xLength = 16;
    this.yLength = 9;
    this.flashes = [];
    this.points = [];
    this.flashTime = 20;
    this.beatThreshold = 6.3046875 * 4;
    this.beat = this.beatThreshold;
    var displacement = 0.6;
    for(var x = 0; x < this.xLength; x++){
        this.points[x] = [];
        for(var y = 0; y < this.yLength; y++){
            this.points[x][y] = {
                x: (x - 1) * 18 / (this.xLength - 1) +
                   (this.random() - 0.5) * displacement,
                y: (y - 1) * 11 / (this.yLength - 1) +
                   (this.random() - 0.5) * displacement
            };
        }
    }

    this.lines = [];
    this.lineTicker = 0;
    this.lineIncrease = 0;
    this.numberOfLines = 0;
    for(var x = 0; x < this.xLength; x++){
        for(var y = 0; y < this.yLength - 1; y++){
            if(y == 0 && x + 1 < this.xLength){
                this.lines.push({ from: this.points[x + 1][y],
                                  to: this.points[x][y] });
            }
            this.lines.push({ from: this.points[x][y],
                              to: this.points[x][y + 1] });
            if(x + 1 < this.xLength){
                this.lines.push({ from: this.points[x][y + 1],
                                  to: this.points[x + 1][y + 1] });
                this.lines.push({ from: this.points[x + 1][y + 1],
                                  to: this.points[x][y] });
            }
        }
    }
    shuffle(this.lines, this.random);
}

Mesh.prototype.render = function(ctx){
    if(t < 496){
        ctx.save();
        ctx.translate(8 * GU, 4.5 * GU);
        var scale = smoothstep(0, 1, (t + 496) / (496 * 2));
        ctx.scale(scale, scale);
        ctx.translate(-8 * GU, -4.5 * GU);
        ctx.strokeStyle = '#fd0';
        for(var i = 0; i < Math.min(this.numberOfLines, this.lines.length); i++){
            var line = this.lines[i];
            ctx.beginPath();
            ctx.moveToGU(line.from.x + Math.sin(24 + line.from.x) * 0.16,
                         line.from.y + Math.cos(24 + line.from.y) * 0.16);
            ctx.lineToGU(line.to.x + Math.sin(24 + line.to.x) * 0.16,
                         line.to.y + Math.cos(24 + line.to.y) * 0.16);
            ctx.stroke();
        }
        ctx.restore();
        return;
    }
    for(var x = 0; x < this.xLength - 1; x++){
        for(var y = 0; y < this.yLength - 1; y++){

            var p1 = this.points[x][y];
            var p2 = this.points[x][y + 1];
            var p3 = this.points[x + 1][y + 1];
            var p4 = this.points[x + 1][y];

            var slow = 20;
            var magnitude = 0.16;

            var centerX = (p1.x + p2.x + p3.x) / 3;
            var centerY = (p1.y + p2.y + p3.y) / 3;
            var orangeR = 247;
            var orangeG = lerp(227, 130, centerX / 16) | 0;
            var orangeB = lerp(130, 70, centerX / 16) | 0;
            var purpleR = lerp(98, 101, centerX / 16) | 0;
            var purpleG = lerp(99, 28, centerX / 16) | 0;
            var purpleB = lerp(173, 117, centerX / 16) | 0;
            var greenR = lerp(87, 23, centerX / 16) | 0;
            var greenG = lerp(239, 171, centerX / 16) | 0;
            var greenB = lerp(30, 90, centerX / 16) | 0;
            var colorT1 = clamp(0, (t - 2900) / (2927 - 2900), 1);
            var colorT2 = clamp(0, (t - 3250) / (3300 - 3250), 1);
            var colorT3 = clamp(0, (t - 3670) / (3700 - 3670), 1);
            if(t <= 2927){
                var r = lerp(orangeR, purpleR, colorT1);
                var g = lerp(orangeG, purpleG, colorT1);
                var b = lerp(orangeB, purpleB, colorT1);
            }else if(t <= 3300){
                var r = lerp(purpleR, greenR, colorT2);
                var g = lerp(purpleG, greenG, colorT2);
                var b = lerp(purpleB, greenB, colorT2);
            }else {
                var r = lerp(greenR, orangeR, colorT3);
                var g = lerp(greenG, orangeG, colorT3);
                var b = lerp(greenB, orangeB, colorT3);
            }
            ctx.fillStyle = color(r, g, b);
            ctx.strokeStyle = color(r + 8, g + 80, b + 80);
            ctx.beginPath();
            ctx.moveToGU(p1.x + Math.sin(t / slow + p1.x) * magnitude,
                       p1.y + Math.cos(t / slow + p1.y) * magnitude);
            ctx.lineToGU(p2.x + Math.sin(t / slow + p2.x) * magnitude,
                       p2.y + Math.cos(t / slow + p2.y) * magnitude);
            ctx.lineToGU(p3.x + Math.sin(t / slow + p3.x) * magnitude,
                       p3.y + Math.cos(t / slow + p3.y) * magnitude);
            ctx.lineToGU(p1.x + Math.sin(t / slow + p1.x) * magnitude,
                       p1.y + Math.cos(t / slow + p1.y) * magnitude);
            ctx.fill();
            ctx.stroke();

            var centerX = (p1.x + p3.x + p4.x) / 3;
            var centerY = (p1.y + p3.y + p4.y) / 3;
            var orangeR = 247;
            var orangeG = lerp(227, 130, centerX / 16) | 0;
            var orangeB = lerp(130, 70, centerX / 16) | 0;
            var purpleR = lerp(98, 101, centerX / 16) | 0;
            var purpleG = lerp(99, 28, centerX / 16) | 0;
            var purpleB = lerp(173, 117, centerX / 16) | 0;
            var greenR = lerp(87, 23, centerX / 16) | 0;
            var greenG = lerp(239, 171, centerX / 16) | 0;
            var greenB = lerp(30, 90, centerX / 16) | 0;
            var colorT1 = clamp(0, (t - 2900) / (2927 - 2900), 1);
            var colorT2 = clamp(0, (t - 3250) / (3300 - 3250), 1);
            var colorT3 = clamp(0, (t - 3670) / (3700 - 3670), 1);
            if(t <= 2927){
                var r = lerp(orangeR, purpleR, colorT1);
                var g = lerp(orangeG, purpleG, colorT1);
                var b = lerp(orangeB, purpleB, colorT1);
            }else if(t <= 3300){
                var r = lerp(purpleR, greenR, colorT2);
                var g = lerp(purpleG, greenG, colorT2);
                var b = lerp(purpleB, greenB, colorT2);
            }else {
                var r = lerp(greenR, orangeR, colorT3);
                var g = lerp(greenG, orangeG, colorT3);
                var b = lerp(greenB, orangeB, colorT3);
            }
            ctx.fillStyle = color(r, g, b);
            ctx.beginPath();
            ctx.lineToGU(p3.x + Math.sin(t / slow + p3.x) * magnitude,
                       p3.y + Math.cos(t / slow + p3.y) * magnitude);
            ctx.lineToGU(p4.x + Math.sin(t / slow + p4.x) * magnitude,
                       p4.y + Math.cos(t / slow + p4.y) * magnitude);
            ctx.lineToGU(p1.x + Math.sin(t / slow + p1.x) * magnitude,
                       p1.y + Math.cos(t / slow + p1.y) * magnitude);
            ctx.fill();
        }
    }

    for(var i=0;i<this.flashes.length;i+=4){
        if(this.flashes[i + 2]){
            var p1 = this.points[this.flashes[i]][this.flashes[i + 1]];
            var p2 = this.points[this.flashes[i]][this.flashes[i + 1] + 1];
            var p3 = this.points[this.flashes[i] + 1][this.flashes[i + 1] + 1];
        }else{
            var p1 = this.points[this.flashes[i]][this.flashes[i + 1]];
            var p2 = this.points[this.flashes[i] + 1][this.flashes[i + 1] + 1];
            var p3 = this.points[this.flashes[i] + 1][this.flashes[i + 1]];
        }

        var p1x = p1.x + Math.sin(t / slow + p1.x) * magnitude;
        var p1y = p1.y + Math.cos(t / slow + p1.y) * magnitude;
        var p2x = p2.x + Math.sin(t / slow + p2.x) * magnitude;
        var p2y = p2.y + Math.cos(t / slow + p2.y) * magnitude;
        var p3x = p3.x + Math.sin(t / slow + p3.x) * magnitude;
        var p3y = p3.y + Math.cos(t / slow + p3.y) * magnitude;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        var flashAmount = this.flashes[i + 3];
        if(flashAmount > 0.0001) {
            ctx.fillStyle = color(100, 100, 100, Math.max(0, flashAmount));
            ctx.strokeStyle = color(100, 100, 100, Math.max(0, flashAmount));
            ctx.beginPath();
            ctx.moveToGU(p1x, p1y);
            ctx.lineToGU(p2x, p2y);
            ctx.lineToGU(p3x, p3y);
            ctx.lineToGU(p1x, p1y);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            var centerX = (p1x + p2x + p3x) / 3;
            var centerY = (p1y + p2y + p3y) / 3;
            var gradient = ctx.createRadialGradient(
                centerX * GU,
                centerY * GU,
                0,
                centerX * GU,
                centerY * GU,
                1.5 * GU);
            gradient.addColorStop(0, color(30, 30, 30, flashAmount));
            gradient.addColorStop(1, color(30, 30, 30, 0));
            ctx.fillStyle = gradient;
            ctx.arcGU(centerX, centerY, 1.5, 0, 2*Math.PI);
            ctx.fill();
        }else{
            if(i < this.flashes.length - 4){
                this.flashes[i + 3] = this.flashes.pop();
                this.flashes[i + 2] = this.flashes.pop();
                this.flashes[i + 1] = this.flashes.pop();
                this.flashes[i] = this.flashes.pop();
                i -= 4;
            } else {
                this.flashes.length -= 4;
            }
        }
        ctx.restore();
    }
}

Mesh.prototype.update = function(){
    if(t < 1496){
        while(music.currentTime > snaretimes[this.lineTicker] - 0.1){
            this.lineTicker++;
            this.numberOfLines += this.lineIncrease + 1;
            if(!--linecounts[this.lineIncrease]){
                this.lineIncrease++;
            }
        }
    }
    for(var i=0;i<this.flashes.length;i+=4){
        this.flashes[i + 3] *= 0.7;
    }
    if((t >= 496 && t < 2912) || t > 3700){ 
        if((B >= 0 && B % 24 == 0) ||
           (B >= 0 && B % 24 == 5) ||
           (B >= 0 && B % 24 == 6) ||
           (B >= 0 && B % 24 == 9) ||
           (B >= 0 && B % 24 == 18) ||
           (B >= 0 && B % 24 == 18) ||
           (B >= 0 && B % 48 == 39)){
            for(var i=0;i<3;i++){
                this.flashes.push(this.random() * (this.xLength - 1) | 0);
                this.flashes.push(this.random() * (this.yLength - 1) | 0);
                this.flashes.push(this.random() > 0.5);
                this.flashes.push(100);
            }
        }
    } else if(t >= 2912){
        if(B >= 0 && B % 6 == 0){
            var letter = (B % (6 * ninjaTriangles.length)) / 6 | 0;
            for(var i = 0; i < ninjaTriangles[letter].length; i += 3){
                this.flashes.push(ninjaTriangles[letter][i]);
                this.flashes.push(ninjaTriangles[letter][i + 1]);
                this.flashes.push(ninjaTriangles[letter][i + 2]);
                this.flashes.push(100);
            }
        }
    }
}

var ninjaTriangles = [

    /* NIN */
    [
        2, 2, false, 2, 2, true,
        2, 3, false, 2, 3, true,
        2, 4, false, 2, 4, true,
        2, 5, false, 2, 5, true,
        2, 6, false, 2, 6, true,
        3, 3, true,
        3, 4, false,
        4, 4, true,
        4, 5, false,
        5, 6, false, 5, 6, true,
        5, 5, false, 5, 5, true,
        5, 4, false, 5, 4, true,
        5, 3, false, 5, 3, true,
        5, 2, false, 5, 2, true,

        7, 2, false, 7, 2, true,
        7, 3, false, 7, 3, true,
        7, 4, false, 7, 4, true,
        7, 5, false, 7, 5, true,
        7, 6, false, 7, 6, true,

        9, 2, false, 9, 2, true,
        9, 3, false, 9, 3, true,
        9, 4, false, 9, 4, true,
        9, 5, false, 9, 5, true,
        9, 6, false, 9, 6, true,
        10, 3, true,
        10, 4, false,
        11, 4, true,
        11, 5, false,
        12, 6, false, 12, 6, true,
        12, 5, false, 12, 5, true,
        12, 4, false, 12, 4, true,
        12, 3, false, 12, 3, true,
        12, 2, false, 12, 2, true
    ],

    /* JA */
    [
        6, 2, false, 6, 2, true,
        6, 3, false, 6, 3, true,
        6, 4, false, 6, 4, true,
        6, 5, false, 6, 5, true,
        6, 6, false, 6, 6, true,
        5, 6, false, 5, 6, true,
        4, 6, false,
        4, 5, true,

        8, 2, false, 8, 2, true,
        8, 3, false, 8, 3, true,
        8, 4, false, 8, 4, true,
        8, 5, false, 8, 5, true,
        8, 6, false, 8, 6, true,
        9, 2, true,
        9, 3, false,
        10, 3, true,
        10, 4, false, 10, 4, true,
        10, 5, false, 10, 5, true,
        10, 6, false, 10, 6, true,
        9, 4, false, 9, 4, true
    ],

    /* CON */
    [
        3, 2, true, 3, 2, false,
        2, 2, false, 2, 2, true,
        2, 3, false, 2, 3, true,
        2, 4, false, 2, 4, true,
        2, 5, false, 2, 5, true,
        2, 6, false,
        3, 6, false, 3, 6, true,
        
        7, 2, true,
        7, 3, false, 7, 3, true,
        7, 4, false, 7, 4, true,
        7, 5, false, 7, 5, true,
        7, 6, false, 7, 6, true,
        5, 2, false, 5, 2, true,
        5, 3, false, 5, 3, true,
        5, 4, false, 5, 4, true,
        5, 5, false, 5, 5, true,
        5, 6, false,
        6, 6, false, 6, 6, true,
        6, 2, false, 6, 2, true,

        9, 2, false, 9, 2, true,
        9, 3, false, 9, 3, true,
        9, 4, false, 9, 4, true,
        9, 5, false, 9, 5, true,
        9, 6, false, 9, 6, true,
        10, 3, true,
        10, 4, false,
        11, 4, true,
        11, 5, false,
        12, 6, false, 12, 6, true,
        12, 5, false, 12, 5, true,
        12, 4, false, 12, 4, true,
        12, 3, false, 12, 3, true,
        12, 2, false, 12, 2, true
    ],

    [],

    /* 6. */
    [
        8, 2, true,
        8, 4, true,
        8, 5, false, 8, 5, true,
        8, 6, false, 8, 6, true,
        6, 2, false, 6, 2, true,
        6, 3, false, 6, 3, true,
        6, 4, false, 6, 4, true,
        6, 5, false, 6, 5, true,
        6, 6, false,
        7, 6, false, 7, 6, true,
        7, 2, false, 7, 2, true,
        7, 4, false, 7, 4, true,
        10, 6, false, 10, 6, true
    ],

    /* 7. */
    [
        6, 4, false, 6, 4, true,
        7, 4, false, 7, 4, true,
        8, 4, false, 8, 4, true,
    ],

    /* 8. */
    [
        8, 2, true,
        8, 3, false, 8, 3, true,
        8, 4, false, 8, 4, true,
        8, 5, false, 8, 5, true,
        8, 6, false, 8, 6, true,
        6, 2, false, 6, 2, true,
        6, 3, false, 6, 3, true,
        6, 4, false, 6, 4, true,
        6, 5, false, 6, 5, true,
        6, 6, false,
        7, 6, false, 7, 6, true,
        7, 2, false, 7, 2, true,
        7, 4, false, 7, 4, true,
        10, 6, false, 10, 6, true
    ],

    [],

    /* JUN */
    [
        3, 2, false, 3, 2, true,
        3, 3, false, 3, 3, true,
        3, 4, false, 3, 4, true,
        3, 5, false, 3, 5, true,
        3, 6, false, 3, 6, true,
        2, 6, false, 2, 6, true,
        2, 5, true,

        7, 2, true,
        7, 3, false, 7, 3, true,
        7, 4, false, 7, 4, true,
        7, 5, false, 7, 5, true,
        7, 6, false, 7, 6, true,
        5, 2, false, 5, 2, true,
        5, 3, false, 5, 3, true,
        5, 4, false, 5, 4, true,
        5, 5, false, 5, 5, true,
        5, 6, false,
        6, 6, false, 6, 6, true,

        9, 2, false, 9, 2, true,
        9, 3, false, 9, 3, true,
        9, 4, false, 9, 4, true,
        9, 5, false, 9, 5, true,
        9, 6, false, 9, 6, true,
        10, 3, true,
        10, 4, false,
        11, 4, true,
        11, 5, false,
        12, 6, false, 12, 6, true,
        12, 5, false, 12, 5, true,
        12, 4, false, 12, 4, true,
        12, 3, false, 12, 3, true,
        12, 2, false, 12, 2, true
    ],

    [],

    /* 20 */
    [
        6, 3, false, 6, 3, true,
        6, 4, false, 6, 4, true,
        6, 6, false, 6, 6, true,
        4, 2, false, 4, 2, true,
        4, 4, false, 4, 4, true,
        4, 5, false, 4, 5, true,
        4, 6, false,
        5, 6, false, 5, 6, true,
        5, 4, false, 5, 4, true,
        5, 2, false, 5, 2, true,
        6, 2, true,

        10, 3, false, 10, 3, true,
        10, 4, false, 10, 4, true,
        10, 5, false, 10, 5, true,
        10, 6, false, 10, 6, true,
        8, 2, false, 8, 2, true,
        8, 3, false, 8, 3, true,
        8, 4, false, 8, 4, true,
        8, 5, false, 8, 5, true,
        8, 6, false,
        9, 6, false, 9, 6, true,
        9, 2, false, 9, 2, true,
        10, 2, true,
    ],

    [],

    /* 14 */
    [
        5, 2, false, 5, 2, true,
        5, 3, false, 5, 3, true,
        5, 4, false, 5, 4, true,
        5, 5, false, 5, 5, true,
        5, 6, false, 5, 6, true,

        9, 2, false, 9, 2, true,
        9, 3, false, 9, 3, true,
        9, 4, false, 9, 4, true,
        9, 5, false, 9, 5, true,
        9, 6, false, 9, 6, true,
        7, 2, false, 7, 2, true,
        7, 3, false, 7, 3, true,
        7, 4, false,
        8, 4, false, 8, 4, true
    ],

    [],[],[]
];
