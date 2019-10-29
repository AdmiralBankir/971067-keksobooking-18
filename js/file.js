'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var loadFile = function (inputChooser, outElement) {
    inputChooser.addEventListener('change', function () {
      var file = inputChooser.files[0];
      var fileName = file.name.toLocaleLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {

          if (outElement.src !== undefined) {
            outElement.src = reader.result;
          } else {
            outElement.style.backgroundImage = 'url(' + reader.result + ')';
            outElement.style.backgroundPosition = 'center';
            outElement.style.backgroundRepeat = 'no-repeat';
          }
        });
      }
      reader.readAsDataURL(file);
    });
  };

  var fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var filePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');

  var preview = document.querySelector('.ad-form-header__preview img');
  var photo = document.querySelector('.ad-form__photo');

  loadFile(fileAvatarChooser, preview);
  loadFile(filePhotoChooser, photo);

})();
