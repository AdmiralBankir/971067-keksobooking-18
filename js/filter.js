'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var filterOption = {
    housing: 'any'
  };

  var getRank = function (pin) {
    var rank = 0;

    if (pin.offer.type === filterOption.housing) {
      rank += 5;
    }

    return rank;
  };

  var updatePins = function () {
    window.ctrlPins.removePinsOnMap();
    window.renderPins(window.dataPins.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = window.dataPins.indexOf(right) - window.dataPins.indexOf(left);
      }
      return rankDiff;
    }));
  };

  var getFiltervalue = function () {
    filterForm.addEventListener('change', function () {
      filterOption.housing = housingType.options[housingType.selectedIndex].value;
      updatePins();
    });
  };

  getFiltervalue();
})();
