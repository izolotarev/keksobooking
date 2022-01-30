import { LoadingDataError, CreateAdvertError } from './CustomError.js';

const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new LoadingDataError(`${response.status} ${response.statusText}`);
    })
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch((err) => {
      onError(err);
    })
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking1',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      throw new CreateAdvertError(`${response.status} ${response.statusText}`);
    })
    .catch((err) => {
      onError(err);
    });
};


export { getData, sendData };
