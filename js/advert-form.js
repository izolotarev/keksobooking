const offerType = document.querySelector('#type');
const offerPrice = document.querySelector('#price');

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

offerType.addEventListener('change', () => {
  switch (offerType.value) {
    case 'bungalow':
      offerPrice.placeholder = 1000;
      offerPrice.min = 1000;
      break;
    case 'flat':
      offerPrice.placeholder = 5000;
      offerPrice.min = 5000;
      break;
    case 'house':
      offerPrice.placeholder = 15000;
      offerPrice.min = 15000;
      break;
    case 'palace':
      offerPrice.placeholder = 25000;
      offerPrice.min = 25000;
      break;
    default:
      offerPrice.placeholder = 5000;
      offerPrice.min = 5000;
  }
});

const addSyncTimeHandler = (timeFirst, timeSecond) => {
  timeFirst.addEventListener('change', () => {
    switch (timeFirst.value) {
      case '12:00':
        timeSecond.value = '12:00';
        break;
      case '13:00':
        timeSecond.value = '13:00';
        break;
      case '14:00':
        timeSecond.value = '14:00';
        break;
      default:
        timeSecond.value = '12:00';
    }
  });
}

addSyncTimeHandler(timein, timeout);
addSyncTimeHandler(timeout, timein);
