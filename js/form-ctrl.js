'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var select = adForm.querySelector('#type');
  var adFormElementTime = adForm.querySelector('.ad-form__element--time');
  var roomNumber = adForm.querySelector('#room_number');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('#address');
  var inputs = adForm.querySelectorAll('input');

  var MIN_PRICE_FOR_TYPE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
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

    selects.forEach(function (it) {
      if (it.id !== modifiedSelect.id) {
        it.value = modifiedValue;
      }
    });
  };

  var onChange = function () {
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

    capacityOptions.forEach(function (it) {
      if (masksAvaliableCapacity.indexOf(Number(it.value)) === -1) {
        it.disabled = true;
        it.selected = false;
      } else {
        it.disabled = false;
      }
    });
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
      onChange();
    },

    setMinPrice: function (currentSelect) {
      var minPriceInput = adForm.querySelector('#price');
      var currentOption = currentSelect.options[select.selectedIndex];
      var minPrice = MIN_PRICE_FOR_TYPE[currentOption.value];

      minPriceInput.min = minPrice;
      minPriceInput.placeholder = minPrice;

    }
  };

  var resetInputs = function () {
    inputs.forEach(function (it) {
      it.value = '';
    });
  };


  select.addEventListener('change', function () {
    window.formCtrl.setMinPrice(select);
  });

  adFormElementTime.addEventListener('change', onchangeSelect);

  roomNumber.addEventListener('change', onChange);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.sendRequest(new FormData(adForm), 'upload', function () {
      window.pageStateCtrl.deactivatePage();
      window.ctrlPins.removePinsOnMap();
      resetInputs();
      window.ctrlPins.resetMainPin();
    });
  });
})();
