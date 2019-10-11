'use strict';

window.sendRequest = function (url, data, type, onSuccess) {
  var xhr = new XMLHttpRequest();
  var message;
  var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  xhr.timeout = 10000;
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
      if (type === 'upload') {
        window.messageCtrl.sendMessage(success);
      }
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

  if (type === 'upload') {
    xhr.open('POST', url, true);
  } else {
    xhr.open('GET', url);
  }
  xhr.send(data);
};
