'use strict';

var AVATAR_SAMPLE = 'img/avatars/user';
var TITLE = 'Заголовок предложения';
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_OR_OUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESC = 'Строка с описанием';
var PHOTO_SAMPLE = 'http://o0.github.io/assets/images/tokyo/hotel';
var maxWidthMap = 600;

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

window.mochPinsCtrl.createMochForPins = function () {
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
