'use strict';

var sendErrorMessage = function (message) {
  var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var errorText = error.querySelector('.error__message');
  var map = document.querySelector('.map');

  errorText.innerHTML = errorText.innerHTML + '. ' + message;

  map.appendChild(error);
};

window.load = function (url, onSuccess) {
  var xhr = new XMLHttpRequest();
  var message;

  xhr.timeout = 10000;
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
    } else {
      message = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      sendErrorMessage(message);
    }
  });

  xhr.addEventListener('error', function () {
    message = 'Произошла ошибка соединения';
    sendErrorMessage(message);
  });

  xhr.addEventListener('timeout', function () {
    message = 'Извините, запрос не успел выполниться за ' + xhr.timeout + ' мс';
    sendErrorMessage(message);
  });

  xhr.open('GET', url);
  xhr.send();
};
