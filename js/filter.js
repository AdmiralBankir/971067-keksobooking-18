'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var currentHousing;

  var updatePins = function () {
    window.ctrlPins.removePinsOnMap();

    if (currentHousing === 'any') {
      window.renderPins(window.dataPins.sort(function () {
        return Math.random() - 0.5;
      }));
    }

    var sameTypePins = window.dataPins.filter(function (it) {
      return it.offer.type === currentHousing;
    });

    if (sameTypePins.length === 0) {
      return;
    }

    var filteredPins = sameTypePins;
    filteredPins = filteredPins.concat(window.dataPins);

    var uniquePins = filteredPins.filter(function (it, i) {
      return filteredPins.indexOf(it) === i;
    });

    window.renderPins(uniquePins);
  };

  housingType.addEventListener('change', function () {
    currentHousing = housingType.options[housingType.selectedIndex].value;
    updatePins();
  });

})();
