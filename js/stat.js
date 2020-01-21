'use strict';

var parentEl = document.querySelector('.demo');
var canvas = document.createElement('canvas');
parentEl.appendChild(canvas);

var ctx = canvas.getContext('2d');
canvas.style.position = 'absolute';
canvas.style.left = '250px';
canvas.style.zIndex = 100;
canvas.style.border = '1px solid blue';
canvas.setAttribute('width', 500);
canvas.setAttribute('height', 300);

window.renderStatistics = function (ctx) {
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(100, 10, 420, 270);


  ctx.arcTo(60, 40, 370, 40, 500)

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';
  ctx.moveTo(25,  20);
  ctx.lineTo(80, 50);
  ctx.bezierCurveTo(130, -5, 370, -5, 400, 40)
  ctx.lineTo(440, 20);
  ctx.lineTo(430, 50);
  ctx.bezierCurveTo(410, 200, 50, 200, 60, 70)

  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(110, 125);
  ctx.bezierCurveTo(160, 44, 328, 37, 397, 116);
  ctx.stroke();

  // kitten
  ctx.beginPath();
  ctx.moveTo(124, 168);
  ctx.bezierCurveTo(92, 165, 113, 81, 106, 57);
  ctx.bezierCurveTo(149, 58, 180, 96, 200, 134);
  ctx.bezierCurveTo(270, 85, 345, 127, 357, 147);
  ctx.bezierCurveTo(360, 101, 405, 94, 437, 45);
  ctx.bezierCurveTo(436, 97, 457, 165, 415, 189);
  ctx.bezierCurveTo(498, 456, 14, 423, 125, 175);
  ctx.stroke();

};

window.renderStatistics(ctx);
