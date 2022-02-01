const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const AVATAR_FILLER_PATH = 'img/muffin-grey.svg';
const IMAGE_BORDER_RADIUS = '5px';

const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview>img');
const housingInput = document.querySelector('.ad-form__input');
const housingPreview = document.querySelector('.ad-form__photo');
const housingPreviewTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

const PreviewImgSettings = {
  WIDTH: '70',
  HEIGHT: '70',
};

const FillerAvatarSettings = {
  WIDTH: '40',
  HEIGHT: '44',
};

const imgPreviewHandler = (input, preview) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const removeAvatar = () => {
  avatarPreview.src = AVATAR_FILLER_PATH;
  avatarPreview.width = FillerAvatarSettings.WIDTH;
  avatarPreview.height = FillerAvatarSettings.HEIGHT;
  avatarPreview.parentNode.style.removeProperty('padding');
};

const createAvatar = () => {
  avatarPreview.width = PreviewImgSettings.WIDTH;
  avatarPreview.height = PreviewImgSettings.HEIGHT;
  avatarPreview.parentNode.style.padding = '0';
  avatarPreview.style.borderRadius = IMAGE_BORDER_RADIUS;
  return avatarPreview;
};

const removeHousingPreview = () => {
  if (housingPreview.hasChildNodes()) {
    housingPreview.removeChild(housingPreview.children[0]);
  }
};

const createHousingPreview = () => {
  if (housingPreview.hasChildNodes()) {
    return housingPreview.children[0];
  }
  const previewImg = housingPreviewTemplate.cloneNode(true);
  previewImg.width = PreviewImgSettings.WIDTH;
  previewImg.height = PreviewImgSettings.HEIGHT;
  previewImg.style.borderRadius = IMAGE_BORDER_RADIUS;
  removeHousingPreview();
  housingPreview.appendChild(previewImg);
  return previewImg;
};

avatarInput.addEventListener('change', () => imgPreviewHandler(avatarInput, createAvatar()));

housingInput.addEventListener('change', () => {
  imgPreviewHandler(housingInput, createHousingPreview());
});

export {removeAvatar, removeHousingPreview};
