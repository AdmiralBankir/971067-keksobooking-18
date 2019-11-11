'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var adFormElementTime = adForm.querySelector('.ad-form__element--time');
  var roomNumber = adForm.querySelector('#room_number');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('#address');
  var inputs = adForm.querySelectorAll('input');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterFieldset = mapFilter.querySelector('fieldset');
  var mapFilterCheckboxes = mapFilterFieldset.querySelectorAll('input[type=checkbox]');
  var typeOptionFlat = adForm.querySelector('#type option[value=flat]');
  var adFormFeatures = adForm.querySelectorAll('.features input[type=checkbox]');
  var adFormTimein = adForm.querySelector('#timein option[value="12:00"]');
  var adFormTimeout = adForm.querySelector('#timeout option[value="12:00"]');
  var roomNumberDefault = roomNumber.querySelector('option[value="1"]');
  var adFormDescription = adForm.querySelector('#description');

  var MinPriceForType = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var CapacityMask = {
    '1': [1],
    '2': [1, 2],
    '3': [1, 2, 3],
    '100': [0]
  };


  (function () {
    var inputAddress = adForm.querySelector('#address');
    inputAddress.readOnly = true;
  })();

  var onArrivalTimeChange = function (evt) {
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

  var onRoomNumberChange = function () {
    var currentOption = roomNumber.options[roomNumber.selectedIndex];
    var capacityOfRoom = adForm.querySelector('#capacity');
    var capacityOptions = capacityOfRoom.querySelectorAll('option');

    var masksAvaliableCapacity = CapacityMask[currentOption.value];

    capacityOptions.forEach(function (it) {
      if (masksAvaliableCapacity.indexOf(Number(it.value)) === -1) {
        it.disabled = true;
        it.selected = false;
      } else {
        it.disabled = false;
        it.selected = true;
      }
    });
  };


  var getAddressFromPin = function () {
    var flagPageState = map.classList.contains('map--faded');
    var xCoordPin = mapPinMain.offsetLeft;
    var yCoordPin = mapPinMain.offsetTop;

    var xCoordAddress = xCoordPin + 0.5 * mapPinMain.offsetWidth;

    var coeff = (flagPageState) ? 0.5 : 1;

    var yCoordAddress = yCoordPin + coeff * mapPinMain.offsetWidth;

    return (Math.floor(xCoordAddress) + ',' + ' ' + Math.floor(yCoordAddress));
  };

  var resetInputs = function () {
    inputs.forEach(function (it) {
      it.value = '';
    });
  };

  window.formCtrl = {
    setAddress: function () {
      addressInput.value = getAddressFromPin();
    },

    initCapacity: function () {
      onRoomNumberChange();
    },

    setMinPrice: function () {
      var minPriceInput = adForm.querySelector('#price');
      var currentOption = typeSelect.options[typeSelect.selectedIndex];
      var minPrice = MinPriceForType[(currentOption.value).toUpperCase()];

      minPriceInput.min = minPrice;
      minPriceInput.placeholder = minPrice;
    },

    setMapFilterState: function (state) {

      mapFilterSelects.forEach(function (it) {
        it.disabled = state;
      });

      mapFilterFieldset.disabled = state;
    },

    resetForm: function () {

      resetInputs();

      mapFilterSelects.forEach(function (it) {
        var defaultOption = it.querySelector('option[value="any"]');
        defaultOption.selected = true;
      });

      mapFilterCheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });

      typeOptionFlat.selected = true;
      window.formCtrl.setMinPrice();

      adFormFeatures.forEach(function (checkbox) {
        checkbox.checked = false;
      });

      adFormTimein.selected = true;
      adFormTimeout.selected = true;

      roomNumberDefault.selected = true;
      onRoomNumberChange();

      adFormDescription.value = '';
    }
  };

  typeSelect.addEventListener('change', function () {
    window.formCtrl.setMinPrice();
  });

  adFormElementTime.addEventListener('change', onArrivalTimeChange);

  roomNumber.addEventListener('change', onRoomNumberChange);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.sendRequest(new FormData(adForm), 'upload', function () {
      window.pageStateCtrl.deactivatePage();
    });
  });
})();
