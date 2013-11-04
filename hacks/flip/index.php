<!DOCTYPE html>
<html>
<head>
<title>
Flip :: Arktis
</title>
<meta charset="UTF-8">
<? require("/home/prods/arktis/stats.inc");?>
<style>
*{padding:0;margin:0;border:0}
html,body{overflow:hidden}
html,body,iframe{width:100%;height:100%;}
iframe{
-moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
    -ms-filter: flipx; /*IE*/
    filter: flipx; /*IE*/
}
</style>
</head>
<body>
<iframe id=web src=""></iframe>

<script>
(function(){
    var url = document.location.hash.substr(1);
    url = url || document.location.pathname.substr(6);
    url = (url.match(/\/\//) ? 'http://' : '') + url;
    document.getElementById('web').src='http://'+url;
})();
</script>
</body>
</html>
