<!DOCTYPE html>
<?

/* because ghettoing your own framework is the way to go */

$links = array(array(

),array( "title" => "Wikipendium"
 ,  "img" => "images/wikipendium.png"
 ,  "link" => "http://wikipendium.no"
 ,  "description" => "Wikipendium is the compendium that anyone can edit. Wikipendium's goal is to provide freely available compendiums for every course. At the moment, most of the compendiums in Wikipendium are for courses offered at NTNU."

),array( "title" => "TUNL-MNTN-WTER"
 ,  "img" => "images/tunl-mntn-wter.png"
 ,  "link" => "http://stianj.com/skog/"
 ,  "description" => "A THREE.js WebGL demo made for Solskogen 2013. It ended up on 5. place in the PC demo compo. You can <a href=http://pouet.net/prod.php?which=61584>read more about it on Pouët</a>."

),array( "title" => "HONEYCOMB"
 ,  "img" => "images/honeycomb.png"
 ,  "link" => "honeycomb"
 ,  "description" => "The first THREE.js WebGL I've been a part of, made for Solskogen 2012. It won 1. place in the web compo. The demo features what was probably the world's first timing-correct pure javascript midi-playing synthesizer when it was released. You can <a href=http://pouet.net/prod.php?which=59501>read more about HONEYCOMB on Pouët.</a>"

 /*
),array( "title" => "Ninjacon"
 ,  "description" => "Another demo"
 ,  "img" => "ninjacon"
  */

 /*
),array( "title" => "Blast"
 ,  "img" => "http://placekitten.com/580/301"
 ,  "link" => "http://demo.tidla.us/Blast.apk"
 ,  "description" => "Blast is an experimental mobile-first social network touted as \"the opposite of Snapchat\", whatever that means. Currently, this link links directly to the Android app."
  */

),array( "title" => "Firefly"
 ,  "img" => "images/firefly.png"
 ,  "link" => "firefly"
 ,  "description" => "Firefly is a game written during a 48-hour long game jam called Bacon Game Jam 05. The aim was to make a game from scratch built around the theme of the jam: \"Lights Out\"."


),array( "title" => "Windwill"
 ,  "img" => "images/windwill.png"
 ,  "link" => "windwill"
 ,  "description" => "Windwill is a game written during a 48-hour long game jam called Bacon Game Jam 03. The theme of the jam was: \"Wind-powered\". The game jam took place in the same weekend as the yearly inauguration ball at my university, so most of the coding was done in a hungover state on Sunday morning, still in gala clothing. Windwill is quite playable on the iPad, so you should try that if you have one."

),array( "title" => "Event Handler"
 ,  "img" => "images/eventhandler.png"
 ,  "link" => "eventhandler"
 ,  "description" => "Event Handler is a game written during a 48-hour long game jam called Bacon Game Jam 02. The aim was to make a game from scratch built around the theme of the jam: \"Reverse Perspective\". Event Handler was written in about 24 hours. There is a <a href=http://github.com/sigveseb/eventhandler>GitHub repo</a>, but the code quality isn't higher than you might expect from a game jam game."

),array( "title" => "Music"
 ,  "img" => "http://placekitten.com/580/300"
 ,  "link" => "music"
 ,  "description" => "Music that I have made, in a music player that I have built. Some of this is <em>really </em> old."

 /*
),array( "title" => "Various experiments"
 ,  "img" => "http://placekitten.com/579/300"
 ,  "link" => "hacks"
 ,  "description" => "This is where I aggregate a bunch of small random hacks."
  */

));

?>

<!-- Hand-coded HTML all the way, baby! -->

<html>
<head>
<title>Arktis by Sigve Sebastian Farstad</title>
<link rel="stylesheet" href="css.css">
<meta charset=utf-8>
<? include('stats.inc');?>
</head>
<body>

<header>
<h1>Arktis<h1>
</header>

<div class=content>

<p>
Hello people.
Here is a list of things I've been working on recently.
</p>

<? foreach($links as $l) { if(!$l)continue;?>
<div class=item>
<a href=<?=$l['link']?>>
<div class=image>
<img src=<?=$l['img']?>>
<h2><?=$l['title']?></h2>
</div>
</a>
<div class=description><?=$l['description']?></div>
</div>
<? } ?>

</div>


<? require('footer.inc');?>
</body>

<!-- We're hiring! Send your resume and cover
  -- letter to recruitment@arkt.is and join us!
  --
  -- (Well, not really, but I've always wanted
  -- to write that in a hidden HTML comment. ) -->

</html>
