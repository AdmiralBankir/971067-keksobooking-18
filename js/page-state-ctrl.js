'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = map.querySelector('.map__pin--main');
  var flagCreatePins = false;

  var setPageState = function (state) {

    if (state) {
      map.classList.remove('map--faded');

      adForm.classList.remove('ad-form--disabled');

      window.formCtrl.initCapacity();

    } else {
      map.classList.add('map--faded');

      adForm.classList.add('ad-form--disabled');
    }

    if (flagCreatePins) {
      window.ctrlPins.createPinsOnMap();
      flagCreatePins = false;
    }

    adFormFieldsets.forEach(function (it) {
      it.disabled = !state;
    });

    mapFilters.disabled = !state;

    window.formCtrl.setAddress();
  };

  setPageState(false);

  flagCreatePins = true;

  mapPinMain.addEventListener('mousedown', function () {
    setPageState(true);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setPageState(true));
  });

  window.pageStateCtrl = {
    deactivatePage: function () {
      setPageState(false);
      flagCreatePins = true;
    }
  };
})();
