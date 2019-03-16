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
  }


  //loading all the sprites i need from a single file
  loadSpriteSheet(){
      this.spriteSheet = loadImage('assets/sprites.jpg');
  }
  
  //function for drawing a certain portion from the spritesheet
  draw(){
   
      
 
      image(this.spriteSheet, this.charX, 0, 118.5, 168, this.currentFrameX, this.currentFrameY, this.frameWidth, this.frameHeight);
  }

  //using 'millis()' to get the time and the time from the last animation frame switch
  getTime(){
    this.time = millis();
    this.timeFromLast = this.time - this.timeUntilLast;
  }

  //changing animation frames every 55 milliseconds
  animate(){
    if (this.timeFromLast > 55){
        this.currentFrameNum++;
        this.currentFrameX += this.frameWidth;
        this.timeFromLast = 0;
        this.timeUntilLast = millis();
      }
    
    //resetting the stationary animation after the ninth frame
    if (this.currentFrameNum > 9){ 
      this.currentFrameX = 0;
      this.currentFrameNum = 0;
    }

  }
}




let char1 = new character();
function setup() {
  createCanvas(windowWidth, windowHeight);
  char1.loadSpriteSheet();
  
}

function draw() {
  background(220);
  char1.draw();
  char1.getTime();
  char1.animate();
    


  
  
 
}
