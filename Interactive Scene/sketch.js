// Fly Swatter (Interactive Scene)
// Ehsan Soltan
// March. 4, 2019
//
// Extra for Experts:
// - I tried to incorporate sound into my program but I could't get it working for some reason. I used classes which we haven't learned yet


//creating a 'fly' class
class fly{
  constructor(){

    //setting random starting positions and random intial movement
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.moveX = random(-5, 5);
    this.moveY = random(-5, 5);
    
  }

  move(){
   

    //constantly giving moveX and moveY new random values from -5 to 5 and changing the x and y coordinates 
    this.moveX = random(-5, 5);
    this.moveY = random(-5, 5);
    this.x+=this.moveX;
    this.y+=this.moveY;


    //moving the fly away when the cursor gets within a distance of 400
    if (this.x > mouseX - 400 && this.x < mouseX && Math.abs(this.y - mouseY) < 50) this.x -= 5;
    if (this.x < mouseX + 400 && this.x > mouseX && Math.abs(this.y - mouseY) < 50) this.x += 5;
    if (this.y > mouseY - 400 && this.y < mouseY && Math.abs(this.x - mouseX) < 50) this.y -= 5;
    if (this.y < mouseY + 400 && this.y > mouseY && Math.abs(this.x - mouseX) < 50) this.y += 5;
    
    
    //moving the fly back within the bounds of the window if it moves out of it
    if (this.x<0) this.x = 0;
    if (this.x>windowWidth) this.x = windowWidth;
    if (this.y<0) this.y = 0;
    if (this.y>windowHeight) this.y = windowHeight;
  }

  //function for displaying the fly (as a black ellipse)
  display(){
    fill (0);
    ellipse(this.x, this.y, 4, 4);
  }

}

//class for the swatter
class swatter{
  constructor(){

    //preloading the image, declaring variables for the bounds of the business end of the swatter
    this.swatterPic = loadImage("assets/swatter.png");
    this.left;
    this.right;
    this.top;
    this.bottom;

  
  }

  //function that updates the position of the swatter based on the mouse position
  updateSwatter(){

    this.left = mouseX-50;
    this.right = mouseX+50;
    this.top = mouseY-50;
    this.bottom = mouseY+50;

    image(this.swatterPic, mouseX-150, mouseY-50, 300, 300);
  }

}


//array that holds all the flies
let list = [];
let deadList = []



//preloading a splat sound (it's commented because its not working for some reason)
/*
function preload(){
  soundFormats('mp3');
  let splat = loadSound("assets/splat.mp3");
}
*/

function setup() {
  
  //hiding the cursor
  noCursor();

  createCanvas(windowWidth, windowHeight);

  //filling my 'list' array with 500 fly objects
  for (let flies = 0; flies <= 500; flies++){
    list.push(new fly());
  }

  //making a swatter object named 'swatter1'
  swatter1 = new swatter();

  
 
}
  
  

function draw() {
  background(220);
  //moving and displaying all the flies and the swatter
  for (let flies = 0; flies < list.length; flies++){
    list[flies].move();
    list[flies].display();
  }

  //drawing all of the fly corpses
  for (let corpse = 0; corpse < deadList.length; corpse+=2){
    fill (150, 150, 50);
    ellipse (deadList[corpse], deadList[corpse+1], 4, 4);
    
  }

  //drawing the swatter
  swatter1.updateSwatter();

  
 

}

//checking to see if any flies have been swatter and adding their coordinates to the dead fly list and then deleting them from the 'list' array
function mousePressed(){
  for (let flies = 0; flies < list.length; flies++){
    if (list[flies].x > swatter1.left && list[flies].x < swatter1.right && list[flies].y > swatter1.top && list[flies].y < swatter1.bottom) {

      deadList.push(list[flies].x, list[flies].y);
      list.splice(flies, 1);

      //playing the splat sound
      //splay.play();

     
    }


  }

}

//resetting everything if the spacebar is pressed
function keyPressed(){
  if (keyCode === 32){
    list = [];
    for (let flies = 0; flies <= 500; flies++){
      list.push(new fly());
    }



  }
}