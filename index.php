<!DOCTYPE html>
<?

/* because ghettoing your own framework is the way to go */

$links = array(array(

),array( "title" => "Music"
 ,  "img" => "http://placekitten.com/580/300"
 ,  "link" => "music"
 ,  "description" => "Music that I have made, in a music player that I have built. Some of this is <em>really </em> old."

),array( "title" => "TUNL-MNTN-WTER"
 ,  "img" => "images/tunl-mntn-wter.png"
 ,  "link" => "http://stianj.com/skog/"
 ,  "description" => "A THREE.js WebGL demo made for Solskogen 2013. It ended up on 5<sup>th</sup> place in the PC demo compo. You can <a href=http://pouet.net/prod.php?which=61584>read more about it on Pouët</a>."

 /*
),array( "title" => "HONEYCOMB"
 ,  "img" => "http://pouet.net/screenshots/59501.png"
 ,  "link" => "http://jord.al/honeycomb/"
 ,  "description" => "The first THREE.js WebGL I've been a part of, made for Solskogen 2012. It won 1<sup>st</sup> place in the web compo. The demo features what was probably the world's first timing-correct pure javascript midi-playing synthesizer when it was released. You can <a href=http://pouet.net/prod.php?which=59501>read more about HONEYCOMB on Pouët.</a>"
  */

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

 /*
),array( "title" => "Firefly"
 ,  "img" => "firefly"
 ,  "link" => "firefly"
 ,  "description" => "Firefly is a game written during a 48-hour long game jam called Bacon Game Jam 05. The aim was to make a game from scratch built around the theme of the jam: \"Lights Out\"."
  */

 /*
),array( "title" => "Eventhandler"
 ,  "img" => "http://placekitten.com/581/301"
 ,  "link" => "eventhandler"
 ,  "description" => "Eventhandler is a game written during a 48-hour long game jam called Bacon Game Jam 03. The ain was to make a game from scratch built around the theme of the jam: (insert theme here). Eventhandler was written in about 24 hours."
  */

 /*
),array( "title" => "Windwill"
 ,  "description" => "Windwill is a game written during a 48-hour long game jam called Bacon Game Jam 04. The theme of the jam was: \"Wind-powered\". The game jam took place in the same weekend as the yearly inauguration ball at my university, so most of the coding was done in a hungover state on Sunday morning, still in gala clothing."
 ,  "img" => "http://placekitten.com/580/299"
  */

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


</body>

<!-- We're hiring! Send your resume and cover
  -- letter to recruitment@arkt.is and join us!
  --
  -- (Well, not really, but I've always wanted
  -- to write that in a hidden HTML comment. ) -->

</html>
