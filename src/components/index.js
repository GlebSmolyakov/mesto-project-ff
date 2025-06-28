import initialCards from './cards.js';
import {deleteCard, likeCard, createCard} from "./card";
import {openPopup, closePopup, closePopupsOverlay} from "./modal.js";
import '../pages/index.css';
import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';

// @todo: добавление иконок, через html не добавляется в dist

document.querySelector('.logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  const cardList = createCard(card, deleteCard, likeCard);
  placesList.append(cardList);
});


// @todo: объявление констант попапа

const popupButtonProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_edit');

const popupAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');

const closePopupProfile = popupProfile.querySelector('.popup__close');
const closePopupAddImage = popupAdd.querySelector('.popup__close');
const closePopupImage = popupImage.querySelector('.popup__close');

// @todo: открывают попап

popupButtonProfile.addEventListener('click', () => {
  openPopup(popupProfile);
});

popupAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

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

closePopupsOverlay(popupProfile);
closePopupsOverlay(popupAdd);
closePopupsOverlay(popupImage);
// @todo: объявление констант для формы

const popupForm = document.querySelector('.popup_type_edit .popup__form');
const popupFormName = popupForm.querySelector('.popup__input_type_name');
const popupFormDescription = popupForm.querySelector('.popup__input_type_description');
const popupProfileTitle = document.querySelector('.profile__title');
const popupProfileDescription = document.querySelector('.profile__description');

// @todo: функция формы профиля

function processProfileForm(evt) {
  evt.preventDefault();
  popupProfileTitle.textContent = popupFormName.value;
  popupProfileDescription.textContent = popupFormDescription.value;
  closePopup(popupProfile);
}

popupForm.addEventListener('submit', processProfileForm);

popupButtonProfile.addEventListener('click', () => {
  popupFormName.value = popupProfileTitle.textContent;
  popupFormDescription.value = popupProfileDescription.textContent;
  openPopup(popupProfile);
});

// @todo: объявление констант формы фото

const popupFormAdd = popupAdd.querySelector('.popup__form');
const popupFormAddName = popupFormAdd.querySelector('.popup__input_type_card-name');
const popupFormAddUrl = popupFormAdd.querySelector('.popup__input_type_url');

// @todo: функция добавление фото

function createNewCard(evt) {
  evt.preventDefault();

  const name = popupFormAddName.value;
  const url = popupFormAddUrl.value;

  const newCard = createCard({ name, url }, deleteCard, likeCard);
  placesList.prepend(newCard);

  popupFormAdd.reset();
  closePopup(popupAdd);
}

popupFormAdd.addEventListener('submit', createNewCard);

