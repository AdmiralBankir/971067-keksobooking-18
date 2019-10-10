'use strict';

var url = 'https://js.dump.academy/keksobooki1ng';

var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

var sendMessage = function (popupMessage, textMessage) {

  var errorText = popupMessage.querySelector('.error__message');

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
};

window.upload = function (data, onSuccess) {
  var xhr = new XMLHttpRequest();
  var message;

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
      sendMessage(success);
    } else {
      message = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      sendMessage(error, message);
    }
  });

  xhr.addEventListener('error', function () {
    message = 'Произошла ошибка соединения';
    sendMessage(error, message);
  });

  xhr.addEventListener('timeout', function () {
    message = 'Извините, запрос не успел выполниться за ' + xhr.timeout + ' мс';
    sendMessage(error, message);
  });

  xhr.open('POST', url, true);
  xhr.send(data);
};
