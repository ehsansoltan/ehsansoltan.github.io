// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class character{
  constructor(){
    this.x = 100;
    this.y = 100;
    this.destX;
    this.destY;
    this.distanceX;
    this.distanceY;


    this.moveX = 0;
    this.moveY = 0;
    this.mSpeed = 5;

  

    this.state = "still";

  }

  draw(){
    rect (this.x, this.y, 50, 50);
  }

  move(){
    if (this.state === "moving"){
      if (this.x < this.destX) this.x += this.mSpeed;
      if (this.x > this.destX) this.x -= this.mSpeed;

      if (this.y < this.destY) this.y += this.mSpeed;
      if (this.y > this.destY) this.y -= this.mSpeed;
    }
    
    
  }
 
 
}


function mousePressed(){
  char1.state = "moving";
  char1.destX = mouseX;
  char1.destY = mouseY;

  }



let char1 = new character();
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  char1.draw();
  char1.move();
}
