import { LoadingDataError, CreateAdvertError } from './CustomError.js';

const ALERT_SHOW_TIME = 5000;
const Key = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const handleError = (error) => {
  const errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  const errorElement = errorTemplate.cloneNode(true);
  if (error instanceof LoadingDataError) {
    errorElement.querySelector('button').remove();
    errorElement.querySelector('.error__message').textContent = 'Не удалось загрузить данные с сервера!';
    showAlert(errorElement);
  } else if (error instanceof CreateAdvertError) {
    errorElement.querySelector('.error__message').textContent = 'Ошибка размещения объявления';
    showAlert(errorElement);
  }
}

const createSuccessMessage = () => {
  const successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  return successTemplate.cloneNode(true);
}

const closeMessageHandler = (evt) => {
  if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
    document.querySelector('.popup-message').remove();
  }
};

const closeMessage = (message) => {
  document.addEventListener('keydown', closeMessageHandler, {once: true});
  message.addEventListener('click', () => {
    message.remove();
    document.removeEventListener('keydown', closeMessageHandler);
  });
};


const showAlert = (element) => {
  element.style.zIndex = 1000000;
  closeMessage(element);
  document.body.append(element);

  setTimeout(() => {
    element.remove();
  }, ALERT_SHOW_TIME);
}

export { showAlert, handleError, createSuccessMessage }
