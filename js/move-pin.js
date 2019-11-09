'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var checkCoord = function (pin) {
    var bottomBorder = window.window.util.MAX_Y_MAP - mapPinMain.offsetHeight;
    var topBorder = window.window.util.MIN_Y_MAP - mapPinMain.offsetHeight;

    pin.yCoord = (pin.yCoord > bottomBorder) ? bottomBorder : pin.yCoord;
    pin.yCoord = (pin.yCoord < topBorder) ? topBorder : pin.yCoord;

    var rightBorder = map.offsetWidth - 0.5 * mapPinMain.offsetWidth;
    var leftBorder = -0.5 * mapPinMain.offsetWidth;

    pin.xCoord = (pin.xCoord > rightBorder) ? rightBorder : pin.xCoord;
    pin.xCoord = (pin.xCoord < leftBorder) ? leftBorder : pin.xCoord;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      var pin = {
        xCoord: mapPinMain.offsetLeft - shift.x,
        yCoord: mapPinMain.offsetTop - shift.y
      };

      checkCoord(pin);

      mapPinMain.style.top = pin.yCoord + 'px';
      mapPinMain.style.left = pin.xCoord + 'px';

      window.formCtrl.setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
