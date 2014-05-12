<html>
<head>
<title>Music :: Arktis by Sigve Sebastian Farstad</title>
<link rel="stylesheet" href="/css.css">
<link rel="stylesheet" href="music.css">
<script src="Player.js"></script>
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1">
<? include('../stats.inc');?>
</head>
<body>

<header>
<nav>
<a href="/" rel="index">Arktis</a>
»
<a href="/music">Music</a>
</nav>
<h1>Music</h1>
</header>

<p>
This is a collection of music I have made.
Some is recent, some is quite old. 
Click a track to play it.
</p>

<h3>Demoscene songs</h3>
<div class=description>Some tracks from my participation in the demoscene.</div>

<div id=demoscene class=playlist>
    <div class=song>
    <span class=name>"Old Computers Never Die!"</span>
    <span class=by>sigveseb</span>
    <div class=description>This is the soundtrack for my first solo demo called "Old Computers Never Die!"</div>
    <audio>
        <source src=old-computers-never-die.mp3>
        <source src=old-computers-never-die.ogg>
    </audio>
    </div>

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
    <div class=description>This is the soundtrack for the Ninjadev demo called HONEYCOMB.</div>
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

<h3>Trondheim Guitar Sextet</h3>
<div class=description>
A couple of years ago, I played in a guitar sextet called Trondheim Guitar Sextet. The sextet recorded only one EP titled "Trondheim Gitarsekstett: Scandinavian Masters", which is reproduced here for your enjoyment.
</div>
<div id=trondheim-guitar-sextet class=playlist>
    <div class=song>
    <span class=name>Eleanor Rigby</span>
    <span class=by>TGS/Lennon/Mc Cartney</span>
    <div class=description>Jan-Olof Eriksson's novel guitar ensemble arrangement of The Beatles' classic Eleanor Rigby.</div>
    <audio>
        <source src=tgs1.mp3>
        <source src=tgs1.ogg>
    </audio>
    </div>

    <div class=song>
    <span class=name>Vals Ecuatorial</span>
    <span class=by>TGS/Pieter van der Staak</span>
    <div class=description>A sleepy summer waltz by Dutch classical guitarist and composer Pieter van der Staak, arranged by Jan-Olof Eriksson.</div>
    <audio>
        <source src=tgs2.mp3>
        <source src=tgs2.ogg>
    </audio>
    </div>

    <div class=song>
    <span class=name>Cantico</span>
    <span class=by>TGS/Trad. Venezuela</span>
    <div class=description>Pensive traditional Venezuelan melody, harmonized for solo guitar by by Vicente Emilio Sojo and arranged for guitar ensemble by J. Strømdal.</div>
    <audio>
        <source src=tgs3.mp3>
        <source src=tgs3.ogg>
    </audio>
    </div>

    <div class=song>
    <span class=name>Galeron</span>
    <span class=by>TGS/Trad. Venezuela</span>
    <div class=description>Lively traditional Venezuelan melody, harmonized for solo guitar by by Vicente Emilio Sojo and arranged for guitar ensemble by J. Strømdal.</div>
    <audio>
        <source src=tgs4.mp3>
        <source src=tgs4.ogg>
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

<? require('../footer.inc');?>
</body>
</html>
