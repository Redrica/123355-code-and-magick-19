'use strict';

var Cloud = {
  CLOUD_START_X: 100,
  CLOUD_START_Y: 10,
  CLOUD_WIDTH: 420,
  CLOUD_HEIGHT: 270,
  CLOUD_GAP: 10,
  START_STRING: 'Ура, вы победили!',
  INFO_STRING: 'Список результатов:',
  BACKGROUND_COLOR: 'rgb(255, 255, 255)',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  TEXT_COLOR: 'rgb(0, 0, 0)',
  TEXT_START_X: 130,
  TEXT_START_Y: 40,
  TEXT_GAP: 20,
  TEXT_PARAM: '16px PT Mono',
};
var Result = {
  COL_HEIGHT: 150,
  COL_WIDTH: 40,
  COL_GAP: 50,
  COL_START_X: 150,
  COL_START_Y: 75,
  TEXT_GAP_TOP: 20,
  TEXT_GAP_BOTTOM: 10,
  TEXT_COLOR: 'rgb(0, 0, 0)',
  MAIN_COLOR: 'rgba(255, 0, 0, 1)',
  HSL_BASE_HUE: 240,
  HSL_MAX_SATURATION: 100,
  HSL_LIGHTNESS: 50,
  HSL_ALPHA: 1,
  PLAYER_NAME: 'Вы',
};

var BASE_LINE_DEFAULT = 'alphabetic';
var BASE_LINE_HANGING = 'hanging';

// отрисовка прямоугольника по параметрам
var renderRect = function (canvas, x, y, rectWidth, rectHeight, color) {
  canvas.fillStyle = color;
  canvas.fillRect(x, y, rectWidth, rectHeight);
};

// отрисовка текста по параметрам
var renderText = function (canvas, x, y, color, string, fontParam, textBaseline) {
  if (fontParam) {
    canvas.font = fontParam;
  }
  canvas.textBaseline = textBaseline ? textBaseline : BASE_LINE_DEFAULT;
  canvas.fillStyle = color;
  canvas.fillText(string, x, y);
};

// получение рандомного значения цвета в модели HSLA
var getRandomHslaColor = function (h, s, l, a) {
  return 'hsla(' + h + ', ' + Math.floor(Math.random() * 100) * s / 100 + '%, ' + l + '%, ' + a + ')';
};

// получение максимального значения из массива времен игроков
var getMaxElementValue = function (numArray) {
  return numArray.reduce(function (a, b) {
    return Math.max(a, b);
  });
};

var getRectStartX = function (x, graphWidth, graphGap, index) {
  return x + (graphWidth + graphGap) * index;
};

// получение высоты колонки графика в зависимости от максимального параметра
var getRectHeight = function (num, maxValue) {
  return Math.ceil(num * Result.COL_HEIGHT / maxValue);
};

var getRectColor = function (name) {
  if (name === Result.PLAYER_NAME) {
    return Result.MAIN_COLOR;
  }
  return getRandomHslaColor(Result.HSL_BASE_HUE, Result.HSL_MAX_SATURATION, Result.HSL_LIGHTNESS, Result.HSL_ALPHA);
};

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, Cloud.CLOUD_START_X + Cloud.CLOUD_GAP, Cloud.CLOUD_START_Y + Cloud.CLOUD_GAP, Cloud.CLOUD_WIDTH, Cloud.CLOUD_HEIGHT, Cloud.SHADOW_COLOR);
  renderRect(ctx, Cloud.CLOUD_START_X, Cloud.CLOUD_START_Y, Cloud.CLOUD_WIDTH, Cloud.CLOUD_HEIGHT, Cloud.BACKGROUND_COLOR);
  renderText(ctx, Cloud.TEXT_START_X, Cloud.TEXT_START_Y, Cloud.TEXT_COLOR, Cloud.START_STRING, Cloud.TEXT_PARAM, false);
  renderText(ctx, Cloud.TEXT_START_X, Cloud.TEXT_START_Y + Cloud.TEXT_GAP, Cloud.TEXT_COLOR, Cloud.INFO_STRING, Cloud.TEXT_PARAM, false);

  var maxTimeValue = getMaxElementValue(times);

  // функция рисования элемента гистограммы
  var drawGraph = function (startX, score, name) {
    var columnHeight = getRectHeight(score, maxTimeValue);
    var startY = Result.COL_HEIGHT - columnHeight + Result.COL_START_Y;
    var numString = Math.ceil(score);
    var currentColor = getRectColor(name);
    renderText(ctx, startX, startY, Result.TEXT_COLOR, numString, null, BASE_LINE_HANGING);
    renderRect(ctx, startX, startY + Result.TEXT_GAP_TOP, Result.COL_WIDTH, columnHeight, currentColor);
    renderText(ctx, startX, startY + Result.TEXT_GAP_TOP + columnHeight + Result.TEXT_GAP_BOTTOM, Result.TEXT_COLOR, name, null, BASE_LINE_HANGING);
  };

  // рисуем гистограмму в цикле по входящему массиву игроков
  for (var i = 0; i < times.length; i++) {
    drawGraph(getRectStartX(Result.COL_START_X, Result.COL_WIDTH, Result.COL_GAP, i), times[i], names[i]);
  }
};
