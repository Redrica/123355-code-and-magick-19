'use strict';

var Dimension = {
    CLOUD_START_X: 100,
    CLOUD_START_Y: 10,
    CLOUD_WIDTH: 420,
    CLOUD_HEIGHT: 270,
    CLOUD_GAP: 10,
    COL_HEIGHT: 150,
    COL_WIDTH: 40,
    COL_GAP: 50,
    COL_START_X: 150,
    COL_START_Y: 75,
    TEXT_START_X: 130,
    TEXT_START_Y: 40,
    TEXT_GAP_TOP: 20,
    TEXT_GAP_BOTTOM: 30,
  },

  Text = {
    START_STRING: 'Ура, вы победили!',
    INFO_STRING: 'Список результатов:',
  },

  Color = {
    CANVAS: 'rgb(255, 255, 255)',
    TEXT: 'rgb(0, 0, 0)',
    SHADOW: 'rgba(0, 0, 0, 0.7)',
    MAIN: 'rgba(255, 0, 0, 1)',
  },

  TEXT_PARAM = '16px PT Mono',
  HSL_BASE_HUE = 240,
  HSL_MAX_SATURATION = 100,
  HSL_LIGHTNESS = 50,
  HSL_ALPHA = 1;

// отрисовка прямоугольника по параметрам
var renderCloud = function (canvas, x, y, color) {
  canvas.fillStyle = color;
  canvas.fillRect(x, y, Dimension.CLOUD_WIDTH, Dimension.CLOUD_HEIGHT);
};

// отрисовка текста по параметрам
var renderText = function (canvas, string, x, y, color, fontParam) {
  canvas.font = fontParam;
  canvas.fillStyle = color;
  canvas.fillText(string, x, y);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, Dimension.CLOUD_START_X + Dimension.CLOUD_GAP, Dimension.CLOUD_START_Y + Dimension.CLOUD_GAP, Color.SHADOW);
  renderCloud(ctx, Dimension.CLOUD_START_X, Dimension.CLOUD_START_Y, Color.CANVAS);
  renderText(ctx, Text.START_STRING, Dimension.TEXT_START_X, Dimension.TEXT_START_Y, Color.TEXT, TEXT_PARAM);
  renderText(ctx, Text.INFO_STRING, Dimension.TEXT_START_X, Dimension.TEXT_START_Y + Dimension.TEXT_GAP_TOP, Color.TEXT, TEXT_PARAM);

  // получение рандомного значения цвета в модели HSLA
  var getRandomHslaColor = function (h, s, l, a) {
    return 'hsla(' + h + ', ' + Math.floor(Math.random() * 100) * s / 100 + '%, ' + l + '%, ' + a + ')';
  };

  // получение максимального значения из массива времен игроков
  var getMaxElementValue = function (numArray) {
    var sortedArray = numArray.slice().sort(function (a, b) {
      return b - a;
    });
    return sortedArray[0];
  };

  var maxTimeValue = getMaxElementValue(times);
  // получение максимальной высоты колонки по массиву времен игроков
  var getColumnHeight = function (num) {
    return Math.ceil(num * Dimension.COL_HEIGHT / maxTimeValue);
  };

  // функция рисования элемента гистограммы
  var drawGraph = function (x, y, height, color, score, name) {
    ctx.fillStyle = Color.TEXT;
    ctx.textBaseline = 'hanging';
    ctx.fillText(score, x, y);
    ctx.fillStyle = color;
    ctx.fillRect(x, y + Dimension.TEXT_GAP_TOP, Dimension.COL_WIDTH, height);
    ctx.fillStyle = Color.TEXT;
    ctx.fillText(name, x, y + height + Dimension.TEXT_GAP_BOTTOM);
  };

  var startX = Dimension.COL_START_X;
  // рисуем гистограмму в цикле по входящему массиву игроков
  for (var i = 0; i < times.length; i++) {
    var columnHeight = getColumnHeight(times[i]);
    var startY = Dimension.COL_HEIGHT - columnHeight + Dimension.COL_START_Y;
    var numString = Math.ceil(times[i]);
    var currentColor = (i === 0) ? Color.MAIN : getRandomHslaColor(HSL_BASE_HUE, HSL_MAX_SATURATION, HSL_LIGHTNESS, HSL_ALPHA);
    drawGraph(startX, startY, columnHeight, currentColor, numString, names[i]);
    startX += (Dimension.COL_WIDTH + Dimension.COL_GAP);
  }
};
