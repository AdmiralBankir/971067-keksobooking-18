'use strict';

(function () {
  window.messageCtrl = {

    sendMessage: function (popupMessage, textMessage, type) {

      var errorText = popupMessage.querySelector('.error__message');

      var onRemoveElementKeydown = function (evt) {
        window.util.isEnterEvent(evt, window.util.removeElement(popupMessage));
        window.removeEventListener('keydown', onRemoveElementKeydown);
        window.removeEventListener('click', onRemoveElementClick);
      };

      var onRemoveElementClick = function () {
        window.util.removeElement(popupMessage);
        window.removeEventListener('click', onRemoveElementClick);
        window.removeEventListener('keydown', onRemoveElementKeydown);
      };

      if (errorText !== null) {
        errorText.textContent += '. ' + textMessage;
        if (type === 'load') {
          window.pageStateCtrl.deactivatePage();
        }
      }

      document.querySelector('.map').appendChild(popupMessage);

      window.addEventListener('keydown', onRemoveElementKeydown);
      window.addEventListener('click', onRemoveElementClick);
    }
  };
})();
