'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features').querySelectorAll('input');

  function Filter() {
    this.type = '';
    this.price = '';
    this.rooms = '';
    this.guests = '';
    this.features = [];
  }

  var filterOption = new Filter();

  var getFilterOption = function () {
    filterOption = new Filter();
    filterOption.type = housingType.options[housingType.selectedIndex].value;
    filterOption.price = housingPrice.options[housingPrice.selectedIndex].value;
    filterOption.rooms = housingRooms.options[housingRooms.selectedIndex].value;
    filterOption.guests = housingGuests.options[housingGuests.selectedIndex].value;

    housingFeatures.forEach(function (elem) {
      if (elem.checked) {
        filterOption.features.push(elem.value);
      }
    });


    var keys = Object.keys(filterOption);

    keys.forEach(function (elem) {

      if (elem === 'guests' || elem === 'rooms') {
        filterOption[elem] = Number(filterOption[elem]);
        if (isNaN(filterOption[elem])) {
          delete filterOption[elem];
        }
      } else if (filterOption[elem] === 'any' ||
        filterOption[elem].length === 0) {
        delete filterOption[elem];
      }

    });
  };

  var isMatchingPrice = function (pin) {
    var range = [];
    var matching = false;
    switch (filterOption.price) {
      case 'middle':
        range = [10000, 50000];
        break;
      case 'low':
        range = [0, 9999];
        break;
      case 'high':
        range = [50000, Infinity];
        break;
    }

    if (pin.offer.price <= range[1] && pin.offer.price >= range[0]) {
      matching = true;
    }

    return matching;
  };

  var isMatchingFeatures = function (pin) {
    return (JSON.stringify(pin.offer.features.slice().sort()) ===
    JSON.stringify(filterOption.features.slice().sort()));
  };

  var isMatchingPin = function (pin) {
    var activeOptions = Object.keys(filterOption);
    var matching = true;

    activeOptions.forEach(function (option) {
      if (pin.offer[option] !== filterOption[option]) {
        matching = false;
        if (option === 'price') {
          matching = isMatchingPrice(pin);
        } else if (option === 'features') {
          matching = isMatchingFeatures(pin);
        }
      }
    });

    return matching;
  };


  var updatePins = window.debounce(function () {
    window.ctrlPins.removePinsOnMap();
    window.renderPins(window.dataPins.slice().filter(isMatchingPin));
  });

  var letsFilter = function () {
    filterForm.addEventListener('change', function () {
      getFilterOption();
      updatePins();
    });
  };

  letsFilter();
})();
