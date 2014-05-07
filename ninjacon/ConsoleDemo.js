function ConsoleDemo(){
    this.scrollerText = 'Ninjadev invites you to come to the warmest Ninjacon yet! Kick off the summer with a beautiful weekend in Mörsil, Sweden, the 6th to the 8th of June! There will be good food, fun activities, talks, workshops, and probably some code golfing! Register for Ninjacon by mail at ninjacon@arkt.is !                                                                                 ';
    this.scrollerX = 0;

    this.firstRender = true;
     this.t = 0;

    this.starChr = '|';
    this.reverseStarChr = '|';

    this.star = {
        '/': '-',
        '-': '\\',
        '\\': '|',
        '|': '/'
    }
    this.reverseStar = {
        '-': '/',
        '/': '|',
        '|': '\\',
        '\\': '-'
    }

    this.ninjadevImage = [
'#===============@@@@`==========================================================#',
'| \'@,          @@\' \'@                                                          |',
'| @@@#        #@    `@;                                                        |',
'| @\'+@#       @@    @@@@                                          ,,           |',
'| @+ #@.      @;   #@  @                                          #,           |',
'| @#  @@      @,   \'@  @                                          @,  `@@@     |',
'| @#   @@     @\'   ,@ @\'                                         @@, .@  #     |',
'| @@   `@`    @@    @@@                            \'#     ,@@@.@@`@, @   \',    |',
'| @@    @@    @@        ,,        ,@    +@@@.     @@@@   @,  ,#@  @,@;    @    |',
'| @@     @,   ;@        #,        \'@   @    #.   @,  @@ .@\'+#` #  @\'@     @    |',
'| @@     +@    @        @,  `@@@   @  @     @+  ,@      +@     +` @@+     @    |',
'| @@      @;   @     @  @, .@  #      #     @\'  @       @      ;\' @@      @    |',
'| @@      ;@   @\'   .@  @, @   \',     #     @\'  @       @      +` @@      @    |',
'| @@       @;  @@   ,@  @,@;    @   , @     @#  @      @@      #  @+      @    |',
'| @@       ,@  +@   ;@  @\'@     @   # @    \'@@  @    ;@  @    ,@  @       @    |',
'| @@        @; .@   \'@  @@+     @   @\'@    @+@  +#   @\'  @@, @@   @            |',
'| @@        .@  @   +@  @@      @  @@ @   \'@ @,,@@,`@@    @@@                  |',
'| @@         @+ @\'  #@  @@      @ +@@ @  `@   @#  @@@                          |',
'| @@          @ @@  #@  @+      @,@`@  @@@\'                                    |',
'| @@          @@#@  @@  @       @@\' @                                          |',
'| @@           @@@  @@  @       @\'  @                         2  0  1  4       |',
'| @@           `@@  @@              @                                          |',
'| @@            +`                  @                                          |',
'| @@                                @                                          |',
'#===================================@==========================================#'
    ];
}

ConsoleDemo.prototype.renderFrame = function(){
    for(var x = 1; x < 79; x++){
        this.terminal.set('=', x, 0);
        this.terminal.set('=', x, 24);
    }
    for(var y = 1; y < 24; y++){
        this.terminal.set('|', 0, y);
        this.terminal.set('|', 79, y);
    }
    this.terminal.set('+', 0, 0);
    this.terminal.set('+', 0, 24);
    this.terminal.set('+', 79, 0);
    this.terminal.set('+', 79, 24);
}

ConsoleDemo.prototype.renderText = function(text, x, y, length){
    length = Math.min(length, text.length) || text.length;
    for(var i = 0; i < length; i++){
        this.terminal.set(text.charAt(i), x + i, y);
    }
}

ConsoleDemo.prototype.renderImage = function(image, x, y) {
    for(var i = 0; i < image.length; i++){
        this.renderText(image[i], x, y + i); 
    }
}

ConsoleDemo.prototype.syncrender = function(terminal){
    this.t++;
    this.terminal = terminal;
    this.scrollerX += 0.2;

    if(this.firstRender){
        this.renderImage(this.ninjadevImage, 0, 0);
        this.firstRender = false;
    }

    if(this.scrollerX > 330){
        this.scrollerX = 0;
    }
    this.renderText(this.scrollerText, 80 - this.scrollerX, 23);
    if(this.t % 3 == 0){
        this.terminal.set(this.reverseStarChr, 59, 20);
        this.terminal.set(this.starChr, 74, 20);
        this.starChr = this.star[this.starChr];
        this.reverseStarChr = this.reverseStar[this.reverseStarChr];
    }
}

try{ module.exports = ConsoleDemo;
} catch(e){ }
