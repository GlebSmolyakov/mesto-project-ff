//@todo импорт модулей
import {deleteCard, likeCard, createCard, setDeleteCardHandler} from "./card";
import {openPopup, closePopup, closePopupsOverlay} from "./modal.js";
import '../pages/index.css';
import logo from '../images/logo.svg';
import pencil from '../images/penсil.svg';
import { getUserInfo, updateProfile, updateAvatar, getCard, addNewCard, apiDeleteCard} from './api.js';
import { enableValidation, clearValidation } from './validation.js';

// @todo: добавление логотипа и иконки редактирования

document.querySelector('.logo').src = logo;
document.querySelector('.profile__image-img').src = pencil;

//@todo глобальная переменная

let userId = null;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: объявление констант попапа

const popupButtonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');

const popupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');

const closePopupProfile = popupProfile.querySelector('.popup__close');
const closePopupAddImage = popupAdd.querySelector('.popup__close');
const closePopupImage = popupImage.querySelector('.popup__close');

// @todo: объявление констант для формы

const popupFormProfile = document.querySelector('.popup_type_edit .popup__form');
const popupFormName = popupFormProfile.querySelector('.popup__input_type_name');
const popupFormDescription = popupFormProfile.querySelector('.popup__input_type_description');
const popupProfileTitle = document.querySelector('.profile__title');
const popupProfileDescription = document.querySelector('.profile__description');

// @todo: объявление констант формы фото

const popupFormAdd = popupAdd.querySelector('.popup__form');
const popupFormAddName = popupFormAdd.querySelector('.popup__input_type_card-name');
const popupFormAddUrl = popupFormAdd.querySelector('.popup__input_type_url');

// @todo константы для попапа аватара

const newImageButton = document.querySelector('.profile__image-new');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');

const popupNewAvatarForm = document.forms['new-avatar'];
const popupNewAvatarInput = popupNewAvatarForm.elements['link'];
const popupNewAvatarError = popupNewAvatarForm.querySelector('.popup__error-place-link');
const popupNewAvatarSubmit = popupNewAvatarForm.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');

const popupCloseNewImage = popupNewAvatar.querySelector('.popup__close');

// @todo константы попапа удаления фото

const popupDeleteImg = document.querySelector('.popup_type-confirm');
const popupDeleteBtn = popupDeleteImg.querySelector('.popup__close');


// @todo: константы для обработчика открытия попапа

const popupOpenImage = document.querySelector('.popup_type_image');
const popupImageCard = popupOpenImage.querySelector('.popup__image');
const popupCaption = popupOpenImage.querySelector('.popup__caption');

// @todo: константы валидации формы профиля

const formElement = document.forms['edit-profile'];
const submitButton = formElement.querySelector('.popup__button');


// @todo валидации формы фото

const formElementPlace = document.forms['new-place']
const submitButtonPlace = formElementPlace.querySelector('.popup__button');

// @todo: закрывают попап

closePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

closePopupAddImage.addEventListener('click', () => {
  closePopup(popupAdd);
});

closePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
});

popupCloseNewImage.addEventListener('click', () => {
  closePopup(popupNewAvatar);
});

popupDeleteBtn.addEventListener('click', () => {
  closePopup(popupDeleteImg);
});

closePopupsOverlay(popupDeleteBtn);
closePopupsOverlay(popupProfile);
closePopupsOverlay(popupAdd);
closePopupsOverlay(popupImage);
closePopupsOverlay(popupNewAvatar);

// @todo: обработчик открытия попапа

function processCardImage(link, name) {
  popupImageCard.src = link;
  popupImageCard.alt = name;
  popupCaption.textContent = name;
  openPopup(popupOpenImage);
}

// @todo: функция формы профиля

function processProfileForm(evt) {
  evt.preventDefault();
  submitButton.textContent = 'Сохранение...';

  const name = popupFormName.value;
  const description= popupFormDescription.value;

  updateProfile(name, description)
      .then((userData) => {
        popupProfileTitle.textContent = userData.name;
        popupProfileDescription.textContent = userData.about;
        closePopup(popupProfile);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() =>{
        submitButton.textContent = 'Сохранить';
      })
}

popupFormProfile.addEventListener('submit', processProfileForm);

// @todo: функция формы добавления карточки

function createNewCard(evt) {
  evt.preventDefault();
  submitButtonPlace.textContent = 'Сохранение...';

  const name = popupFormAddName.value;
  const link = popupFormAddUrl.value;

  addNewCard(name, link)
      .then((newCardData) => {
        const newCard = createCard(newCardData, deleteCard, likeCard, processCardImage, userId);
        placesList.prepend(newCard);
        popupFormAdd.reset();
        closePopup(popupAdd);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(()=>{
        submitButtonPlace.textContent = 'Сохранить';
      })
}

popupFormAdd.addEventListener('submit', createNewCard);


//@todo попам обновления аватара

popupNewAvatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  popupNewAvatarSubmit.textContent = 'Сохранение...';

  updateAvatar(popupNewAvatarInput.value)
      .then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
        closePopup(popupNewAvatar);
      })
      .catch((err) => {
        console.error('Ошибка при обновлении аватара:', err);
      })
      .finally(() => {
        popupNewAvatarSubmit.textContent = 'Сохранить';
      });
});

// @todo попап удаления фото

let cardIdDelete = null;
let cardElementDelete = null;

setDeleteCardHandler((cardId, cardElement) => {
  cardIdDelete = cardId;
  cardElementDelete = cardElement;
  openPopup(popupDeleteImg);
});

popupDeleteImg.addEventListener('submit', (evt) => {
  evt.preventDefault();
  apiDeleteCard(cardIdDelete)
      .then(() => {
        cardElementDelete.remove();
        cardIdDelete = null;
        cardElementDelete = null;
        closePopup(popupDeleteImg);
      })
      .catch((err) => {
        console.error(err);
      })
})

// @todo работа с сервером

Promise.all([getUserInfo(), getCard()])
    .then(([userData, cards]) => {
      userId = userData._id;

      popupProfileTitle.textContent = userData.name;
      popupProfileDescription.textContent = userData.about;
      document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

      cards.forEach(card => {
        const cardElement = createCard(card, deleteCard, likeCard, processCardImage, userId);
        placesList.appendChild(cardElement);
      });
    })
    .catch((err) => {
      console.error(err);
    });


//@todo валидация

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error-message_visible'
};

enableValidation(validationConfig);

// @todo: открывают попап

popupButtonProfile.addEventListener('click', () => {
  popupFormName.value = popupProfileTitle.textContent;
  popupFormDescription.value = popupProfileDescription.textContent;
  clearValidation(popupFormProfile, validationConfig);
  openPopup(popupProfile);
});

popupAddButton.addEventListener('click', () => {
  popupFormAdd.reset();
  clearValidation(popupFormAdd, validationConfig);
  openPopup(popupAdd);
});

newImageButton.addEventListener('click', () => {
  popupNewAvatarForm.reset();
  popupNewAvatarInput.value = '';
  clearValidation(popupNewAvatarForm, validationConfig);
  openPopup(popupNewAvatar);
});