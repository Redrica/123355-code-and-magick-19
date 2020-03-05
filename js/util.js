'use strict';
(function () {
  var Code = {
    ENTER_KEY: 'Enter',
    ESCAPE_KEY: 'Escape'
  };
  var BASE_LINE_DEFAULT = 'alphabetic';

  function isEnterEvent(evt, callback) {
    if (evt.key === Code.ENTER_KEY) {
      callback();
    }
  }

  function isEscapeEvent(evt, callback) {
    if (evt.key === Code.ESCAPE_KEY) {
      callback();
    }
  }

  // получение случайного индекса в массиве
  function getRandomNumber(array) {
    return Math.floor(Math.random() * array.length);
  }

  // получение максимального значения в массиве
  var getMaxElementValue = function (numArray) {
    return numArray.reduce(function (a, b) {
      return Math.max(a, b);
    });
  };

  // получение рандомного значения цвета в модели HSLA
  var getRandomHslaColor = function (h, s, l, a) {
    return 'hsla(' + h + ', ' + Math.floor(Math.random() * 100) * s / 100 + '%, ' + l + '%, ' + a + ')';
  };

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

  window.util = {
    isEnterEvent: isEnterEvent,
    isEscapeEvent: isEscapeEvent,
    getRandomNumber: getRandomNumber,
    getMaxElementValue: getMaxElementValue,
    getRandomHslaColor: getRandomHslaColor,
    renderRect: renderRect,
    renderText: renderText,
  };
})();
