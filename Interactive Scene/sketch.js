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
    this.moveX = random(-5, 5);
    this.moveY = random(-5, 5);
    this.moveChange = 0;
  }

  move(){
    this.moveChange = random(1, 3);

    if (this.moveChange == 2){
      this.moveX = random(-5, 5);
      this.moveY = random(-5, 5);
    }
   

    this.x+=this.moveX;
    this.y+=this.moveY;
  
    
    

    if (this.x<0) this.x = 0;
    if (this.x>windowWidth) this.x = windowWidth;

    if (this.y<0) this.y = 0;
    if (this.y>windowHeight) this.y = windowHeight;
  }

  display(){
    fill (0);
    ellipse(this.x, this.y, 4, 4);
  }

}

class swarm{
  constructor(){
    this.flyList = [];
    
  }

  getList(){
    for (let counter = 0; counter < 10; counter++){
      this.flyList.push(new fly());
    }
  }

  drawSwarm(){
    for (let i = 0; i < this.flyList.length; i++){
      this.flyList[i].move();
      this.flyLIst[i].display();
    }
  }


    

}


let list = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let flies = 0; flies <= 200; flies++){
    list.push(new fly());
  }
 
 
}
  
  

function draw() {
  background(220);

  for (let i = 0; i < list.length; i++){
    list[i].move();
    list[i].display();
  }


 
 

}
