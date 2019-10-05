'use strict';

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = map.querySelector('.map__pin--main');
var flagCreatePins = false;

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

  yCoordAddress = (yCoordAddress > window.MAX_Y_MAP) ? window.MAX_Y_MAP : yCoordAddress;
  yCoordAddress = (yCoordAddress < window.MIN_Y_MAP) ? window.MIN_Y_MAP : yCoordAddress;

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

  } else {
    map.classList.add('map--faded');

    adForm.classList.add('ad-form--disabled');
  }

  if (flagCreatePins) {
    window.createPins.createPinsOnMap();
    flagCreatePins = false;
  }

  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = !state;
  }

  mapFilters.disabled = !state;

  setAddress();
};

setPageState(false);

flagCreatePins = true;

mapPinMain.addEventListener('mousedown', function () {
  setPageState(true);
});

mapPinMain.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, setPageState(true));
});
