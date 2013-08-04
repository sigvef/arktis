<html>
<head>
<title>Music :: Arktis by Sigve Sebastian Farstad</title>
<link rel="stylesheet" href="css.css">

<style>


* {
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    transition: all .3s ease;
}

.description{
    padding: 0;
    font-size: 0.8em;
    line-height: 1.2em;
}

.song{
    cursor: pointer;
    padding: 0;
}

.song .by{
    opacity: 0.5;
}

.song .by::before{
    content: "by ";
}

.song .description{
    display: none;
    padding: 20px;
}

.song .name{
    padding-left: 10px;
}

.song.playing{
    background: #ccc;
}

.playlist {
    border: 1px solid #ccc;
    background: #eee;
    margin-bottom: 20px;
}

.playlist > * {
    padding: 10px 20px; 
}

.playlist.playing{
}

.song.playing .description{
    display: block;
}

</style>
</head>
<body>

<h1>Music</h1>

<p>
This is a collection of music I have made.
Some is recent, some is quite old. 
Click a track to play it.
</p>

<div id=demoscene class=playlist>
    <h3>Demoscene songs</h3>
    <div class=description>Some tracks from my participation in the demoscene.</div>

    <div class=song>
    <span class=name>TUNL-MNTN-WTER</span>
    <span class=by>Ninjadev</span>
    <div class=description>This is the soundtrack for the Ninjadev demo called TUNL-MNTN-WTER.</div>
    <audio src=tunl-mntn-wter.mp3>
    </div>

    <div class=song>
    <span class=name>HONEYCOMB</span>
    <span class=by>Ninjadev</span>
    <div class=description>This is the soundtrack for the Ninjadev demo called HONEYCOMB by Ninjadev.</div>
    <audio src=honeycomb.mp3>
    </div>
</div>

<div id=random class=playlist>
    <h3>Random</h3>
    <div class=description>Just some songs.</div>

    <div class=song>
    <span class=name>Unbreakable</span>
    <span class=by>sigveseb</span>
    <div class=description></div>
    <audio src=unbreakable.mp3>
    </div>
</div>

<div id=remixes class=playlist>
    <h3>Remixes</h3>
    <div class=description>Some remixes that I have made.</div>

    <div class=song>
    <span class=name>Doin' It Right feat. Giorgio Moroder</span>
    <span class=by>sigveseb</span>
    <div class=description>I've been wanting to make a remix of Daft Punk's "Doin' It Right" for a long time, and this is the result. The Giorgio quotes are taken from the REM Collaborators interview.</div>
    <audio src=doin-it-right-feat-giorigo-moroder.mp3>
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
