var telnet = require('telnet');
var ConsoleDemo = require('./ConsoleDemo');

telnet.createServer(function(client){

    var CSI = '\x1b['

    client.write(CSI + '?25l');
    client.write(CSI + '2J');

    var terminal = {
        set: function(chr, x, y){
            x = x | 0;
            y = y | 0;
            if(x >= 0 && x < 80 && y >= 0 && y < 25){
                client.write(CSI + (y + 1) + ';' + (x + 1) + 'H' + chr);
            }
        }
    }

    var consoleDemo = new ConsoleDemo();
    var interval = setInterval(function(){
        try {
            consoleDemo.syncrender(terminal);
        } catch(e) {
            clearInterval(interval);
        }
        
    }, 20);
}).listen(23);
