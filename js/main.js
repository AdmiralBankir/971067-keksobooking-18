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
var ENTER_KEYCODE = 13;

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

var createPinsOnMap = function () {
  maxWidthMap = map.offsetWidth;
  var pins = createMochForPins();

  var mapPins = document.querySelector('.map__pins');


  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
  }

  mapPins.appendChild(fragment);
};

var getAddressFromPin = function () {
  var xCoordPin = mapPinMain.offsetLeft;
  var yCoordPin = mapPinMain.offsetTop;

  var xCoordAddress = xCoordPin + 0.5 * mapPinMain.offsetWidth;
  var yCoordAddress;

  if (map.classList.contains('map--faded')) {
    yCoordAddress = yCoordPin + 0.5 * mapPinMain.offsetWidth;
  } else {
    yCoordAddress = yCoordPin + mapPinMain.offsetWidth;
  }

  yCoordAddress = (yCoordAddress > MAX_Y_MAP) ? MAX_Y_MAP : yCoordAddress;
  yCoordAddress = (yCoordAddress < MIN_Y_MAP) ? MIN_Y_MAP : yCoordAddress;

  xCoordAddress = (xCoordAddress > map.offsetWidth) ? map.offsetWidth : xCoordAddress;

  return String(Math.floor(xCoordAddress) + ',' + ' ' + Math.floor(yCoordAddress));
};

var setAddress = function () {
  var addressInput = adForm.querySelector('#address');
  addressInput.value = getAddressFromPin();
};

var setPageState = function (state) {

  if (state) {
    map.classList.remove('map--faded');

    adForm.classList.remove('ad-form--disabled');

    createPinsOnMap();

  } else {
    map.classList.add('map--faded');

    adForm.classList.add('ad-form--disabled');
  }

  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = !state;
  }

  mapFilters.disabled = !state;

  setAddress();
};

var setMinPrice = function (select) {
  var minPriceInput = adForm.querySelector('#price');
  var minPrice;
  var currentOption = select.options[select.selectedIndex];
  switch (currentOption.value) {
    case 'bungalo':
      minPrice = 0;
      break;

    case 'flat':
      minPrice = 1000;
      break;

    case 'house':
      minPrice = 5000;
      break;

    case 'palace':
      minPrice = 10000;
      break;

    default:
      break;
  }

  minPriceInput.min = minPrice;
  minPriceInput.placeholder = minPrice;

};

var disabledAddress = function () {
  var inputAddress = adForm.querySelector('#address');
  inputAddress.disabled = true;
};

var onchangeSelect = function (evt) {
  var modifiedSelect = evt.target;
  var modifiedOption = modifiedSelect.options[modifiedSelect.selectedIndex];
  var modifiedValue = modifiedOption.value;

  var selects = adFormElementTime.querySelectorAll('select');

  for (var i = 0; i < selects.length; i++) {
    if (selects[i].id !== modifiedSelect.id) {
      selects[i].value = modifiedValue;
      break;
    }
  }
};

var onchangeRoomNumber = function () {
  var currentOption = roomNumber.options[roomNumber.selectedIndex];
  var capacityOfRoom = adForm.querySelector('#capacity');
  var capacityOptions = capacityOfRoom.querySelectorAll('option');

  var masksAvaliableCapacity = [];

  switch (currentOption.value) {
    case '1':
      masksAvaliableCapacity = [1];
      break;

    case '2':
      masksAvaliableCapacity = [1, 2];
      break;

    case '3':
      masksAvaliableCapacity = [1, 2, 3];
      break;

    case '100':
      masksAvaliableCapacity = [0];
      break;

    default:
      break;
  }

  for (var i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].disabled = true;
    if (masksAvaliableCapacity.indexOf(Number(capacityOptions[i].value)) !== -1) {
      capacityOptions[i].disabled = false;
    }
  }
};


var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = map.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var select = adForm.querySelector('#type');
var adFormElementTime = adForm.querySelector('.ad-form__element--time');
var roomNumber = adForm.querySelector('#room_number');


setPageState(false);

mapPinMain.addEventListener('mousedown', function () {
  setPageState(true);
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setPageState(true);
  }
});

select.addEventListener('change', function () {
  setMinPrice(select);
});

adFormElementTime.addEventListener('change', onchangeSelect);

roomNumber.addEventListener('change', onchangeRoomNumber);

disabledAddress();
