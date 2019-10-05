'use strict';

window.MIN_Y_MAP = 130;
window.MAX_Y_MAP = 630;
var ENTER_KEYCODE = 13;

window.util = {
  isEnterEvent: function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  },

  randomInt: function (min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  }
};
