import { getRandomArbitrary, getRandomArrayElement, makeUniqueRandomIntegerGenerator } from './util.js';

const MAX_PRICE = 2000000;
const MAX_ROOMS = 10;
const MAX_GUESTS = 20;
const X_MIN = 35.65000;
const X_MAX = 35.70000;
const Y_MIN = 139.70000;
const Y_MAX = 139.80000;
const LOCATION_PRECISION = 5;
const ADS_COUNT = 10;

const TITLES = [
  'Perfect place to live in',
  'Very hot offer',
  'Do not miss this offer',
  'The home of your dream',
  'The home you always wanted to buy',
  'The best opportunity on the market',
  'Buy now and live happy',
  'Follow your heart and buy this house',
  'Dreams come true once you buy it',
  'The mansion for happy family',
];

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURE_NAMES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Very cozy place',
  'Nothing feels like home',
  'Home sweet home',
  'Many famous people used to live here',
  'The neighbors are amazing people',
  'The school is very close',
  'Walmart is in 15 minutes ride',
  'Brand new furniture',
  'Free swimming pool in the area',
  'Free parking for 2 cars',
];

const PHOTO_LINKS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const createFeatures = () => {
  const arrayLength = getRandomArbitrary(1, FEATURE_NAMES.length);
  const features = [];

  while (features.length < arrayLength) {
    let feature = getRandomArrayElement(FEATURE_NAMES);
    if (!features.some(f => f === feature)) {
      features.push(feature);
    }
  }
  return features;
}

const createPhotos = () => {
  const arrayLength = getRandomArbitrary(1, PHOTO_LINKS.length);
  const photos = [];

  while (photos.length < arrayLength) {
    let photo = getRandomArrayElement(PHOTO_LINKS);
    if (!photos.some(ph => ph === photo)) {
      photos.push(photo);
    }
  }
  return photos;
}

const createOffer = (location) => {
  return {
    title: getRandomArrayElement(TITLES),
    address: `${location.x}, ${location.y}`,
    price: getRandomArbitrary(1, MAX_PRICE),
    type: getRandomArrayElement(OFFER_TYPES),
    rooms: getRandomArbitrary(1, MAX_ROOMS),
    guests: getRandomArbitrary(1, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECK_IN_OUT),
    checkout: getRandomArrayElement(CHECK_IN_OUT),
    features: createFeatures(),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: createPhotos(),
  }
}

const createLocation = () => {
  return {
    x: getRandomArbitrary(X_MIN, X_MAX, LOCATION_PRECISION),
    y: getRandomArbitrary(Y_MIN, Y_MAX, LOCATION_PRECISION),
  }
}

const createAdvert = (avatar, location) => {
  return {
    author: { avatar },
    offer: createOffer(location),
    location,
  };
}


const createAdvertisements = () => {
  let advertisements = [];

  const getUniqueRandomInteger = makeUniqueRandomIntegerGenerator(1, ADS_COUNT);

  for (let i = 1; i < ADS_COUNT + 1; i++) {
    const location = createLocation();
    let num = getUniqueRandomInteger();
    let index = num < 10 ? `0${num}` : num;

    let advert = createAdvert(`../img/avatars/user${index}.png`, location);
    advertisements.push(advert);
  }
  return advertisements;
}


export { createAdvertisements };
