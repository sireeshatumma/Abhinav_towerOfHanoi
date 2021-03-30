class Rings{
    constructor(){
        this.input = createInput("3");
        this.button = createButton('ok');
        this.popItem;
        this.y;
        this.w;
        this.h;
        this.n=0;
        this.ringi;
        this.ring;
        this.ring1;
        this.check=0;
        this.yDiff=50;
        this.wDiff=50
        this.numBool=false;
    }
    selectNumOfRings(){
        this.input.position(10, 60);
        this.button.position(10, 100);
        this.button.mousePressed(()=>{
            this.destroySprites();
            this.n=this.input.value();
            if(this.n>10){
                this.numBool=true;                
            }else{                            
                this.makeSprites(this.n);
            }
            
        });
    }
    destroySprites(){
        moves=0;
        this.destroyArray(line1Array);
        this.destroyArray(line2Array);
        this.destroyArray(line3Array);
    }
    destroyArray(array){
        if(array.length!=0){
            for(var s in array){
                array[s].destroy();
            }
          } 
    }
    makeSprites(num){        
        this.y=450
        this.w=250
        this.h=50
        // adjust y position, width and height of rings for different number of rings
        if(num>=5 && num <=7){
            this.yDiff=40;
            this.wDiff=30
            this.h=40
        }else if(num > 7 && num<=10){
            this.yDiff=30;
            this.wDiff=20
            this.h=30
        }
        // create as many sprites as the number input by player
        for(var i=0;i<num;i++){
            this.ringi=createSprite(lineX1,this.y,this.w,this.h);
            this.ringi.shapeColor="gold";
            this.ringi.velocityY=v;
            this.ringi.collide(ground);
            line1Array.push(this.ringi);
          if(this.y>0){
               this.y=this.y-this.yDiff;
          }          
          if(this.w>0){
            this.w=this.w-this.wDiff;           
          }         
        }
        // duplicate the array for index numbers while creating sprites
        for(var i=0;i<line1Array.length;i++){ 
          ringPosArray.push(line1Array[i])
        }
         
    }


    ringMoved(array){
      // get the top ring
        this.ring=array[array.length-1]

        // make bool value true to increment moves 
        if(this.ring.x===mouseX){
            movesBool=true;
        }   
                
        if(mousePressedOver(this.ring)){
          // move the ring along with the mouse 
          this.ring.x=mouseX
          this.ring.y=mouseY
          this.ring.velocityY=v;    
          this.ring.collide(ground) ;
          
        }else{   
          //when mouse released after moving sprite, position ring on lines 
            this.ringposition(this.ring,array);
        }
    }
    ringCollide(){
        // collide the rings in all arrays with ground and one another
        for(var s in line1Array){
          line1Array[s].collide(ground)
          if(s!=0){
            line1Array[s].collide(line1Array[s-1]);               
          }  
        }
        for(var s in line2Array){
          line2Array[s].collide(ground)
          if(s!=0){
            line2Array[s].collide(line2Array[s-1]);     
          }  
        }
        for(var s in line3Array){
          line3Array[s].collide(ground)
          if(s!=0){
            line3Array[s].collide(line3Array[s-1]);     
          }  
        }        
    }
    popItemFromArray(array1,array2){
      //remove sprite from one array and add to another array
        if(array1.length!=0){
          this.popItem=array1.pop();
          array2.push(this.popItem);
          this.popItem.collide(ground);
        }
      }
    ringTouching(ring,array1,array2){

        if(array2.length==0){
          //pop from array1 and push to array2
            this.popItemFromArray(array1,array2);
        }else{
         
          this.ring1=array2[array2.length-1];
          // check if smaller width ring is below the bigger width ring
          if(ringPosArray.indexOf(ring) < ringPosArray.indexOf(this.ring1)){
            //dont add to line array
            ring.y=100;
            ring.velocityY=0;
          }else{
            //pop from array1 and push to array2
            this.popItemFromArray(array1,array2);
          }    
        } 
      }
      drawLines(){
        // draw three lines 
        strokeWeight(5)
        stroke("blue")
        line(lineX1,75,lineX1,500);
        line (lineX2,75,lineX2,500);
        line (lineX3,75,lineX3,500);
      }    
      
      gameOver(){
        // All rings moved to line 3
        if(line3Array.length!=0){
          if(line3Array.length==this.n)
          return true;   
        }else {
          return false;
        }

      }
      ringposition(ring,array){ 
        // decide the position of ring when released
        if(ring){
          if(ring.x>50 && ring.x<250){
            ring.x=lineX1;
            this.ringTouching(ring,array,line1Array);
          }else if(ring.x>250 && ring.x<550){
            ring.x=lineX2;
            this.ringTouching(ring,array,line2Array);
          }else if(ring.x>550 && ring.x<900){
            ring.x=lineX3;
            this.ringTouching(ring,array,line3Array);
          }
        }
      }
}