<html>
<head>
<title>Music :: Arktis by Sigve Sebastian Farstad</title>
<link rel="stylesheet" href="/css.css">
<link rel="stylesheet" href="music.css">
<script src="Player.js"></script>

</head>
<body>

<h1>Music</h1>

<p>
This is a collection of music I have made.
Some is recent, some is quite old. 
Click a track to play it.
</p>

<h3>Demoscene songs</h3>
<div class=description>Some tracks from my participation in the demoscene.</div>

<div id=demoscene class=playlist>
    <div class=song>
    <span class=name>TUNL-MNTN-WTER</span>
    <span class=by>Ninjadev</span>
    <div class=description>This is the soundtrack for the Ninjadev demo called TUNL-MNTN-WTER. Fun fact: the "chugga chugga" rhythm that accompanies the choo-choo sounds are human beat-boxed.</div>
    <audio>
        <source src=tunl-mntn-wter.mp3>
        <source src=tunl-mntn-wter.ogg>
    </audio>
    </div>

    <div class=song>
    <span class=name>HONEYCOMB</span>
    <span class=by>Ninjadev</span>
    <div class=description>This is the soundtrack for the Ninjadev demo called HONEYCOMB by Ninjadev.</div>
    <audio>
        <source src=honeycomb.mp3>
        <source src=honeycomb.ogg>
    </audio>
    </div>
</div>

<h3>Random</h3>
<div class=description>Just some songs.</div>
<div id=random class=playlist>
    <div class=song>
    <span class=name>Unbreakable</span>
    <span class=by>sigveseb</span>
    <div class=description>A dirty electronica song inspired by Caravan Palace.</div>
    <audio>
        <source src=unbreakable.mp3>
        <source src=unbreakable.ogg>
    </audio>
    </div>
</div>

<h3>Remixes</h3>
<div class=description>Some remixes that I have made.</div>
<div id=remixes class=playlist>
    <div class=song>
    <span class=name>Doin' It Right feat. Giorgio Moroder</span>
    <span class=by>sigveseb</span>
    <div class=description>I've been wanting to make a remix of Daft Punk's "Doin' It Right" for a long time, and this is the result. The Giorgio quotes are taken from the REM Collaborators interview.</div>
    <audio>
        <source src=doin-it-right-feat-giorgio-moroder.mp3>
        <source src=doin-it-right-feat-giorgio-moroder.ogg>
    </audio>
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

var player = new Player();

a = player;

$('.song').forEach(function(el){
    var progressBarContainer = document.createElement('div');
    progressBarContainer.classList.add('progressbar-container');
    var progressBar = document.createElement('div');
    progressBarContainer.appendChild(progressBar);
    progressBar.classList.add('progressbar');
    el.appendChild(progressBarContainer);
    el.addEventListener('click', function(){
        player.click(el);
    });

    setInterval(function(){
        $('.progressbar', player.song)[0].style.width = player.audio.currentTime/player.audio.duration * 100 + "%";
    },900);
});

})();

</script>

</body>
</html>
