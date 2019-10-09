'use strict';

var AVATAR_SAMPLE = 'img/avatars/user';
var TITLE = 'Заголовок предложения';
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_OR_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESC = 'Строка с описанием';
var PHOTO_SAMPLE = 'http://o0.github.io/assets/images/tokyo/hotel';
var maxWidthMap = 600;

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');

var createFeaturesArray = function () {
  var features = [];
  var featuresLen = window.util.randomInt(1, FEATURES.length);
  for (var i = 0; i < featuresLen; i++) {
    features.push(FEATURES[window.util.randomInt(0, FEATURES.length)]);
  }
  return features;
};

var createPhotosArray = function () {
  var photos = [];
  var photosLen = window.util.randomInt(1, 10);
  for (var i = 0; i < photosLen; i++) {
    photos.push(PHOTO_SAMPLE + i + '.jpg');
  }
  return photos;
};

var createMochForPins = function () {
  var moch = [];
  for (var i = 0; i < 8; i++) {
    var xCoord = window.util.randomInt(0, maxWidthMap);
    var yCoord = window.util.randomInt(window.MIN_Y_MAP, window.MAX_Y_MAP);
    moch[i] = {
      author: {
        avatar: AVATAR_SAMPLE + '0' + window.util.randomInt(1, 8) + '.png'
      },

      offer: {
        title: TITLE,

        address: String(xCoord + ',' + yCoord),

        price: window.util.randomInt(0, 1000),

        type: TYPE[window.util.randomInt(0, TYPE.length)],

        rooms: window.util.randomInt(0, 10),

        guests: window.util.randomInt(0, 10),

        checkin: CHECK_IN_OR_OUT[window.util.randomInt(0, CHECK_IN_OR_OUT.length)],

        checkout: CHECK_IN_OR_OUT[window.util.randomInt(0, CHECK_IN_OR_OUT.length)],

        features: createFeaturesArray(),

        description: DESC,

        photos: createPhotosArray()
      },

      location: {
        x: xCoord,
        y: yCoord
      }
    };
  }
  return moch;
};

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
    maxWidthMap = map.offsetWidth;
    var pins = createMochForPins();

    var mapPins = document.querySelector('.map__pins');


    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i]));
    }

    mapPins.appendChild(fragment);
  },

  removePinsOnMap: function () {
    var pins = map.querySelectorAll('.map__pin');
    for (var i = pins.length - 1; i >= 0; i--) {
      var pin = pins[i];
      pin.parentElement.removeChild(pin);
    }
  }
};
