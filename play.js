// Add click event to the canvas
let canvas = document.getElementById('tutorial');
canvas.addEventListener('click', function(env) {
  if (gameOver || gDraw) {
    canvas.removeEventListener('click', arguments.callee, false);
  } else {
    drawChar(env);
  } 
}, false);

let winningStroke = '';
const playerX = 'X';
const playerO = 'O';
let winner = 0;

var gameOver = false;
var gDraw = false;

let sqClicked = [0,0,0,0,0,0,0,0,0];
// the center position of the box clicked
let pos = {
  x: 0,
  y: 0
}
let isX = true;
let sqBlank = true;

// Board Click Event runs drawChar
function drawChar(env) {

  var mousePos = getMousePos(env);
  sqBlank = sqLocation(mousePos);
  if (sqBlank) {
    drawXorO(pos);
  } else {
    console.log("Square taken, try again");
  }

  if (gameWin()) {
    drawWinningStroke();
    var player = (winner === 1) ? playerX : playerO;
    console.log("Game win by: " + player);
  } else if (gameDraw()) {
    console.log("Game was a draw");
  }
}

function drawWinningStroke() {

  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#ff0000';

  switch (winningStroke) {
    case 'topH':
      ctx.moveTo(0, 25);
      ctx.lineTo(150, 25);
      ctx.stroke();
    break;
    case 'midH' :
      ctx.moveTo(0, 75);
      ctx.lineTo(150, 75);
      ctx.stroke();
    break;
    case 'btmH' :
      ctx.moveTo(0, 125);
      ctx.lineTo(150, 125);
      ctx.stroke();
    break;
    case 'leftDia' :
      ctx.moveTo(15, 15);
      ctx.lineTo(135, 135);
      ctx.stroke();
    break;
    case 'rightDia' :
      ctx.moveTo(135, 15);
      ctx.lineTo(15, 135);
      ctx.stroke();
    break;
    case 'leftV' :
      ctx.moveTo(25, 0);
      ctx.lineTo(25, 150);
      ctx.stroke();
    break;
    case 'middleV' :
      ctx.moveTo(75, 0);
      ctx.lineTo(75, 150);
      ctx.stroke();
    break;
    case 'rightV' :
      ctx.moveTo(125, 0);
      ctx.lineTo(125, 150);
      ctx.stroke();
    break;
  }
}
function gameDraw() {

  gDraw = true;

  for (var i = 0; i < 9; i++) {
    if (sqClicked[i] == 0) gDraw = false;
  }
  return gDraw;
}

function gameWin() {
  // Check for winner
  gameOver = false;

  for (var i = 1; i <= 2; i++) {
    winner = i;
    gameOver = sqClicked[0] == i && sqClicked[1] == i && sqClicked[2] == i;
    winningStroke = 'topH';
    if (gameOver) return true;
    gameOver = sqClicked[3] == i && sqClicked[4] == i && sqClicked[5] == i;
    winningStroke = 'midH';
    if (gameOver) return true;
    gameOver = sqClicked[6] == i && sqClicked[7] == i && sqClicked[8] == i;
    winningStroke = 'btmH';
    if (gameOver) return true;
    gameOver = sqClicked[0] == i && sqClicked[4] == i && sqClicked[8] == i;
    winningStroke = 'leftDia';
    if (gameOver) return true;
    gameOver = sqClicked[2] == i && sqClicked[4] == i && sqClicked[6] == i;
    winningStroke = 'rightDia';
    if (gameOver) return true;
    gameOver = sqClicked[0] == i && sqClicked[3] == i && sqClicked[6] == i;
    winningStroke = 'leftV';
    if (gameOver) return true;
    gameOver = sqClicked[1] == i && sqClicked[4] == i && sqClicked[7] == i;
    winningStroke = 'middleV';
    if (gameOver) return true;
    gameOver = sqClicked[2] == i && sqClicked[5] == i && sqClicked[8] == i;
    winningStroke = 'rightV';
    if (gameOver) return true;
  }

  return gameOver;
}

function drawXorO() {

  // arc(x, y, radius, startAngle, endAngle, anticlockwise)
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    isX = !isX;
    if (isX) {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2, true); // Outer circle
      ctx.stroke();
    } else {
      // Draw X
      ctx.beginPath();
      ctx.moveTo(pos.x -10, pos.y -10);
      ctx.lineTo(pos.x + 10, pos.y + 10);
      ctx.moveTo(pos.x +10, pos.y -10);
      ctx.lineTo(pos.x -10, pos.y +10);
      ctx.stroke();
    }
  }
}

// Return the x/y coordinates of the mouse click
function getMousePos(env) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: env.clientX - rect.left,
    y: env.clientY - rect.top
  }
}

function sqLocation(s) {
  // check which square clicked and return it's center 
  
  if(s.x >= 0 && s.x <= 50 && s.y >= 0 && s.y <= 50) {
    pos.x = 25;
    pos.y = 25;
    if (sqClicked[0] == 1 || sqClicked[0] == 2 ) {
      return false;
    } else {
      isX ? sqClicked[0] = 1 : sqClicked[0] = 2;
      return true;
    }
  }
  if(s.x >= 50 && s.x <= 100 && s.y >= 0 && s.y <= 50) {
    pos.x = 75;
    pos.y = 25;
    if (sqClicked[1] == 1 || sqClicked[1] == 2) {
      return false;
    } else {
      isX ? sqClicked[1] = 1 : sqClicked[1] = 2;
      return true;
    }
  }
  if(s.x >= 100 && s.x <= 150 && s.y >= 0 && s.y <= 50) {
    pos.x = 125;
    pos.y = 25;
    if (sqClicked[2] == 1 || sqClicked[2] == 2) {
      return false;
    } else {
      isX ? sqClicked[2] = 1 : sqClicked[2] = 2;
      return true;
    }
  }
  if(s.x >= 0 && s.x <= 50 && s.y >= 50 && s.y <= 100) {
    pos.x = 25;
    pos.y = 75;
    if (sqClicked[3] == 1 || sqClicked[3] == 2) {
      return false;
    } else {
      isX ? sqClicked[3] = 1 : sqClicked[3] = 2;
      return true;
    }
  }
  if(s.x >= 50 && s.x <= 100 && s.y >= 50 && s.y <= 100) {
    pos.x = 75;
    pos.y = 75;
    if (sqClicked[4] == 1 || sqClicked[4] == 2) {
      return false;
    } else {
      isX ? sqClicked[4] = 1 : sqClicked[4] = 2;
      return true;
    }
  }
  if(s.x >= 100 && s.x <= 150 && s.y >= 50 && s.y <= 100) {
    pos.x = 125;
    pos.y = 75;
    if (sqClicked[5] == 1 || sqClicked[5] == 2) {
      return false;
    } else {
      isX ? sqClicked[5] = 1 : sqClicked[5] = 2;
      return true;
    }
  }
  if(s.x >= 0 && s.x <= 50 && s.y >= 100 && s.y <= 150) {
    pos.x = 25;
    pos.y = 125;
    if (sqClicked[6] == 1 || sqClicked[6] == 2) {
      return false;
    } else {
      isX ? sqClicked[6] = 1 : sqClicked[6] = 2;
      return true;
    }
  }
  if(s.x >= 50 && s.x <= 100 && s.y >= 100 && s.y <= 150) {
    pos.x = 75;
    pos.y = 125;
    if (sqClicked[7] == 1 || sqClicked[7] == 2) {
      return false;
    } else {
      isX ? sqClicked[7] = 1 : sqClicked[7] = 2;
      return true;
    }
  }
  if(s.x >= 100 && s.x <= 150 && s.y >= 100 && s.y <= 150) {
    pos.x = 125;
    pos.y = 125;
    if (sqClicked[8] == 1 || sqClicked[8] == 2) {
      return false;
    } else {
      isX ? sqClicked[8] = 1 : sqClicked[8] = 2;
      return true;
    }
  }

}

function drawBoard() {
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
    }
    ctx.clearRect(0,0,150,150);
    ctx.moveTo(0,50);
    ctx.lineTo(150,50);
    ctx.moveTo(0, 100);
    ctx.lineTo(150, 100);
    ctx.moveTo(50, 0);
    ctx.lineTo(50, 150);
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 150);
    ctx.lineWidth=0.5;
    ctx.stroke();  
  }
  
  function newGame() {
    drawBoard();
    initClickedSquares();
  }

  function initClickedSquares() {
    // Set clicked squares back to 0
    for (let i = 0; i < 9; i++) {
      sqClicked[i] = 0;
    }
  }

// Initialise new Game
newGame();
    
