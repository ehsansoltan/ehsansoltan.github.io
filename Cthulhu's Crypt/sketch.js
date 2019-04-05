// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




function createMap(size){
  let emptyMap = [];
  for (let y = 0; y < size; y++){
    emptyMap.push([]);
    for (let x = 0; x < size; x++){
      emptyMap[y].push(0);
    }
  
  }
  return (emptyMap);
}

function displayMap(map){
  textSize(20);
  fill(255);
  for (let y = 0; y < 50; y++){
    for (let x = 0; x < 50; x++){
      if (map[y][x] === 1) text("#", x*tileSize, y*tileSize);
    }
  }
}


function preload(){
  gameMap = loadJSON('assets/a.json');
}


let gameMap = {};
let tileSize;
function setup() {
  createCanvas(windowWidth, windowHeight);

  tileSize = 15;
}

function draw() {
  background(0);
  displayMap(gameMap);
}
