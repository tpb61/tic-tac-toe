function drawBoard() {
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
    }
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
  
  drawBoard();