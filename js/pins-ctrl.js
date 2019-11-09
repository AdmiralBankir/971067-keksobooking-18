'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  window.dataPins = [];
  var NUMBER_OF_PINS = 5;

  var addClickListener = function (mapPin, dataPin) {
    mapPin.addEventListener('click', function () {
      window.removeCard();
      window.createCard(dataPin);
    });
  };

  var createPin = function (pinAttr) {
    var pin = pinTemplate.cloneNode(true);
    var img = pin.querySelector('img');

    var pinWidth = img.width;
    var pinHeight = img.height;

    var leftPosition = pinAttr.location.x - pinWidth / 2;
    var topPosition = pinAttr.location.y - pinHeight;

    pin.style.left = leftPosition + 'px';
    pin.style.top = topPosition + 'px';
    img.src = pinAttr.author.avatar;
    img.alt = pinAttr.offer.title;

    return pin;
  };

  window.renderPins = function (pins) {
    if (pins.length !== 0) {
      var lenPin = (pins.length > NUMBER_OF_PINS) ? NUMBER_OF_PINS : pins.length;
      var mapPins = document.querySelector('.map__pins');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < lenPin; i++) {
        var newPin = createPin(pins[i]);
        fragment.appendChild(newPin);
        addClickListener(newPin, pins[i]);
      }
      mapPins.appendChild(fragment);
    } else {
      window.ctrlPins.removePinsOnMap();
    }
  };

  window.ctrlPins = {
    createPinsOnMap: function () {
      window.sendRequest(null, 'load', function (pins) {
        window.dataPins = pins.slice();
        window.renderPins(window.dataPins);
      });
    },

    removePinsOnMap: function () {
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = pins.length - 1; i >= 0; i--) {
        var pin = pins[i];
        pin.parentElement.removeChild(pin);
      }
      window.removeCard();
    },

    resetMainPin: function () {
      var INIT_LEFT_MAIN_PIN = 570;
      var INIT_TOP_MAIN_PIN = 375;
      var pinMain = map.querySelector('.map__pin--main');
      pinMain.style.left = INIT_LEFT_MAIN_PIN + 'px';
      pinMain.style.top = INIT_TOP_MAIN_PIN + 'px';
      window.formCtrl.setAddress();
    }
  };
})();
