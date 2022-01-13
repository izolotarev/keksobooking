import { createAdvertisements } from './data.js';

const adverts = createAdvertisements();

const mapCanvas = document.querySelector('#map-canvas');

const advertTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderAdverts = () => {
  const advertsFragment = document.createDocumentFragment();

  const advert = adverts[0];
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

  const featuresList = advertElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  const featuresFragment = document.createDocumentFragment();
  offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(`popup__feature--${feature}`);
    featuresFragment.appendChild(featureElement);
  })
  featuresList.appendChild(featuresFragment);

  advertElement.querySelector('.popup__description').textContent = offer.description;

  const photosList = advertElement.querySelector('.popup__photos');
  photosList.innerHTML = '';
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

  advertElement.querySelector('.popup__avatar').src = advert.author.avatar;



  advertsFragment.appendChild(advertElement);

  mapCanvas.appendChild(advertsFragment);
}

export { renderAdverts };
