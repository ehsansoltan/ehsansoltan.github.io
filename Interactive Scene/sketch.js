// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class fly{
  constructor(){
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.moveX = random(-1, 1);
    this.moveY = random(-1, 1);
    this.moveChange = 0;
}

  move(){
    this.x+=random(-3, 3);
    this.y+=random(-3, 3);

    if (this.x<0) this.x = 0;
    if (this.x>windowWidth) this.x = windowWidth;

    if (this.y<0) this.y = 0;
    if (this.y>windowHeight) this.y = windowHeight;
  }

  display (){
    fill (200);
    ellipse(this.x, this.y, 4, 4);
  }

}

class populator{
    constructor(amount){
    let flyList = [];

    for (let counter = 0; counter < amount; counter++){
      flyList += counter;
    }


    }

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  fly1 = new fly();
}

function draw() {
  background(220);
  fly1.move();
  fly1.display();


}
