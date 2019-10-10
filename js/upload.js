'use strict';

var url = 'https://js.dump.academy/keksobooking';

var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

window.upload = function (data, onSuccess) {
  var xhr = new XMLHttpRequest();
  var message;

  xhr.responseType = 'json';
  xhr.timeout = 10000;

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onSuccess(xhr.response);
      window.messageCtrl.sendMessage(success);
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

  xhr.open('POST', url, true);
  xhr.send(data);
};
