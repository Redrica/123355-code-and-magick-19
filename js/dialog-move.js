'use strict';

(function () {
  var dialogHandler = document.querySelector('.upload');

  function dialogHandleMouseDownHandler(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var dragged = false;

    function documentMouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      window.dialog.setup.style.top = (window.dialog.setup.offsetTop - shift.y) + 'px';
      window.dialog.setup.style.left = (window.dialog.setup.offsetLeft - shift.x) + 'px';
    }

    function documentMouseUpHandler(upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var dialogHandlerClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', dialogHandlerClickPreventDefault);
        };
        dialogHandler.addEventListener('click', dialogHandlerClickPreventDefault);
      }

      document.removeEventListener('mousemove', documentMouseMoveHandler);
      window.removeEventListener('mouseup', documentMouseUpHandler);
    }

    document.addEventListener('mousemove', documentMouseMoveHandler);
    window.addEventListener('mouseup', documentMouseUpHandler);
  }

  function cleanSetupPosition() {
    window.dialog.setup.style.top = '';
    window.dialog.setup.style.left = '';
  }

  window.dialogMove = {
    dialogHandler: dialogHandler,
    dialogHandleMouseDownHandler: dialogHandleMouseDownHandler,
    cleanSetupPosition: cleanSetupPosition,
  };
})();
