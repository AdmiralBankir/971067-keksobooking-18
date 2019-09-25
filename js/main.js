'use strict';

var AVATAR_SAMPLE = 'img/avatars/user';
var TITLE = 'Заголовок предложения';
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_OR_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESC = 'Строка с описанием';
var PHOTO_SAMPLE = 'http://o0.github.io/assets/images/tokyo/hotel';
var maxWidthMap = 600;
var MIN_Y_MAP = 130;
var MAX_Y_MAP = 630;

var randomInt = function (min, max) {
  var rand = min + Math.random() * (max - min);

  return Math.floor(rand);
};

var createFeaturesArray = function () {
  var features = [];
  var featuresLen = randomInt(1, FEATURES.length);
  for (var i = 0; i < featuresLen; i++) {
    features.push(FEATURES[randomInt(0, FEATURES.length)]);
  }
  return features;
};

var createPhotosArray = function () {
  var photos = [];
  var photosLen = randomInt(1, 10);
  for (var i = 0; i < photosLen; i++) {
    photos.push(PHOTO_SAMPLE + i + '.jpg');
  }
  return photos;
};

var createMochForPins = function () {
  var moch = [];
  for (var i = 0; i < 8; i++) {
    var xCoord = randomInt(0, maxWidthMap);
    var yCoord = randomInt(MIN_Y_MAP, MAX_Y_MAP);
    moch[i] = {
      author: {
        avatar: AVATAR_SAMPLE + '0' + randomInt(1, 8) + '.png'
      },

      offer: {
        title: TITLE,

        address: String(xCoord + ',' + yCoord),

        price: randomInt(0, 1000),

        type: TYPE[randomInt(0, TYPE.length)],

        rooms: randomInt(0, 10),

        guests: randomInt(0, 10),

        checkin: CHECK_IN_OR_OUT[randomInt(0, CHECK_IN_OR_OUT.length)],

        checkout: CHECK_IN_OR_OUT[randomInt(0, CHECK_IN_OR_OUT.length)],

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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

maxWidthMap = map.offsetWidth;
var pins = createMochForPins();

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(createPin(pins[i]));
}

mapPins.appendChild(fragment);
