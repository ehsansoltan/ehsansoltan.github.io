// Ehsan's Animations Demo
// Ehsan Soltan
// March. 25, 2019
//Instructions: move with the left and right arrow keys and shoot the hadouken with the down arrow key
// Extra for Experts: I used classes in this project. I have a sound effect(I can't remember if we were taught this). I have animations.
// 


//the class for the projectile
class hadouken{

  //declaring variables for position, animation frames, and time
  constructor(){
    this.x = 100;
    this.y = 100;
    this.frameHeight = 53;
    this.frameWidth = 64;
    this.currentFrameX = 23;
    this.currentFrameY = 16;
    this.spriteSheet;
    this.currentFrameNum = 1;
    this.time = 0;
    this.timeUntilLast = 0;
    this.timeFromLast = 0;
    this.animationTime = 50;
    this.maxFrame = 6;
    this.startTime;
    this.lifeTime;
    this.alive = false;


    

  }

  //loading a spritesheet
  loadSpriteSheet(){
    this.spriteSheet = loadImage('assets/sprites2.1.png');
  }


  //function for setting the start coordinates for the projectile
  setStart(x, y){
    if (this.alive == false){
    this.x = x + 130;
    this.y = y + 17;
    }
  }

  //drawing the projectile if it is "alive"
  draw(){
    if (this.alive === true) image(this.spriteSheet, this.x, this.y, this.frameWidth*1.5, this.frameHeight*1.5, this.currentFrameX, this.currentFrameY, this.frameWidth, this.frameHeight);
  }

  //using 'millis()' to get the time and the time from the last animation frame switch as well as the lifetime of the projectile
  getTime(){
    this.time = millis();
    this.timeFromLast = this.time - this.timeUntilLast;

    this.lifeTime = this.time - this.startTime;
   
    
  }

  //changing animation frames every 55 milliseconds and when it reaches max frame
  animate(){
    if (this.timeFromLast > this.animationTime){
      this.currentFrameNum++;
      this.currentFrameX += this.frameWidth;
      this.timeFromLast = 0;
      this.timeUntilLast = millis();
    }
    
   if (this.currentFrameNum > this.maxFrame){
     this.currentFrameNum = 3;
     this.currentFrameX = 22;
   }
    
    }

  //moving the projectile
  move(){
      this.x+=10;
  }

  //checking to see if the projectile is "alive" and making it dead after a certain amount of time
  checkAlive(){
    if (this.lifeTime > 1000){
      this.alive = false;
      this.lifeTime = 0;
    }

  }
  

}

//the class for the character
class character{
  constructor(){

    //declaring some variables for position, frames, time etc
    this.charX = 200;
    this.charY = 200;
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
    this.sound;

    this.willStop = false;

    this.maxFrame = 9;

    //the variable for the character's state
    this.state = "stationary";
  }

  //changing frames for when the character is facing the right
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

  //frames for when character is facing left
  leftState(){
    this.state = "left";
    this.animationTime = 40;
    this.currentFrameNum = 0;
    this.currentFrameY = 553;
    this.currentFrameX = 0;
    this.frameHeight = 114;
    this.frameWidth = 94;
    this.maxFrame = 9;
  }


  //frames for when the character is stationary
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

  //frames for when the character uses the hadouken
  hadouken(){
    this.state = "hadouken";
    this.animationTime = 55;
    this.currentFrameNum = 0;
    this.willStop = false;
    this.currentFrameX = 0;
    this.currentFrameY = 2348;
    this.frameHeight = 109;
    this.frameWidth = 125;
    this.maxFrame = 8;
    hadouken1.startTime = millis();
  }



  //loading all the sprites i need from a single file
  loadSpriteSheet(){
    this.spriteSheet = loadImage('assets/sprites.png');
  }
  
  //function for drawing a certain portion from the spritesheet
  draw(){
   
      
 
    image(this.spriteSheet, this.charX, this.charY, this.frameWidth*1.5, this.frameHeight*1.5, this.currentFrameX, this.currentFrameY, this.frameWidth, this.frameHeight);
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
    
    //change to stationary after hadouken is used
    if (this.state === "hadouken" && this.currentFrameNum > this.maxFrame) this.stationaryState();

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

  
  //moving the character based on its state
  move(){
    if (this.state === "right") this.charX += 4;
    if (this.state === "left") this.charX -= 4;
   
  }




}


//calling directional functions and changing the character state based on key presses (of the character isnt already that state)
function keyPressed(){
  if (keyCode === RIGHT_ARROW){
    char1.willStop = false;
    if (char1.state !== "right") char1.rightState();

  }

  if (keyCode === LEFT_ARROW){
    char1.willStop = false;
    if (char1.state !== "left") char1.leftState();

  }

  if (keyCode === DOWN_ARROW){
    char1.willStop = false;
    if (hadouken1.alive === false){
      hadouken1.setStart(char1.charX, char1.charY);
      hadouken1.startTime = 0;
      hadouken1.lifeTime = 0;
      hadouken1.alive = true;

      //playing the sound effect
      char1.sound.play();
    }
    if (char1.state !== "hadouken") char1.hadouken();

  }
}


//making character stationary if directional keys are released
function keyReleased(){
  if (keyCode === RIGHT_ARROW){
    char1.willStop = true;
    
  }

  if (keyCode === LEFT_ARROW){
    char1.willStop = true;
    
  }
}

//making objects for the character and projectile
let char1 = new character();
let hadouken1 = new hadouken();


//preloading the sound effect
function preload() {
  char1.sound = loadSound("assets/hadouken.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  char1.loadSpriteSheet();
  hadouken1.loadSpriteSheet();
  
}

function draw() {
  background(64, 128, 0);
  char1.move();
  char1.getTime();

  char1.draw();
  char1.animate();
 
  hadouken1.getTime();
  hadouken1.draw();
  hadouken1.animate();
  hadouken1.move();
  hadouken1.checkAlive();
    


  
  
 
}
