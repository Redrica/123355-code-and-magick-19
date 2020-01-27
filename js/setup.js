'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'],
  WIZARDS_QUANTITY = 4,
  HIDDEN = 'hidden';

var setup = document.querySelector('.setup');
setup.classList.remove(HIDDEN);

// получение случайного индекса в массиве
var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// получение массива объектов для отрисовки волшебников
var getWizardsList = function (quantity) {
  var array = [];
  for (var i = 0; i < quantity; i++) {
    var object = {
      name: NAMES[getRandomIndex(NAMES)] + ' ' + SURNAMES[getRandomIndex(SURNAMES)],
      coatColor: COAT_COLORS[getRandomIndex(COAT_COLORS)],
      eyesColor: EYES_COLORS[getRandomIndex(EYES_COLORS)],
    };
    array.push(object);
  }
  return array;
};

// создание DOM-элемента на основе объекта
var createWizard = function (object) {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item').cloneNode(true);
  wizardTemplate.querySelector('.setup-similar-label').textContent = object.name;
  wizardTemplate.querySelector('.wizard-coat').style.fill = object.coatColor;
  wizardTemplate.querySelector('.wizard-eyes').style.fill = object.eyesColor;
  return wizardTemplate;
};

// отрисовка волшебников
var renderWizards = function (array, parentElement) {
  var wizardFragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    wizardFragment.appendChild(createWizard(array[i]));
  }
  parentElement.appendChild(wizardFragment);
};

var wizards = getWizardsList(WIZARDS_QUANTITY);
var wizardsParent = document.querySelector('.setup-similar-list');
renderWizards(wizards, wizardsParent);

var similarWizards = document.querySelector('.setup-similar');
similarWizards.classList.remove(HIDDEN);
