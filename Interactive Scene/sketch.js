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
   

   
    this.moveX = random(-5, 5);
    this.moveY = random(-5, 5);
    
   

    this.x+=this.moveX;
    this.y+=this.moveY;

    if (this.x > mouseX - 400 && this.x < mouseX && Math.abs(this.y - mouseY) < 50) this.x -= 5;
    if (this.x < mouseX + 400 && this.x > mouseX && Math.abs(this.y - mouseY) < 50) this.x += 5;
    if (this.y > mouseY - 400 && this.y < mouseY && Math.abs(this.x - mouseX) < 50) this.y -= 5;
    if (this.y < mouseY + 400 && this.y > mouseY && Math.abs(this.x - mouseX) < 50) this.y += 5;
    
    

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

class swatter{

  draw(){
    fill (0);
    rect(mouseX, mouseY, 30, 30);
  }
}


let list = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let flies = 0; flies <= 500; flies++){
    list.push(new fly());
  }
  
  swatter1 = new swatter();
 
}
  
  

function draw() {
  background(220);

  swatter1.draw();

  for (let i = 0; i < list.length; i++){
    list[i].move();
    list[i].display();
  }

  

 
 

}
