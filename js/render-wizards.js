'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;

  // создание DOM-элемента на основе объекта
  function createWizardElement(propertiesObject) {
    var wizardElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item').cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = propertiesObject.name;
    wizardElement.querySelector('.wizard-coat').style.fill = propertiesObject.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = propertiesObject.eyesColor;
    return wizardElement;
  }

  // отрисовка волшебников
  function renderWizards(wizardPropertiesArray) {
    var wizardFragment = document.createDocumentFragment();
    for (var i = 0; i < wizardPropertiesArray.length; i++) {
      wizardFragment.appendChild(createWizardElement(wizardPropertiesArray[i]));
    }
    return wizardFragment;
  }

  var wizards = window.generateData.generateWizards(WIZARDS_QUANTITY);
  var wizardsParent = document.querySelector('.setup-similar-list');
  // вынесено из функции отрисовки, т.к. по сути это две разные функции (+ чтобы функция не меняла объект вне своей области видимости)
  wizardsParent.appendChild(renderWizards(wizards));

  var similarWizards = document.querySelector('.setup-similar');
  similarWizards.classList.remove('hidden');
})();
