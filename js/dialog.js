'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupName = setup.querySelector('.setup-user-name');

  var openPopup = function () {
    setup.classList.remove('hidden');
    setupClose.addEventListener('click', closePopup);
    setupClose.addEventListener('keydown', setupCloseEnterKeypressHandler);
    document.addEventListener('keydown', popupEscKeypressHandler);
    window.dialogMove.dialogHandler.addEventListener('mousedown', window.dialogMove.dialogHandleMouseDownHandler);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    setupClose.removeEventListener('click', closePopup);
    setupClose.removeEventListener('keydown', setupCloseEnterKeypressHandler);
    document.removeEventListener('keydown', closePopup);
    window.dialogMove.dialogHandler.removeEventListener('mousedown', window.dialogMove.dialogHandleMouseDownHandler);
    window.dialogMove.cleanSetupPosition();
  };

  var setupOpenEnterKeypressHandler = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  var setupCloseEnterKeypressHandler = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  var popupEscKeypressHandler = function (evt) {
    if (document.activeElement !== setupName) {
      window.util.isEscapeEvent(evt, closePopup);
    }
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', setupOpenEnterKeypressHandler);

  window.dialog = {
    setup: setup,
  };
})();
