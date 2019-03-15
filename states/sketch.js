// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



class character{
  constructor(){
    this.charX = 200;
    this.frameHeight = 112;
    this.frameWidth = 79;
    this.currentFrameX = 0;
    this.currentFrameY = 0;
    this.spriteSheet;
    this.currentFrame = 1;
  }

  loadSpriteSheet(){
      this.spriteSheet = loadImage('assets/sprites.jpg');
  }
  draw(){
      image(this.spriteSheet, 0, 0, 118.5, 168, this.currentFrameX, this.currentFrameY, this.frameWidth, this.frameHeight);
  }

  animate(){
    

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
  setInterval(function(){
      char1.currentFrameX += char1.frameWidth;
      char1.currentFrame++;
      if (char1.currentFrame === frameWidth*)

  }, 300);
 
}
