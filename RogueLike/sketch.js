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
    this.mapTileSize = 10;
    this.textSize = 25;

    this.currentRoomWidth;
    this.currentRoomHeight;
    this.maxRoomSize = 10;

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
}

function draw() {
  background(220);
 
  map1.drawMap(map1.mapSize);

}
