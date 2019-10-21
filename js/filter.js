'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features').querySelectorAll('input');
  var filterOption;

  function Filter(value, handler) {
    this.value = value;
    this.handler = handler;
  }

  function FilterCollection() {
    this.type = new Filter('', isMatchingOffer);
    this.price = new Filter('', isMatchingPrice);
    this.rooms = new Filter('', isMatchingOffer);
    this.guests = new Filter('', isMatchingOffer);
    this.features = new Filter([], isMatchingFeatures);
  }

  var priceList = {
    low: {min: 0, max: 9999},
    middle: {min: 10000, max: 50000},
    high: {min: 50000, max: Infinity}
  };

  var getFilterOption = function () {
    filterOption = new FilterCollection();
    filterOption.type.value = housingType.value;
    filterOption.price.value = housingPrice.value;
    filterOption.rooms.value = housingRooms.value;
    filterOption.guests.value = housingGuests.value;

    var features = Array.from(housingFeatures).filter(function (checkbox) {
      return checkbox.checked;
    });

    features.forEach(function (element) {
      filterOption.features.value.push(element.value);
    });

    var keys = Object.keys(filterOption);

    keys.forEach(function (elem) {

      if (filterOption[elem].value === 'any') {
        delete filterOption[elem];
      }

    });

    if (filterOption.features.value.length === 0) {
      delete filterOption.features;
    }
  };

  var isMatchingPrice = function (pin) {
    var range = priceList[filterOption.price.value];
    return (pin.offer.price <= range.max && pin.offer.price >= range.min);
  };

  var isMatchingFeatures = function (pin) {
    return (filterOption.features.value.every(function (element) {
      return (pin.offer.features.indexOf(element) + 1);
    }));
  };

  var isMatchingOffer = function (pin, option) {
    var value = filterOption[option].value;
    if (!isNaN(Number(value))) {
      value = Number(value);
    }
    return (pin.offer[option] === value);
  };

  var isMatchingPin = function (pin) {
    var activeOptions = Object.keys(filterOption);
    var matching = 0;

    activeOptions.forEach(function (option) {
      matching += filterOption[option].handler(pin, option);
    });

    if (matching !== activeOptions.length) {
      return false;
    }

    return true;
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
