'use strict';

window.messageCtrl = {

  sendMessage: function (popupMessage, textMessage) {

    var errorText = popupMessage.querySelector('.error__message');
    var errorButton = popupMessage.querySelector('.error__button');

    if (errorButton !== null) {
      errorButton.addEventListener('click', function () {
        location.reload();
      });
    }

    if (errorText !== null) {
      errorText.innerHTML = errorText.innerHTML + '. ' + textMessage;
    }

    document.querySelector('.map').appendChild(popupMessage);
    window.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.util.removeElement(popupMessage));
    });

    window.addEventListener('click', function () {
      window.util.removeElement(popupMessage);
    });
  }
};
