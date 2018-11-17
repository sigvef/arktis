/* @pjs transparent=true; */

//PFont f;           
//PImage b;


var SCREEN_W = 1280; //canvas width in pixels
var SCREEN_H = 720;  //canvas height in pixels
var GU = SCREEN_W/128; //grid unit size in pixels

//  f = loadFont("Ziggurat-HTF-Black-32.vlw");
//textFont(f,10*GU);  


var numpoints=200; //number of points
var currmin = 0; //tracks index of nearest target
var oldmin = 0;
var secondmin = 0; //tracks index of second-nearest targets
var currentTime = new Date("milliseconds");
var oldTime = new Date("milliseconds");
var numHits=0;
var numMisses=0;
var runningTotalTime=0;
var points = 0;
var fps = 0;
var oldfps = 0;
var oldfps2 = 0;
var oldfps3 = 0;
var fatness = GU;
var shrinkers = 3;
var oldx = 0;
var oldy = 0;


var HUDmessage = "";
var HUDtimer = 0;

var story = new Array();
story[0] = "?: I should draw strength from\n\n\n     these bubbles to stay \n\n\n     alive in this harsh environment.";
story[1] = "?: 'm coming for you, darling!";
story[2] = "?: urry!";
story[3] = "?: hat a strange place this is...";
story[4] = "?:  feel like I've been here before.";
story[5] = "?: here is something here,\n\n\n     I can feel it.";
story[6] = "?: as it a dream or was it real?";
story[7] = "orem Ipsum.";
story[8] = "?: t's getting tougher and tougher\n\n\n     out here, I need to stay large \n\n\n     and focused.";
story[9] = "orem Ipsum?";
var storyX = new Array();
var storyY = new Array();
storyX[0] = 2000;
storyY[0] = 520;
storyX[1] = 3300;
storyY[1] = 290;
storyX[2] = 3600;
storyY[2] = 440;
storyX[3] = 7000;
storyY[3] = 100;
storyX[4] = 8780;
storyY[4] = 300;
storyX[5] = 10480;
storyY[5] = 500;
storyX[6] = 13080;
storyY[6] = 550;
storyX[7] = 15580;
storyY[7] = 500;
storyX[8] = 17280;
storyY[8] = 200;
storyX[9] = 19080;
storyY[9] = 400;


var health = 100;

//floats and var arrays to handle position, movement, timing
var x, y;              //old cursor position
var cursorX, cursorY;  //cursor position
var pointsX = new Array();
var pointsY = new Array();
var diameter = new Array();
var containDistances = new Array();
var intersectDistances = new Array();
var distances = new Array();
var animationStage = new Array();
var active = new Array();
var cursorDiameter;
var ringDiameter = 0;
var startTime=0;
var timeElapsed=0;

var x_offset = 0;
var scrollspeed = 15*GU;

function resetGame(){

	fatness = GU;
	x_offset = 0;
	points = 0;
collisionsFound=true;
    while (collisionsFound){
      initializePoints();
    }  
}



var collisionsFound; //used only in initializing points to prevent overlap
var startGame = false;


var channel_max = 10;										// number of channels
	audiochannels = new Array();
	for (a=0;a<channel_max;a++) {									// prepare the channels
		audiochannels[a] = new Array();
		audiochannels[a]['channel'] = new Audio();						// create a new audio object
		audiochannels[a]['finished'] = -1;							// expected end time for this channel
	}
	function playSound(s) {
		for (a=0;a<audiochannels.length;a++) {
			thistime = new Date();
			if (audiochannels[a]['finished'] < thistime.getTime()) {			// is this channel finished?
				audiochannels[a]['finished'] = thistime.getTime() + document.getElementById(s).duration*1000;
				audiochannels[a]['channel'].src = document.getElementById(s).src;
				audiochannels[a]['channel'].load();
				audiochannels[a]['channel'].play();
				break;
			}
		}
	}

 

function mousePressed(){
 if(!startGame && ready){
 playSound("music");
 startGame = true;}
 

}

function dist(x1,y1,x2,y2){
return Math.sqrt(Math.pow(Math.abs(x1-x2),2) + Math.pow(Math.abs(y1-y2),2));
}

function initializePoints(){
  for (var i=0;i<numpoints;i++){     
        pointsX[i]= SCREEN_W+Math.random()*30;
        pointsY[i]= Math.random()*SCREEN_H;
        diameter[i]= Math.random()*10+GU;
		animationStage[i] = 0;
		active[i] = true;
      }
  collisionsFound=false;
  /*for (var i=0;i<numpoints;i++){
     for (var j=0; j<i; j++)
     {
       var separation = dist(pointsX[i],pointsY[i],pointsX[j],pointsY[j]);
         if  ((separation < (diameter[i]/2)+20) || (separation<(diameter[j]/2)+20)){
           collisionsFound=true;
     }
  }

  }*/
  }




function draw() 
{ 
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
 
  oldTime = currentTime;
  currentTime = new Date.getTime();
  dt = (currentTime - oldTime)/1000;
  
  if(currentTime-oldTime!=0){oldfps3 = oldfps2; oldfps2 = oldfps; oldfps = fps; fps = (oldfps3 + oldfps2 + oldfps +(1000/(currentTime - oldTime)))/4;}
  if(startGame){
	  x_offset += scrollspeed*dt;
	  
  }
  
  ctx.clearRect(0,0,SCREEN_W,SCREEN_H);
	$('#game').css({'background-position':floor(-x_offset/4)+'px 0'});
	
  cursorX = mouseX;  
  
   if(dist(x+x_offset,y,pointsX[currmin],pointsY[currmin])<(diameter[currmin]+fatness)/2){
		x += (((diameter[currmin]+fatness)/2 - dist(x+x_offset,y,pointsX[currmin],pointsY[currmin]))/dist(x+x_offset,y,pointsX[currmin],pointsY[currmin]))*(x+x_offset-pointsX[currmin]);
		y += (((diameter[currmin]+fatness)/2 - dist(x+x_offset,y,pointsX[currmin],pointsY[currmin]))/dist(x+x_offset,y,pointsX[currmin],pointsY[currmin]))*(y-pointsY[currmin]);
  }
  
  //here we follow the strategy on processing.org's tutorial for tracking mouse movement
  var dx = cursorX - x; //change in xposition
  if(Math.abs(dx) > 1) {
	oldx = x;
    x += dx*2*dt;  
  }
  
  cursorY = mouseY;
  var dy = cursorY - y; //change in yposition
  if(Math.abs(dy) > 1) {
	oldy = y;
    y += dy*2*dt;
  }
  
  if(startGame){fatness-=GU*0.00005*x_offset*dt;}
  
  morphed=false; //true iff we need a morphed cursor bubble
  currmin=0; 
  secondmin=0;

  //compute distances to center, outermost and innermost
  //sides of all neighbors
  
  for (var i=0; i<pointsX.length; i++)
  {
    distances[i] = dist(x+x_offset,y,pointsX[i],pointsY[i]); //distance to centers
    containDistances[i] = distances[i] + diameter[i]; //distance to contain
    intersectDistances[i] = distances[i]-(diameter[i]/2); //distance to intersect
    
    //find the nearest neighbor
    if ((intersectDistances[i]< intersectDistances[currmin]))
	{
    currmin=i;
    }
  }
  
  
  
  if(oldmin != currmin &&startGame){
	oldmin = currmin;
	if(active[currmin] == true){
		animationStage[currmin] = 0;
		fatness+=GU*x_offset*0.00008;
		points+=fatness;
		active[currmin] = false;
		var r = random(5);
		if(r<1){playSound("dingA");}
		else if(r<2){playSound("dingF");}
		else if(r<3){playSound("dingD");}
		else if(r<4){playSound("dingG");}
		else if(r<5){playSound("dingC");}
	}
  }
  
    cursorDiameter = 2*distances[currmin] - diameter[currmin];

	textFont(f,4*GU);
	textAlign(LEFT,TOP);
	var counter = 0;
   for(var i=story.length;i>-1;i--){
		if(2*(storyX[i]-x_offset)/SCREEN_W <= 1 && 2*(storyX[i]-x_offset)/SCREEN_W >= 0){
			fill(0,0,0,255*(2*(storyX[i]-x_offset)/SCREEN_W));
		}
		else{fill(0);}
		if(storyX[i]-x_offset<=SCREEN_W && storyX[i]-x_offset >=0){text(story[i],(storyX[i]-x_offset)*(((storyX[i]-x_offset)*(storyX[i]-x_offset)*(storyX[i]-x_offset)*(storyX[i]-x_offset))/(SCREEN_W*SCREEN_W*SCREEN_W*SCREEN_W)),storyY[i]);
		counter+=1;
		}
		if(counter>3){
		i=-1;
		}
   }
  fill(200,200,200,20);
  stroke(153);
  strokeWeight(GU);
    if(startGame){
	ctx.arc(x, y, cursorDiameter/2, 0, Math.PI*2, true);
	ctx.fill()
	fill(255,200,200);
			noStroke();
	ctx.arc(x, y, fatness/2, 0, Math.PI*2, true);
	ctx.fill();
	}
   
  //draw targets
  fill(210,210,210,200);
  for (var i=0;i<pointsX.length;i++){  
	

	if(active[i]){fill(210,210,210,200);}
	else{fill(150,150,150,150);}
	if (i ==currmin)
	{
	  stroke(255,200,200);
	  strokeWeight(GU/3);
	  ctx.arc(pointsX[i]-x_offset,pointsY[i],diameter[i]/2, 0, Math.PI*2, true);
	  ctx.fill();
	  noStroke();
	}
	else{
	  noStroke();
	  ctx.arc(pointsX[i]-x_offset,pointsY[i],diameter[i]/2, 0, Math.PI*2, true);
	  ctx.fill();
	}
	
	if(animationStage[i]>=0 && animationStage[i] < 1){
		strokeWeight(4*GU*animationStage[i]);
		stroke(255,200,200,255-animationStage[i]*255)
		noFill();
		ellipse(pointsX[i]-x_offset,pointsY[i]);
		ctx.arc(pointsX[i]-x_offset,pointsY[i],(diameter[i]+animationStage[i]*4*GU)/2, 0, Math.PI*2, true);
		ctx.fill();
		animationStage[i]+=2*dt;
		strokeWeight(GU/3);
		
	  fill(210,210,210,200);
	}
	if(animationStage[i] >= 1){
		animationStage[i] = -1;
	}

  }

 
 stroke(153);
 noFill();
 rect(4*GU,68*GU,120*GU,2*GU);
 noStroke();
 fill(153);
 rect(4.5*GU,68.5*GU,119*GU*(x_offset/(SCREEN_W*40)),1*GU);
 textFont(f,5*GU);
 fill(255);
 textAlign(RIGHT, TOP);
 text(floor(points), 123.5*GU, 4.5*GU);
 textAlign(LEFT, TOP);
 text(floor(fps), 4.5*GU, 4.5*GU);
 textAlign(CENTER,TOP);
 if(!ready){text("loading...",SCREEN_W/2,60*GU);}
 if(ready && !startGame){text("done",SCREEN_W/2,60*GU);}
/* if(HUDtimer>0){
	HUDtimer-=dt;
	textAlign(CENTER,CENTER);
	fill(255,255,255,255*HUDtimer);
	text(HUDmessage,SCREEN_W/2,SCREEN_H/2);
 }*/

 if(fatness<=0){
	startGame = false;
	resetGame();
 }
 
}

function play(){
	resetGame();
	//setTimeout(draw,0);
}





