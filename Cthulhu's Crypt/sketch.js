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
    this.mapSize = 50;
    this.coinChance;
    this.randX;
    this.randY;
    this.numberOfCoins = 100;
    this.ray;
    this.slopeToCharacter;
    this.blockVisible;

    this.blockToPlayerX;
    this.blocktoPlayerY;

    this.wallLeft;
    this.wallRight;
    this.wallUp;
    this.wallDown;
   
  }

  makeCoin(){


    for (let i = 0; i < this.numberOfCoins; i++){
      this.randX = Math.floor(random(this.mapSize));
      this.randY = Math.floor(random(this.mapSize));
      if (this.gameMap[this.randY][this.randX] === 0) {this.gameMap[this.randY][this.randX] = 4;}
      else {i--;}
    }
      
  }

  createMap(){
    for (let y = 0; y < this.mapSize; y++){
      this.emptyMap.push([]);
      for (let x = 0; x < this.mapSize; x++){
        this.emptyMap[y].push(0);
       
      }
    
    }
    return this.emptyMap;
  }

 


  displayMap(map){//display the entire map
    textSize(20);
    fill(255);
    for (let y = 0; y < 50; y++){
      for (let x = 0; x < 50; x++){
        textFont("d");
        if (map[y][x] === 1) {text("#", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 0) {text(".", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 3) {text("@", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 4) {text("c", x*this.tileSize, y*this.tileSize);}
      }
    }
  }



  
  displayFOV(map, pX, pY){//display only in player's field of vision

    for (let i = pX; i < 50; i++){
      if (map[pY][i] === 1){
        this.wallRight = i;
        i = 51;
      }
    }

  




    textSize(20);
    fill(255);
    for (let y = 0; y < 50; y++){
      for (let x = 0; x < 50; x++){

        this.blockVisible = true;
        this.blockToPlayerX = x - pX;
        this.blocktoPlayerY = pY - y;

        this.slopeToCharacter = this.blocktoPlayerY/this.blocktoPlayerX;
        
        if (Math.abs(this.blockToPlayerX) > 10 || Math.abs(this.blocktoPlayerY) > 10) this.blockVisible = false;

       

        

        if (x > this.wallRight) this.blockVisible = false;
       

        if (this.blockVisible === true){
          textFont("d");
          if (map[y][x] === 1) {text("#", x*this.tileSize, y*this.tileSize);}
          if (map[y][x] === 0) {text(".", x*this.tileSize, y*this.tileSize);}
          if (map[y][x] === 3) {text("@", x*this.tileSize, y*this.tileSize);}
          if (map[y][x] === 4) {text("c", x*this.tileSize, y*this.tileSize);}
        }
        /*textFont("d");
        if (map[y][x] === 1) {text("#", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 0) {text(".", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 3) {text("@", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 4) {text("c", x*this.tileSize, y*this.tileSize);}*/
        
      }
    }
  }
  

}

class character{
  constructor(){
    this.x = 40;
    this.y = 20;
    this.avatar = "@";
    this.standingTile = 0;
    this.coinsCollected = 0;

  }


  draw(map){
    map[this.y][this.x] = 3;
  }

  up(map){
    if (map[this.y-1][this.x] === 0 || map[this.y-1][this.x] === 4){
      map[this.y][this.x] = this.standingTile;
      this.y--;
      this.standingTile = map[this.y][this.x];
    }
    
  }

  down(map){
    if (map[this.y+1][this.x] === 0 || map[this.y+1][this.x] === 4){
      map[this.y][this.x] = this.standingTile;
      this.y++;
      this.standingTile = map[this.y][this.x];
    }
    
  }

  left(map){
    if (map[this.y][this.x-1] === 0 || map[this.y][this.x-1] === 4){
      map[this.y][this.x] = this.standingTile;
      this.x--;
      this.standingTile = map[this.y][this.x];
    }
    
  }

  right(map){
    if (map[this.y][this.x+1] === 0 || map[this.y][this.x+1] === 4){
      map[this.y][this.x] = this.standingTile;
      this.x++;
      this.standingTile = map[this.y][this.x];
    }
   
  }

  collectCoin(map){
    if (this.standingTile === 4){
      this.standingTile = 0;
      map[this.y][this.x] = 0;
      this.coinsCollected++;
    }
  }

  drawStats(){
    text("coins: " + this.coinsCollected, 800, 100);
  }


}

let map1 = new gameMap();
function preload(){
  map1.gameMap = loadJSON("assets/test2.json");
  
}


function keyPressed(){
  if (keyCode === UP_ARROW) {char1.up(map1.gameMap);}
  if (keyCode === DOWN_ARROW) {char1.down(map1.gameMap);}
  if (keyCode === LEFT_ARROW) {char1.left(map1.gameMap);}
  if (keyCode === RIGHT_ARROW) {char1.right(map1.gameMap);} 
}



let char1 = new character();


function setup() {
  createCanvas(windowWidth, windowHeight);
  map1.makeCoin();
}

function draw() {
  background(0);
  char1.draw(map1.gameMap);
  map1.displayFOV(map1.gameMap, char1.x, char1.y);
  char1.collectCoin(map1.gameMap);
  char1.drawStats();
  
}
