'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARDS_QUANTITY = 4;

var Code = {
  ENTER_KEY: 'Enter',
  ESCAPE_KEY: 'Escape'
};

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

// ///////////////////////////////////
// работа с окном настройки персонажа
// ///////////////////////////////////

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupName = setup.querySelector('.setup-user-name');

var openPopup = function () {
  setup.classList.remove('hidden');
  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', setupCloseEnterKeypressHandler);
  document.addEventListener('keydown', popupEscKeypressHandler);
};

var closePopup = function () {
  setup.classList.add('hidden');
  setupClose.removeEventListener('click', closePopup);
  setupClose.removeEventListener('keydown', setupCloseEnterKeypressHandler);
  document.removeEventListener('keydown', closePopup);
};

var setupOpenEnterKeypressHandler = function (evt) {
  if (evt.key === Code.ENTER_KEY) {
    openPopup();
  }
};

var setupCloseEnterKeypressHandler = function (evt) {
  if (evt.key === Code.ENTER_KEY) {
    closePopup();
  }
};

var popupEscKeypressHandler = function (evt) {
  if (evt.key === Code.ESCAPE_KEY && document.activeElement !== setupName) {
    closePopup();
  }
};

setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', setupOpenEnterKeypressHandler);

var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var coatColorInput = setup.querySelector('input[name=coat-color]');

var repaint = function (element, formInput, property, colorsArray) {
  var randomColor = colorsArray[getRandomNumber(colorsArray)];
  element.style[property] = randomColor;
  formInput.value = randomColor;
};

var wizardCoatClickHandler = function () {
  repaint(wizardCoat, coatColorInput, 'fill', COAT_COLORS);
};
wizardCoat.addEventListener('click', wizardCoatClickHandler);

// вот тут не совсем понятно с неймингом: с одной стороны во множественном числе мы именуем массивы,
// с другой стороны его глаза – это как бы единое целое.
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var eyesColorInput = setup.querySelector('input[name=eyes-color]');

var wizardEyesClickHandler = function () {
  repaint(wizardEyes, eyesColorInput, 'fill', EYES_COLORS);
};
wizardEyes.addEventListener('click', wizardEyesClickHandler);

var fireball = setup.querySelector('.setup-fireball-wrap');
var fireballColorInput = fireball.querySelector('input[name=fireball-color]');

var fireballClickHandler = function () {
  repaint(fireball, fireballColorInput, 'backgroundColor', FIREBALL_COLORS);
};
fireball.addEventListener('click', fireballClickHandler);
