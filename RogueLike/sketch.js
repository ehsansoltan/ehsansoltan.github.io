// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class map{
  constructor(){
    this.map = [];
    this.mapSize = 50;
    this.mapTileSize = 13;
    this.textSize = 25;

    this.currentRoomWidth;
    this.currentRoomHeight;
    this.maxRoomSize = 10;

    this.corridorX;
    this.corridorY;
    this.corridorDirection;
    this.corridorLength;
    this.roomEdge = false;
    this.corridorXChange = 0;
    this.corridorYChange = 0;
    this.maxCorridorLength = 25;
    this.minCorridorLength = 15;
    


  }

  //fills empty map with wall ("#");
  createEmptyMap(size){
    for (let columns = 0; columns < size; columns++){
      this.map.push([]);
      for (let rows = 0; rows < size; rows++){
        this.map[columns].push("#");
      }
    }
  }

  //places the "seed room" into map, which will be used as a base to draw the other rooms
  placeSeedRoom(x, y){
    this.currentRoomWidth = random(2, this.maxRoomSize);
    this.currentRoomHeight = random(2, this.maxRoomSize);

    for (let yPos = y; yPos < y + this.currentRoomHeight; yPos++){
      for (let xPos = x; xPos < x + this.currentRoomWidth; xPos++){
        this.map[yPos][xPos] = ".";
      }

    }
  }

  //picks a random corridor spot in which a corridor will branch out from
  findCorridorSpot(){

    this.corridorXChange = 0;
    this.corridorYChange = 0;
    this.roomEdge = false;

    while (this.roomEdge === false){
      this.corridorX = Math.floor(random(1, this.mapSize - 1));
      this.corridorY = Math.floor(random(1, this.mapSize - 1));

      if (this.map[this.corridorY][this.corridorX] === "#"){

        if (this.map[this.corridorY + 1][this.corridorX] === "."){
          this.corridorDirection = "up";
          this.corridorYChange = -1;
          this.roomEdge = true;
        }

        else if (this.map[this.corridorY - 1][this.corridorX] === "."){
          this.corridorDirection = "down";
          this.corridorYChange = 1;
          this.roomEdge = true;
        }

        else if (this.map[this.corridorY][this.corridorX + 1] === "."){
          this.corridorDirection = "left";
          this.corridorXChange = -1;
          this.roomEdge = true;
        }

        else if (this.map[this.corridorY][this.corridorX - 1] === "."){
          this.corridorDirection = "right";
          this.corridorXChange = 1;
          this.roomEdge = true;
        }


      }
    }
  }


  addCorridor(){
    this.corridorLength = random(this.minCorridorLength, this.maxCorridorLength);

    while (this.corridorLength > 0 && this.corridorX + this.corridorXChange > 0 && this.corridorX + this.corridorXChange < this.mapSize && this.corridorY + this.corridorYChange > 0 && this.corridorY + this.corridorYChange < this.mapSize && this.corridorLength < this.maxCorridorLength){

      //end corridor if it intersects an existing corridor
      if (this.map[this.corridorY][this.corridorX] === ".") this.corridorLength = 0;
      
      this.map[this.corridorY][this.corridorX] = ".";
      this.corridorY += this.corridorYChange;
      this.corridorX += this.corridorXChange;
      this.corridorLength--;
    }

  }

  addCorridors(iterations){
    for (let i = 0; i < iterations; i++){
      this.findCorridorSpot();
      this.addCorridor();
    }

  }

  //draws the map
  drawMap(size){
    textSize(this.textSize);
    for (let y = 0; y < size; y++){
      for (let x = 0; x < size; x++){
        text(this.map[y][x], x * this.mapTileSize, y * this.mapTileSize);
      }
    }
  }

}



let map1;
function setup() {
  createCanvas(windowWidth, windowHeight);
  map1 = new map();
  map1.createEmptyMap(map1.mapSize);
  map1.placeSeedRoom(25, 25);
  map1.addCorridors(10);
}

function draw() {
  background(220);
 
  map1.drawMap(map1.mapSize);
  

}
