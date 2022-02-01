import { toggleFormState } from './advert-form.js';
import { renderAdvert } from './advertisement.js';
import { getData } from './api.js';
import { handleError } from './errorHandler.js';
import { filterAdverts } from './filters.js';
import { debounce } from './debounce.js';

const ADVERTS_COUNT = 10;
const MAP_ZOOM = 12;
const DECIMALS = 5;
const MAIN_PIN_ICON_PATH = '../img/main-pin.svg';
const POINT_PIN_ICON_PATH = '../img/pin.svg';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//center of Tokyo
const  LAT = 35.68041;
const  LNG = 139.76912;
const RERENDER_DELAY = 500;

const MainPinSize = {
  WIDTH: 52,
  HEIGHT: 52,
};
const PointPinSize = {
  WIDTH: 40,
  HEIGHT: 40,
};

let address = document.querySelector('#address');
address.readOnly = true;
const filters = document.querySelector('.map__filters');

const setPointsOnMap = (adverts) => {
  map.closePopup();
  const filteredAdverts = filterAdverts(adverts.slice());

  filteredAdverts
    .slice(0, ADVERTS_COUNT)
    .forEach((advert) => {
      const lat = advert.location.lat;
      const lng = advert.location.lng;

      const icon = L.icon({
        iconUrl: POINT_PIN_ICON_PATH,
        iconSize: [PointPinSize.WIDTH, PointPinSize.HEIGHT],
        iconAnchor: [PointPinSize.WIDTH/2, PointPinSize.HEIGHT],
      });

      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );

      marker
        .addTo(markerGroup)
        .bindPopup(renderAdvert(advert), {
          keepInView: true,
        });
    });
}

const updateAddressInput = (lat, lng) => address.value = `${ lat.toFixed(DECIMALS) }, ${ lng.toFixed(DECIMALS) }`;

//Not Active state
toggleFormState(false);

const onMapLoad = () => {
  toggleFormState(true);
  updateAddressInput(LAT, LNG);
  getData(
    (adverts) => {
      setPointsOnMap(adverts);
      setFiltersChange(debounce(() => setPointsOnMap(adverts), RERENDER_DELAY));
    },
    (err) => handleError(err),
  );
}

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', onMapLoad)
  .setView({
    lat: LAT,
    lng: LNG,
  }, MAP_ZOOM);

L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_ICON_PATH,
  iconSize: [MainPinSize.WIDTH, MainPinSize.HEIGHT],
  iconAnchor: [MainPinSize.WIDTH/2, MainPinSize.HEIGHT],
});

const mainPinMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  updateAddressInput(lat, lng);
});

const setFiltersChange = (cb) => {
  filters.addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
}

const setInitialAddress = () => {
  mainPinMarker.setLatLng({
    lat: LAT,
    lng: LNG,
  });
  map.setView({
    lat: LAT,
    lng: LNG,
  }, MAP_ZOOM);
  updateAddressInput(LAT, LNG);
};

export { setInitialAddress };




