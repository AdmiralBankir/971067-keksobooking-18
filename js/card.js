'use strict';

(function () {

  var TYPE_LIST = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var FEATURE_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var map = document.querySelector('.map');

  window.createCard = function (cardAttr) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);

    var title = card.querySelector('.popup__title');
    title.textContent = cardAttr.offer.title;

    var address = card.querySelector('.popup__text--address');
    address.textContent = cardAttr.offer.address;

    var price = card.querySelector('.popup__text--price');
    price.textContent = cardAttr.offer.price + ' ';
    price.innerHTML += '&#x20bd;<span>/ночь</span>';

    var type = card.querySelector('.popup__type');
    type.textContent = TYPE_LIST[cardAttr.offer.type];

    setCardCapacity(card, cardAttr.offer.rooms, cardAttr.offer.guests);

    setCardTime(card, cardAttr.offer.checkin, cardAttr.offer.checkout);

    setCardFeatures(card, cardAttr.offer.features);

    var description = card.querySelector('.popup__description');
    description.textContent = cardAttr.offer.description;

    setCardPhotos(card, cardAttr.offer.photos);

    var avatar = card.querySelector('.popup__avatar');
    avatar.src = cardAttr.author.avatar;

    var mapFilters = map.querySelector('.map__filters-container');
    map.insertBefore(card, mapFilters);

    createCardListener(card);
  };

  var createCardListener = function (card) {
    var closeBtn = card.querySelector('.popup__close');

    closeBtn.addEventListener('click', function () {
      window.removeCard();
    });

    window.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, window.removeCard);
    });
  };

  var setCardCapacity = function (card, rooms, guests) {
    var capacity = card.querySelector('.popup__text--capacity');
    var roomText = 'комнаты';

    if (rooms === 1) {
      roomText = 'комната';
    } else if (rooms > 4) {
      roomText = 'комнат';
    }

    if (rooms > 0) {
      capacity.textContent = rooms + ' ' + roomText + ' ' + 'для' +
      ' ' + guests + ' ' + 'гостей';
    } else {
      capacity.textContent = '';
    }
  };

  var setCardTime = function (card, checkin, checkout) {
    var time = card.querySelector('.popup__text--time');
    time.textContent = 'Заезд после ' + checkin +
      ', выезд до ' + checkout;

  };

  var setCardFeatures = function (card, features) {
    FEATURE_LIST.forEach(function (feature) {
      var featureListElement = card.querySelector('.popup__feature' + '--' + feature);
      if (!features.includes(feature)) {
        window.util.removeElement(featureListElement);
      }
    });
  };

  var setCardPhotos = function (card, photos) {
    var photosContainer = card.querySelector('.popup__photos');
    var photoImg = photosContainer.querySelector('.popup__photo');
    photos.forEach(function (photo) {
      var sample = photoImg.cloneNode(true);
      sample.src = photo;
      photosContainer.appendChild(sample);
    });
    window.util.removeElement(photoImg);
  };

  window.removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card !== null) {
      window.util.removeElement(card);
    }
  };

})();
