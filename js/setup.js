'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_QUANTITY = 4;

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// получение случайного индекса в массиве
var getRandomNumber = function (array) {
  return Math.floor(Math.random() * array.length);
};

// получение массива объектов для отрисовки волшебников
var generateWizards = function (quantity) {
  var wizardPropertiesArray = [];
  for (var i = 0; i < quantity; i++) {
    var wizard = {
      name: NAMES[getRandomNumber(NAMES)] + ' ' + SURNAMES[getRandomNumber(SURNAMES)],
      coatColor: COAT_COLORS[getRandomNumber(COAT_COLORS)],
      eyesColor: EYES_COLORS[getRandomNumber(EYES_COLORS)],
    };
    wizardPropertiesArray.push(wizard);
  }
  return wizardPropertiesArray;
};

// создание DOM-элемента на основе объекта
var createWizardElement = function (propertiesObject) {
  var wizardElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item').cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = propertiesObject.name;
  wizardElement.querySelector('.wizard-coat').style.fill = propertiesObject.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = propertiesObject.eyesColor;
  return wizardElement;
};

// отрисовка волшебников
var renderWizards = function (wizardPropertiesArray) {
  var wizardFragment = document.createDocumentFragment();
  for (var i = 0; i < wizardPropertiesArray.length; i++) {
    wizardFragment.appendChild(createWizardElement(wizardPropertiesArray[i]));
  }
  return wizardFragment;
};

var wizards = generateWizards(WIZARDS_QUANTITY);
var wizardsParent = document.querySelector('.setup-similar-list');
// вынесено из функции отрисовки, т.к. по сути это две разные функции (+ чтобы функция не меняла объект вне своей области видимости)
wizardsParent.appendChild(renderWizards(wizards));

var similarWizards = document.querySelector('.setup-similar');
similarWizards.classList.remove('hidden');
