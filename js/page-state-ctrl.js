'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapPinMain = map.querySelector('.map__pin--main');
  var select = adForm.querySelector('#type');
  var resetForm = document.querySelector('.ad-form__reset');
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

    window.formCtrl.setMapFilterState(!state);

    window.formCtrl.setAddress();

    window.formCtrl.setMinPrice(select);
  };

  var pageInitialization = function () {
    setPageState(false);

    flagCreatePins = true;

    mapPinMain.addEventListener('mousedown', function () {
      setPageState(true);
    });

    mapPinMain.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, setPageState(true));
    });
  };

  pageInitialization();

  window.pageStateCtrl = {
    deactivatePage: function () {
      setPageState(false);
      flagCreatePins = true;
      window.formCtrl.resetForm();
      window.ctrlPins.removePinsOnMap();
      window.ctrlPins.resetMainPin();
    }
  };

  resetForm.addEventListener('click', function () {
    window.pageStateCtrl.deactivatePage();
  });
})();
