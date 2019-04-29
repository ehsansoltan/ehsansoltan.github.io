// Cthulhu's Crypt (ASCII maze game)
// Ehsan Soltan
// April 28, 2019
/*Description: This is a game in which you navigate a maze (by moving with arrow keys) and try to collect as many coins and get back to the exit before your sanity runs out.
it's a little "lackluster" because i spent a good deal of my time trying to write a realistic field of vision algorithm using trigonometry but i could't quite get it working in time (though i got close)
(turn sound on by the way) */
// Extra for Experts: n/a




class gameMap{
  constructor(){


    //declaring some variables for the game map (some of them aren't used because they are variables for features i was which i was messing around with which i will try to add for my final project)
    this.state = "running";
    this.gameMap = {};

    this.emptyMap = [];
    this.tileSize = 12;
    this.mapSize = 50;
    this.coinChance;
    this.randX;
    this.randY;
    this.numberOfCoins = 100;
    this.ray;
    this.slopeToCharacter;
    this.blockVisible;
    this.mapStartLeft = 50;
    this.mapStartTop = 50;
    this.maxVision = 3;

    this.blockToPlayerX;
    this.blocktoPlayerY;

    this.wallLeft;
    this.wallRight;
    this.wallUp;
    this.wallDown;

    this.exitsX = [24, 25];
   
  }


  //sets where the exits of the maze will be
  mapExits(map){
    map[49][this.exitsX[0]] = 5;
    map[49][this.exitsX[1]] = 5;
  }


  //randomly distributes coins into the maze
  makeCoin(){
    for (let i = 0; i < this.numberOfCoins; i++){
      this.randX = Math.floor(random(this.mapSize));
      this.randY = Math.floor(random(this.mapSize));
      if (this.gameMap[this.randY][this.randX] === 0) {this.gameMap[this.randY][this.randX] = 4;}
      else {i--;}
    }
      
  }


//creates an empty map (commented out because i decided to use a hand made map)
/*
  createMap(){
    for (let y = 0; y < this.mapSize; y++){
      this.emptyMap.push([]);
      for (let x = 0; x < this.mapSize; x++){
        this.emptyMap[y].push(0);
       
      }
    
    }
    return this.emptyMap;
  }

 */


 /*
  displayMap(map){//display the entire map (for testing purposes)
    textSize(20);
    fill(255);
    for (let y = 0; y < 50; y++){
      for (let x = 0; x < 50; x++){
        textFont("d");
        if (map[y][x] === 1) {text("#", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 0) {text(".", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 3) {text("@", x*this.tileSize, y*this.tileSize);}
        if (map[y][x] === 5) {text("c", x*this.tileSize, y*this.tileSize);}
      }
    }
  }

*/

  
  displayFOV(map, pX, pY){//display only in player's field of vision


    //these four for loops find out the location of any adjacent walls (so that you can't see past them)
    for (let i = pX; i < 50; i++){
      if (map[pY][i] === 1 || map[pY][i] === 5){
        this.wallRight = i;
        i = 51;
      }
    }

    for (let i = pX; i >= 0; i--){
      if (map[pY][i] === 1 || map[pY][i] === 5){
        this.wallLeft = i;
        i = -1;
      }
    }


    
    for (let i = pY; i < 50; i++){
      if (map[i][pX] === 1 || map[i][pX] === 5){
        this.wallDown = i;
        i = 51;
      }
    }

    for (let i = pY; i >= 0; i--){
      if (map[i][pX] === 1 || map[i][pX] === 5){
        this.wallUp = i;
        i = -1;
      }
    }



    //placing the exits
    this.mapExits(map);


    textSize(20);
    fill(255);

    //cycles through the map array and sees if a block is invisible (if it's past the max range of vision or if past the x or y coordinate of nearby walls)
    for (let y = 0; y < 50; y++){
      for (let x = 0; x < 50; x++){

        this.blockVisible = true;
        this.blockToPlayerX = x - pX;
        this.blocktoPlayerY = pY - y;

        
        
        if (Math.abs(this.blockToPlayerX) > this.maxVision || Math.abs(this.blocktoPlayerY) > this.maxVision) this.blockVisible = false;

       

        

        if (x > this.wallRight || x < this.wallLeft || y < this.wallUp || y > this.wallDown) this.blockVisible = false;


       


        //drawing the ascii graphics
        if (this.blockVisible === true){
          textFont("d");

          if (map[y][x] === 1) {
            fill(120, 80, 30);
            text("#", x*this.tileSize + this.mapStartLeft, y*this.tileSize + this.mapStartTop);}

          if (map[y][x] === 0) {
            fill (150, 150, 150);
            text(".", x*this.tileSize + this.mapStartLeft, y*this.tileSize + this.mapStartTop);}

          if (map[y][x] === 3) {
            fill(255);
            text("@", x*this.tileSize + this.mapStartLeft, y*this.tileSize + this.mapStartTop);}

          if (map[y][x] === 4) {
            fill(255, 178, 4);
            text("c", x*this.tileSize + this.mapStartLeft, y*this.tileSize + this.mapStartTop);}

          if (map[y][x] === 5) {
            fill (255);
            text("E", x*this.tileSize + this.mapStartLeft, y*this.tileSize + this.mapStartTop);}

        }
     
        
      }
    }
  }
  

}


//class for the character
class character{
  constructor(){
    this.x = 25;
    this.y = 48;
    this.avatar = "@";
    this.standingTile = 0;
    this.coinsCollected = 0;
    this.sanity = 450;
    this.sanityLimit = 0;

  }

  //checks if sanity has run out
  checkSanity(map){
    if (this.sanity === 0) map.state = "dead";
  }


  //checks if player steps on exit
  checkExit(map){
    if (this.y === 49 && this.x === map.exitsX[0] || this.y === 49 && this.x === map.exitsX[1]) map.state = "done";
  }



  //places the player into the map
  draw(map){
    map[this.y][this.x] = 3;
  }



  //the next four functions handle movement
  up(map){
    if (map[this.y-1][this.x] !== 1 || map[this.y-1][this.x] === 4){
      map[this.y][this.x] = this.standingTile;
      this.y--;
      this.standingTile = map[this.y][this.x];
      this.sanity--;
    }
    
  }

  down(map){
    if (map[this.y+1][this.x] !== 1 || map[this.y+1][this.x] === 4){
      map[this.y][this.x] = this.standingTile;
      this.y++;
      this.standingTile = map[this.y][this.x];
      this.sanity--;
    }
    
  }

  left(map){
    if (map[this.y][this.x-1] !== 1 || map[this.y][this.x-1] === 4){
      map[this.y][this.x] = this.standingTile;
      this.x--;
      this.standingTile = map[this.y][this.x];
      this.sanity--;
    }
    
  }

  right(map){
    if (map[this.y][this.x+1] !== 1 || map[this.y][this.x+1] === 4){
      map[this.y][this.x] = this.standingTile;
      this.x++;
      this.standingTile = map[this.y][this.x];
      this.sanity--;
    }
   
  }


  //collects a coin if the tile the character is standing on is a coin
  collectCoin(map){
    if (this.standingTile === 4){
      coinSound.play();
      this.standingTile = 0;
      map[this.y][this.x] = 0;
      this.coinsCollected++;
    }
  }


  //draws the player stats
  drawStats(){

    fill(255);
    text("coins: " + this.coinsCollected, 800, 100);
    text("sanity: " + Math.ceil(this.sanity / 450 * 100) + " %", 800, 120);
  }


}


//creating the map object and loading the maze i drew using your conway's game of life program
let map1 = new gameMap();
let music;
let coinSound;
function preload(){
  map1.gameMap = loadJSON("assets/maze.json");
  music = loadSound('assets/music.mp3');
  coinSound = loadSound('assets/coin_sound.mp3');
  
}



//checks if keys are pressed and moves player
function keyPressed(){
  if (keyCode === UP_ARROW) {char1.up(map1.gameMap);}
  if (keyCode === DOWN_ARROW) {char1.down(map1.gameMap);}
  if (keyCode === LEFT_ARROW) {char1.left(map1.gameMap);}
  if (keyCode === RIGHT_ARROW) {char1.right(map1.gameMap);} 
}




let char1 = new character();

function setup() {

  createCanvas(windowWidth, windowHeight);

  //plays the ambient music
  music.setVolume(0.6)
  music.play();



  //distributes the coins
  map1.makeCoin();
}



function draw() {


  //draws map, character etc if the game i running
  if (map1.state === "running"){
    background(0);
  char1.draw(map1.gameMap);
  map1.displayFOV(map1.gameMap, char1.x, char1.y);
  char1.collectCoin(map1.gameMap);
  char1.drawStats();
  char1.checkExit(map1);
  char1.checkSanity(map1);
  
  }

  //displays how many coins collected if player exits the maze
  if (map1.state === "done"){
    background(0);
    fill (255);
    text("You exited the crypt with your gathered plunder.", 400, 270);
    text("total coins collected: " + char1.coinsCollected, 400, 300);
  }


  //death screen if the player's sanity reaches 0
  if (map1.state === "dead"){
    background(0);
    fill (255);
    text("The madness of the crypt overwhelmed your mind and you succumbed to insanity. GAME OVER", 400, 270);
   
  }


  //draws the title
  fill (255);
  text("Cthulhu's Crypt", 300, 30);
  
}
