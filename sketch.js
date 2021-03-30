// variables
var v=5;
var moves=0;
var minMoves=0;
var movesBool=false;
var line1Array=[];
var ringPosArray=[];
var line2Array=[];
var line3Array=[];
var lineX1=150
var lineX2=450;
var lineX3=750;
var ground;

function setup() {
  createCanvas(1000,500);
  // create ground sprite and make it invisible
  ground=createSprite(500,480,1000,20);
  ground.visible=false;

  // create object for class
  ringsObj=new Rings();

  // get the number of rings
  ringsObj.selectNumOfRings();
  
}

function draw() {
  background("red"); 
  textSize(20);

   //display messages on canvas
   fill("white")
   text("Please enter a number from 1 to 10", 10,50)  
   // text(mouseX+","+mouseY, 600,100)    
   text("Min Moves: "+minMoves, 550,50)
   text("Moves: "+moves, 800,50)
  
   fill("gold")
  // if number of rings greater than 10, display a message else calculate min moves 
  if(ringsObj.numBool){   
    text("Number greater than 10 ",120,120)
    minMoves=0
  }else{
    minMoves=Math.pow(2, ringsObj.n)-1;
    console.log(minMoves)
  } 

  //if all rings are on third line, display message
  if(ringsObj.gameOver()){
    textSize(40);
    text("Game Over",500,100)
    if(moves==minMoves){
      textSize(30);
      text("Congrats! You completed with minimum moves",200,200)      
    }else{
      var diff=moves-minMoves;
      console.log(diff,moves-minMoves)
      text("Congrats! You took "+diff+" extra moves",200,200)
      
    }
  }
  // draw the sprites on canvas
  drawSprites();

  // draw the three lines
  ringsObj.drawLines();

  // get rings collide with ground and one another
  ringsObj.ringCollide();  

  // to move the rings from one line to another
  if(line1Array.length!=0)
  ringsObj.ringMoved(line1Array);
  if(line2Array.length!=0)
  ringsObj.ringMoved(line2Array);
  if(line3Array.length!=0)
  ringsObj.ringMoved(line3Array);
  
}
function mouseReleased(){
  //calculate moves when the ring is moved and placed on other line
  if(movesBool){
    moves++
    movesBool=false
  }
  
}





