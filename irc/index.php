<!DOCTYPE html>
<html>
<head>
<title>IRC-guide for NTNU-students :: Arktis by Sigve Sebastian Farstad</title>
<link rel="stylesheet" href="/css.css">
<meta charset=utf-8>
<meta name=viewport content="width=device-width, initial-scale=1">
<? require('../stats.inc');?>
</head>
<body>

<header>
<nav>
<a href="/">Arktis</a>
 » 
<a href="/irc">IRC-guide for NTNU-students</a>
</nav>
<h1>IRC-guide for NTNU-students</h1>
</header>

<div id=content>

<p>
This is a quick guide showing how to connect to IRC using the university servers.
</p>

<p>
All the commands in this guide should be written in your command-line terminal.
Linux and OS X users can use the built in terminal (search for it using spotlight or similar).
If you are using Windows, you need to <a href="http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe">download PuTTY</a>, and use it instead.
</p>

<h2>One-time setup</h2>

<ol>
<li>
Connect to one of the university servers:
<code>ssh YOUR_NTNU_USERNAME@lynx.stud.ntnu.no</code>
Windows users use PuTTY: run it, enter lynx.stud.ntnu.no and click "Connect".
The username and password is your regular NTNU username and password that you use for innsida.
</li>

<li>
Hook up an alias for easy reconnecting later:
<code>echo alias ii=\"screen -raAd irssi\" &gt;&gt; ~/.bashrc</code>
</li>

<li>
Start a <a href="http://www.gnu.org/software/screen/">screen</a> called <a href="http://irssi.org">irssi</a>:
<code>screen -S irssi</code>
</li>

<li>
Start irssi:
<code>irssi</code>
</li>

<li>
Connect to the EFNet irc network:
<code>/connect irc.efnet.org</code>
(If that doesn't work, try one of irc.efnet.org, irc.efnet.se, irc.underworld.no, irc.homelien.no, etc).
</li>

<li>
Join the Abakus channel:
<code>/join #abakus</code>
You can also join more channels if you want, just do another /join #&lt;channel name&gt;.
</li>

<li>
Say hello!:
<code>hello!&lt;enter&gt;</code>
</li>
</ol>

<h2>Reconnecting</h2>

<ol>
<li>
Connect to your university servers: 
<code>ssh lynx.stud.ntnu.no</code>
</li>

<li>
Reconnect to your screen:
<code>ii</code>
</li>
</ol>


</div>

<? require('../footer.inc');?>

</body>
</html>
