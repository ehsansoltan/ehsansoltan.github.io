// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class character{
  constructor(){
    this.location = createVector(100, 100);
    this.dest = createVector(mouseX, mouseY);
    this.distanceX;
    this.distanceY;


    this.moveX = 0;
    this.moveY = 0;
    this.mSpeed = 5;

  

    this.state = "still";

  }

  draw(){
    rect (this.location.x, this.location.y, 50, 50);
  }

  move(){
    //if (this.state === "moving"){
      
    //}
    
    
  }
 
 
}


function mousePressed(){
  char1.state = "moving";
  char1.dest = (mouseX, mouseY);

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
