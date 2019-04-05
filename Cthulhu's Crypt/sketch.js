// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



class gameMap{
  constructor(){

    this.gameMap = {};

    this.emptyMap = [];
    this.tileSize = 15;
  }

  createMap(size){
    for (let y = 0; y < size; y++){
      this.emptyMap.push([]);
      for (let x = 0; x < size; x++){
        this.emptyMap[y].push(0);
      }
    
    }
    return (this.emptyMap);
  }


  displayMap(map){
    textSize(20);
    fill(255);
    for (let y = 0; y < 50; y++){
      for (let x = 0; x < 50; x++){
        if (map[y][x] === 1) text("#", x*this.tileSize, y*this.tileSize);
        if (map[y][x] === 0) text(".", x*this.tileSize, y*this.tileSize);
        if (map[y][x] === 3) text("@", x*this.tileSize, y*this.tileSize);
      }
    }
  }
  

}

class character{
  constructor(){
    this.x = 25;
    this.y = 48;
    this.avatar = "@";
    this.standingTile = 0;

  }


  draw(map){
    map[this.y][this.x] = 3;
  }

  up(map){
    if (map[this.y-1][this.x] === 0){
      map[this.y][this.x] = this.standingTile;
      this.y--;
      this.standingTile = map[this.y][this.x];
    }
    
  }

  down(map){
    if (map[this.y+1][this.x] === 0){
      map[this.y][this.x] = this.standingTile;
      this.y++;
      this.standingTile = map[this.y][this.x];
    }
    
  }

  left(map){
    if (map[this.y][this.x-1] === 0){
      map[this.y][this.x] = this.standingTile;
      this.x--;
      this.standingTile = map[this.y][this.x];
    }
    
  }

  right(map){
    if (map[this.y][this.x+1] === 0){
      map[this.y][this.x] = this.standingTile;
      this.x++;
      this.standingTile = map[this.y][this.x];
    }
   
  }



}

function preload(){
  map1.gameMap = loadJSON('assets/test.json');
}


function keyPressed(){
  if (keyCode === UP_ARROW) char1.up(map1.gameMap);
  if (keyCode === DOWN_ARROW) char1.down(map1.gameMap);
  if (keyCode === LEFT_ARROW) char1.left(map1.gameMap);
  if (keyCode === RIGHT_ARROW) char1.right(map1.gameMap); 
}



let char1 = new character();
let map1 = new gameMap();

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(0);
  char1.draw(map1.gameMap);
  map1.displayMap(map1.gameMap);
  
}
