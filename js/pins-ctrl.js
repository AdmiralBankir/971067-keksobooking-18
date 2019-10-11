'use strict';

var INIT_LEFT_MAIN_PIN = 570;
var INIT_TOP_MAIN_PIN = 375;

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');

var createPin = function (pinAttr) {
  var pin = pinTemplate.cloneNode(true);
  var img = pin.querySelector('img');

  var pinWidth = img.width;
  var pinHeight = img.height;

  var leftPosition = pinAttr.location.x - pinWidth / 2;
  var topPosition = pinAttr.location.y - pinHeight;

  pin.style = 'left:' + leftPosition + 'px;' + 'top:' + topPosition + 'px;';
  img.src = pinAttr.author.avatar;
  img.alt = pinAttr.offer.title;

  return pin;
};

window.ctrlPins = {
  createPinsOnMap: function () {
    var mapPins = document.querySelector('.map__pins');
    window.load(function (pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < pins.length; i++) {
        fragment.appendChild(createPin(pins[i]));
      }
      mapPins.appendChild(fragment);
    });
  },

  removePinsOnMap: function () {
    var pins = map.querySelectorAll('.map__pin');
    for (var i = pins.length - 1; i >= 0; i--) {
      var pin = pins[i];
      if (pin.classList.contains('map__pin--main')) {
        break;
      }
      pin.parentElement.removeChild(pin);
    }
  },

  resetMainPin: function () {
    var pinMain = map.querySelector('.map__pin--main');
    pinMain.style = 'left:' + INIT_LEFT_MAIN_PIN + 'px;' + 'top:' + INIT_TOP_MAIN_PIN + 'px;';
    window.formCtrl.setAddress();
  }
};
