// Default values, changed in the rescale function
let gameWidth = 10;
let gameHeight = 10;
let canvasWith = 500;
let canvasHeight = 500;
let gameOver = false;
let margin = 10;

let bal = {
  x: 0,
  y: 0,
  moving: false
}

let cursor = {
  x: 0,
  y: 0
}

let doel = {
  x: 0,
  y: 0
}

let distraction = {
  x: 0,
  y: 0
}

function startGame(){
  document.addEventListener('keydown', checkKey);
  gameOver = false;
  let rX = chance.integer({min: 0, max: gameWidth - 1});
  let rY = chance.integer({min: 0, max: gameHeight - 1});
  bal.x = rX;
  bal.y = rY;
  bal.moving = false;
  //Generate different random number pair
  while (bal.x == rX && bal.y == rY){
    rX = chance.integer({min: 0, max: gameWidth - 1});
    rY = chance.integer({min: 0, max: gameHeight - 1});
  }
  doel.x = rX;
  doel.y = rY;
  //Generate different random number pair
  while ((bal.x == rX && bal.y == rY) || (doel.x == rX && doel.y == rY) ){
    rX = chance.integer({min: 0, max: gameWidth - 1});
    rY = chance.integer({min: 0, max: gameHeight - 1});
  }
  distraction.x = rX;
  distraction.y = rY;
  drawGame();
}

function grab(){
  if (cursor.x == bal.x && cursor.y == bal.y){
    bal.moving = true;
  }
}
function drop(){
  if (cursor.x == bal.x && cursor.y == bal.y){
    bal.moving = false;
  }
}

function select(){
  if (cursor.x == bal.x && cursor.y == bal.y){
    bal.moving = !bal.moving;
  }
}

function moveBalTo(x, y){
  bal.x = x;
  bal.y = y;
  if (bal.x == doel.x && bal.y == doel.y){
    gameOver = true;
  }
}

function moveCursor(xOffset, yOffset){
  cursor.x = (((cursor.x + xOffset) % gameWidth) + gameWidth) % gameWidth;
  cursor.y = (((cursor.y + yOffset) % gameHeight) + gameHeight) % gameHeight;
  if (bal.moving){
    moveBalTo(cursor.x, cursor.y);
  }
}


function checkKey(e) {
    var event = window.event ? window.event : e;
    if (!gameOver){
      if (event.keyCode == 37){
        // left
        moveCursor(-1, 0);
      } else if (event.keyCode == 38){
        // up
        moveCursor(0, -1);
      } else if (event.keyCode == 39){
        // right
        moveCursor(1, 0);
      } else if (event.keyCode == 40){
        // down
        moveCursor(0, 1);
      } else if (event.keyCode == 65){
        // a key
        grab();
      } else if (event.keyCode == 66){
        // a key
        drop();
      }
    }
    drawGame();
}

function up(){
  moveCursor(-1, 0);
  drawGame();
}
function right(){
  moveCursor(0, -1);
  drawGame();
}
function down(){
  moveCursor(1, 0);
  drawGame();
}
function left(){
  moveCursor(0, 1);
  drawGame();
}
function grabControl(){
  grab();
  drawGame();
}
function dropControl(){
  drop();
  drawGame();
}

function drawGame(){
  rescale(window.innerWidth, window.innerHeight);
  let gameCanvas = document.getElementById("gameCanvas");
  let ctx = gameCanvas.getContext("2d");

  // clear canvas
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  let rowHeight = canvasHeight/gameHeight;
  let rowWidth = canvasWith/gameWidth;

  // Draw game grid
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'black';
  ctx.beginPath();
  for (let i = 1 ; i < rowHeight ; i++){
    ctx.moveTo(0, i * rowHeight);
    ctx.lineTo(canvasWith, i * rowHeight);
  }
  for (let i = 1 ; i < rowWidth ; i++){
    ctx.moveTo(i * rowWidth, 0);
    ctx.lineTo(i * rowWidth, canvasHeight);
  }
  ctx.stroke();

  // Draw cursor
  ctx.beginPath();
  ctx.arc(cursor.x * rowWidth + rowWidth/2, cursor.y * rowHeight + rowHeight/2, rowHeight/7*3, 0, 2 * Math.PI);
  ctx.stroke();

  // Draw ball
  ctx.beginPath();
  ctx.arc(bal.x * rowWidth + rowWidth/2, bal.y * rowHeight + rowHeight/2, rowHeight/8*3, 0, 2 * Math.PI, false);
  ctx.fillStyle = 'green';
  ctx.fill();
  ctx.lineWidth = 0;
  ctx.strokeStyle = 'green';
  ctx.stroke();

  // draw goal
  ctx.fillStyle = 'green';
  ctx.fillRect(doel.x * rowWidth + rowWidth/8, doel.y * rowHeight + rowHeight/8, rowWidth/8*6, rowHeight/8*6);

  // draw distraction
  ctx.fillStyle = 'blue';
  ctx.fillRect(distraction.x * rowWidth + rowWidth/8, distraction.y * rowHeight + rowHeight/8, rowWidth/8*6, rowHeight/8*6);

  // Game over?
  if (gameOver){
    ctx.font = "30px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText("Goal Reached", canvasWith/2 - 100, canvasHeight/2);
  }
}

function rescale(width, height){
  let buttonHeight = height*0.1;
  let gameHeight = height*0.9;
  canvasWith = Math.floor(width/10)*10  - margin;
  canvasHeight = Math.floor(gameHeight/10)*10; 
  if (canvasWith < canvasHeight){
    canvasHeight = canvasWith;
  }else{
    canvasWith = canvasHeight;
  }
  let canvas = document.getElementById("gameCanvas");
  canvas.width = canvasWith;
  canvas.height = canvasHeight;  

  let buttons = document.getElementsByClassName("controlbutton");
  Array.from(buttons).forEach(button => {
    button.style.fontSize = buttonHeight/2 + "px";
  });
  let gameContainerElement = document.getElementById("gameContainer");
  gameContainerElement.style.width = canvasWith + "px";
}

window.addEventListener("resize", function(){
  drawGame();
});

window.addEventListener("load", function(){
  startGame();
});