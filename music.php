<html>
<head>
<title>Music :: Arktis by Sigve Sebastian Farstad</title>
<link rel="stylesheet" href="css.css">

<style>

.song{
    padding: 20px;
}

.song .by{
    opacity: 0.5;
}

.song .by::before{
    content: "by ";
}

.song .description{
    display: none;
}

.song.playing{
    background: #ccc;
}

.playlist.playing{
}

.song.playing .description{
    display: block;
}

</style>
</head>
<body>

<div id=demoscene class=playlist>
    <h2>Demoscene songs</h2>

    <div class=song>
    <span class=name>TUNL-MNTN-WTER</span>
    <span class=by>Ninjadev</span>
    <div class=description>Bla bla yoabout this track</div>
    <audio src=https://github.com/sigvef/skog/releases/download/v1.0/music.mp3>
    </div>

    <div class=song>
    <span class=name>HONEYCOMB</span>
    <span class=by>Ninjadev</span>
    <div class=description>Bla bla bla about this track</div>
    <audio src=http://jord.al/honeycomb/music.ogg>
    </div>
</div>

<div id=trondheim-guitar-sextet class=playlist>
    <h2>Trondheim Guitar Sextet</h2>

    <div class=song>
    <span class=name>TUNL-MNTN-WTER</span>
    <span class=by>Ninjadev</span>
    <div class=description>Bla bla yoabout this track</div>
    <audio src=https://github.com/sigvef/skog/releases/download/v1.0/music.mp3>
    </div>

    <div class=song>
    <span class=name>HONEYCOMB</span>
    <span class=by>Ninjadev</span>
    <div class=description>Bla bla bla about this track</div>
    <audio src=http://jord.al/honeycomb/music.ogg>
    </div>
</div>

<script>

(function(){

/* ghetto jquery */
var $ = function(selector, element){
    var result = (element || document).querySelectorAll(selector);
    result.forEach = function(fn){ [].forEach.call(result, fn); };
    return result;
}

var player = { playlist: null, song: null, audio: null };

$('.song').forEach(function(el){
    el.addEventListener('click', function(){
        player.audio && player.audio.pause();
        player.song && player.song.parentElement.classList.remove('playing');
        player.song && player.song.classList.remove('playing');
        player.song = el;
        player.song.parentElement.classList.add('playing');
        player.audio = $('audio', el)[0];
        player.audio.currentTime = 0;
        player.song.classList.add('playing');
        player.audio && player.audio.play();
    });
});

})();

</script>

</body>
</html>
