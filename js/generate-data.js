'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  // получение массива объектов для отрисовки волшебников
  function generateWizards(quantity) {
    var wizardPropertiesArray = [];
    for (var i = 0; i < quantity; i++) {
      var wizard = {
        name: NAMES[window.util.getRandomNumber(NAMES)] + ' ' + SURNAMES[window.util.getRandomNumber(SURNAMES)],
        coatColor: COAT_COLORS[window.util.getRandomNumber(COAT_COLORS)],
        eyesColor: EYES_COLORS[window.util.getRandomNumber(EYES_COLORS)],
      };
      wizardPropertiesArray.push(wizard);
    }
    return wizardPropertiesArray;
  }

  window.generateData = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    generateWizards: generateWizards,
  };
})();
