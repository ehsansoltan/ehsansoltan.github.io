// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



class character{
  constructor(){

    //defining some variables
    this.charX = 200;
    this.frameHeight = 112;
    this.frameWidth = 79;
    this.currentFrameX = 0;
    this.currentFrameY = 0;
    this.spriteSheet;
    this.currentFrameNum = 1;
    this.time = 0;
    this.timeUntilLast = 0;
    this.timeFromLast = 0;
    this.animationTime = 55;

    this.willStop = false;

    this.maxFrame = 9;

    this.state = "stationary";
  }

  rightState(){

    this.state = "right";
    this.animationTime = 40;
    this.currentFrameNum = 0;
    this.currentFrameY = 436;
    this.currentFrameX = 0;
    this.frameHeight = 114;
    this.frameWidth = 94;
    this.maxFrame = 9;
  }


  stationaryState(){
    this.state = "stationary";
    this.animationTime = 55;
    this.currentFrameNum = 0;
    this.willStop = false;
    this.currentFrameX = 0;
    this.currentFrameY = 0;
    this.frameHeight = 112;
    this.frameWidth = 79;
    this.maxFrame = 9;
  }



  //loading all the sprites i need from a single file
  loadSpriteSheet(){
    this.spriteSheet = loadImage('assets/sprites.png');
  }
  
  //function for drawing a certain portion from the spritesheet
  draw(){
   
      
 
    image(this.spriteSheet, this.charX, 0, this.frameWidth*1.5, this.frameHeight*1.5, this.currentFrameX, this.currentFrameY, this.frameWidth, this.frameHeight);
  }

  //using 'millis()' to get the time and the time from the last animation frame switch
  getTime(){
    this.time = millis();
    this.timeFromLast = this.time - this.timeUntilLast;
  }

  //changing animation frames every 55 milliseconds
  animate(){
    if (this.timeFromLast > this.animationTime){
      this.currentFrameNum++;
      this.currentFrameX += this.frameWidth;
      this.timeFromLast = 0;
      this.timeUntilLast = millis();
    }
    
    //resetting the animation after the ninth frame
    if (this.currentFrameNum > this.maxFrame){ 
      this.currentFrameX = 0;
      this.currentFrameNum = 0;

      //changed to stationary if the user has let go of a movement key
      if (this.willStop === true) this.stationaryState();

      this.timeFromLast = 0;
      this.timeUntilLast = millis();

    }

    
  

  }

  
 
  move(){
    if (this.state === "right") this.charX += 3;
   
  }




}



function keyPressed(){
  if (keyCode === RIGHT_ARROW){
    char1.willStop = false;
    if (char1.state === "stationary") char1.rightState();

  }
}

function keyReleased(){
  if (keyCode === RIGHT_ARROW){
    char1.willStop = true;
    
  }
}


let char1 = new character();
function setup() {
  createCanvas(windowWidth, windowHeight);
  char1.loadSpriteSheet();
  
}

function draw() {
  background(64, 128, 0);
  char1.move();
  char1.getTime();

  char1.draw();
  char1.animate();
 
    


  
  
 
}
