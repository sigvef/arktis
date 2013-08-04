function Player(){
    var that = this;
    this.endedcb = function(){
        that.playNext();
    }
}

Player.prototype.stop = function(){
    this.audio && this.audio.pause();
    this.song && this.song.parentElement.classList.remove('playing');
    this.song && this.song.classList.remove('playing');
    this.audio && this.audio.removeEventListener('ended', this.endedcb);
}

Player.prototype.click = function(el){
    if(el == this.song){
        this.audio.paused ? this.resume() : this.pause();
    }else{
        this.play(el);
    }
}

Player.prototype.play = function(el){
    this.stop();
    this.song = el;
    this.song.parentElement.classList.add('playing');
    this.audio = el.querySelector('audio');
    this.audio.currentTime = 0;
    this.song.classList.add('playing');
    this.audio && this.audio.addEventListener('ended', this.endedcb);
    this.audio && this.audio.play();
}

Player.prototype.pause = function(){
    this.audio && this.audio.pause();
}

Player.prototype.resume = function(){
    this.audio && this.audio.play();
}

Player.prototype.playNext = function(){
    var songs = document.querySelectorAll('.song');
    var that = this;
    var play = false;
    var target;
    [].forEach.call(songs, function(el){
        if(play){
            target = el;
            play = false;
        }
        if(el == that.song){
            play = true;
        }
    });
    this.play(target);
}
