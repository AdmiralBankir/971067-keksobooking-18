'use strict';

window.messageCtrl = {

  sendMessage: function (popupMessage, textMessage) {

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
      errorText.innerHTML = errorText.innerHTML + '. ' + textMessage;
      window.pageStateCtrl.deactivatePage();
    }

    document.querySelector('.map').appendChild(popupMessage);

    window.addEventListener('keydown', onRemoveElementKeydown);
    window.addEventListener('click', onRemoveElementClick);
  }
};
