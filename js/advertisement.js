const renderAdvert = (advert) => {
  const advertTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const offer = advert.offer;

  const advertElement = advertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;

  const offerTypeMap = {
    'palace':'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalow': 'Бунгало',
  }

  advertElement.querySelector('.popup__type').textContent = offerTypeMap[offer.type];
  advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  //features
  const featuresList = advertElement.querySelector('.popup__features');
  featuresList.innerHTML = '';

  if (!offer.features || offer.features.length === 0) {
    featuresList.classList.add('visually-hidden');
  } else {
    const featuresFragment = document.createDocumentFragment();
    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${feature}`);
      featuresFragment.appendChild(featureElement);
    })
    featuresList.appendChild(featuresFragment);
  }


  advertElement.querySelector('.popup__description').textContent = offer.description;

  //photos
  const photosList = advertElement.querySelector('.popup__photos');
  photosList.innerHTML = '';
  if (!offer.photos || offer.photos.length === 0) {
    photosList.classList.add('visually-hidden');
  } else {
    const photosFragment = document.createDocumentFragment();
    offer.photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.src = photo;
      photoElement.width = 45;
      photoElement.height = 40;
      photoElement.alt = offer.title;

      photosFragment.appendChild(photoElement);
    })
    photosList.appendChild(photosFragment);
  }

  advertElement.querySelector('.popup__avatar').src = advert.author.avatar;

  return advertElement;
}

export { renderAdvert };
