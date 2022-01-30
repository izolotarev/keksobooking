import { sendData } from './api.js';
import { handleError, showAlert, createSuccessMessage } from './errorHandler.js';
import { clearFilters } from './filters.js';

const offerType = document.querySelector('#type');
const offerPrice = document.querySelector('#price');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

const OfferTypePrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
}

const NumberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const onOfferTypeChange = () => {
  offerPrice.placeholder = OfferTypePrice[offerType.value.toUpperCase()];
  offerPrice.min = OfferTypePrice[offerType.value.toUpperCase()];
}

offerType.addEventListener('change', onOfferTypeChange);

const addSyncTimeHandler = (timeFirst, timeSecond) => {
  timeFirst.addEventListener('change', () => {
    timeSecond.value = timeFirst.value;
  });
}

addSyncTimeHandler(timein, timeout);
addSyncTimeHandler(timeout, timein);

//Switch states
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFieldsets = mapFiltersForm.querySelectorAll('fieldset, select');

const toggleFormState = (active) => {
  adForm.classList.toggle('ad-form--disabled', !active);
  adFormFieldsets.forEach(fieldset => fieldset.disabled = !active);
  mapFiltersForm.classList.toggle('map__filters--disabled', !active);
  mapFiltersFieldsets.forEach(fieldset => fieldset.disabled = !active);
}

toggleFormState(false);

//validation
const titleInput = adForm.querySelector('#title');

titleInput.addEventListener('invalid', () => {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

const roomNumberInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const capacityInputOptions = capacityInput.querySelectorAll('option');

const validateRooms = () => {
  const roomValue = roomNumberInput.value;
  capacityInputOptions.forEach((guest) => {
    const isDisabled = (NumberOfGuests[roomValue].indexOf(guest.value) === -1);
    guest.selected = NumberOfGuests[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

const onRoomNumberChange = () => {
  validateRooms();
};

roomNumberInput.addEventListener('change', onRoomNumberChange);

validateRooms();

const onAdvertFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    () => showAlert(createSuccessMessage(), true),
    (err) => handleError(err),
    new FormData(evt.target),
  )
}

adForm.addEventListener('submit', onAdvertFormSubmit);

const setFormInitialState = (setInitialAddress) => {
  adForm.reset();
  onOfferTypeChange();
  validateRooms();
  setInitialAddress();
  clearFilters();
}

const resetButton = adForm.querySelector('.ad-form__reset');

const addResetButtonEventHandler = (setInitialAddress) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setFormInitialState(setInitialAddress);
  });
}


export { toggleFormState, addResetButtonEventHandler };

