'use strict';

var adForm = document.querySelector('.ad-form');
var select = adForm.querySelector('#type');
var adFormElementTime = adForm.querySelector('.ad-form__element--time');
var roomNumber = adForm.querySelector('#room_number');
var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('#address');

var setMinPrice = function (currentSelect) {
  var minPriceInput = adForm.querySelector('#price');
  var minPrice;
  var currentOption = currentSelect.options[select.selectedIndex];
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

(function () {
  var inputAddress = adForm.querySelector('#address');
  inputAddress.readOnly = true;
})();

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

var getAddressFromPin = function () {
  var xCoordPin = mapPinMain.offsetLeft;
  var yCoordPin = mapPinMain.offsetTop;

  var xCoordAddress = xCoordPin + 0.5 * mapPinMain.offsetWidth;
  var yCoordAddress = 0;

  if (map.classList.contains('map--faded')) {
    yCoordAddress = yCoordPin + 0.5 * mapPinMain.offsetWidth;
  } else {
    yCoordAddress = yCoordPin + mapPinMain.offsetWidth;
  }

  return String(Math.floor(xCoordAddress) + ',' + ' ' + Math.floor(yCoordAddress));
};

window.formCtrl = {
  setAddress: function () {
    addressInput.value = getAddressFromPin();
  },

  initCapacity: function () {
    onchangeRoomNumber();
  }
};

var resetInputs = function () {
  var inputs = adForm.querySelectorAll('input');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
};


select.addEventListener('change', function () {
  setMinPrice(select);
});

adFormElementTime.addEventListener('change', onchangeSelect);

roomNumber.addEventListener('change', onchangeRoomNumber);

adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.upload(new FormData(adForm), function () {
    window.pageStateCtrl.disactivatePage();
    window.ctrlPins.removePinsOnMap();
    resetInputs();
    window.ctrlPins.resetMainPin();
  });
});
