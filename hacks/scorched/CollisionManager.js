function CollisionManager(){
    this.terrain = {};
    this.players = [];
    this.bm = {};

    this.setTerrain = function(terrain){
        this.terrain = terrain;
    }

    this.setPlayers = function(players){
        this.players = players;
    }

    this.setBulletManager = function(bm){
        this.bm = bm;
    }

    this.update = function(){
        for(var i=0;i<this.bm.bullets.length;i++){
                for(var k=0;k<this.players.length;k++){
                    if(this.bm.bullets[i].owner != k && this.bm.bullets[i].x < this.players[k].x+10 && this.bm.bullets[i].x >= this.players[k].x &&
                        this.bm.bullets[i].y < this.players[k].y+10 && this.bm.bullets[i].y >= this.players[k].y){
                        for(var l=0;l<this.players.length;l++){
                            if(k!=l) this.players[l].incrementScore();
                        }
                        this.players[k].spawn();
                    }
                }
            if(this.bm.bullets[i].y > H || this.bm.bullets[i].y > W-this.terrain.terrain[Math.floor(this.bm.bullets[i].x)]){
                this.terrain.explode(this.bm.bullets[i].x,this.bm.bullets[i].y);
                for(var k=0;k<this.players.length;k++){
                    if(Math.pow(this.players[k].x-this.bm.bullets[i].x,2)+Math.pow(this.players[k].y-this.bm.bullets[i].y,2) < Math.pow(40,2)) {
                        for(var l=0;l<this.players.length;l++){
                            if(k!=l) this.players[l].incrementScore();
                        }
                        this.players[k].spawn();
                    }
                }
                this.bm.bullets.splice(i,1);
                i--;
            }
        }
        for(var i=0;i<this.players.length;i++){
            this.players[i].falling = this.players[i].y+5 < W-this.terrain.terrain[this.players[i].x];
        }
    }
}
