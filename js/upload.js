'use strict';

var url = 'https://js.dump.academy/keksobooking';

window.upload = function (data, onSuccess) {
  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    onSuccess(xhr.response);
  });

  xhr.open('POST', url, true);
  xhr.send(data);
};
