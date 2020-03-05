'use strict';

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardCoat = window.dialog.setup.querySelector('.setup-wizard .wizard-coat');
var coatColorInput = window.dialog.setup.querySelector('input[name=coat-color]');

function repaint(element, formInput, property, colorsArray) {
  var randomColor = colorsArray[window.util.getRandomNumber(colorsArray)];
  element.style[property] = randomColor;
  formInput.value = randomColor;
}

function wizardCoatClickHandler() {
  repaint(wizardCoat, coatColorInput, 'fill', window.generateData.COAT_COLORS);
}
wizardCoat.addEventListener('click', wizardCoatClickHandler);

// вот тут не совсем понятно с неймингом: с одной стороны во множественном числе мы именуем массивы,
// с другой стороны его глаза – это как бы единое целое.
var wizardEyes = window.dialog.setup.querySelector('.setup-wizard .wizard-eyes');
var eyesColorInput = window.dialog.setup.querySelector('input[name=eyes-color]');

function wizardEyesClickHandler() {
  repaint(wizardEyes, eyesColorInput, 'fill', window.generateData.EYES_COLORS);
}
wizardEyes.addEventListener('click', wizardEyesClickHandler);

var fireball = window.dialog.setup.querySelector('.setup-fireball-wrap');
var fireballColorInput = fireball.querySelector('input[name=fireball-color]');

function fireballClickHandler() {
  repaint(fireball, fireballColorInput, 'backgroundColor', FIREBALL_COLORS);
}
fireball.addEventListener('click', fireballClickHandler);
