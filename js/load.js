'use strict';

var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

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
      window.messageCtrl.sendMessage(error, message);
    }
  });

  xhr.addEventListener('error', function () {
    message = 'Произошла ошибка соединения';
    window.messageCtrl.sendMessage(error, message);
  });

  xhr.addEventListener('timeout', function () {
    message = 'Извините, запрос не успел выполниться за ' + xhr.timeout + ' мс';
    window.messageCtrl.sendMessage(error, message);
  });

  xhr.open('GET', url);
  xhr.send();
};
