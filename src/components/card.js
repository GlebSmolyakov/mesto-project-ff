import {openPopup} from "./modal.js";

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard(location, deleteCard, likeCard) {
    const cardsItem = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardsImage = cardsItem.querySelector('.card__image');
    const cardsTitle = cardsItem.querySelector('.card__title');

    cardsImage.src = location.link;
    cardsImage.alt = location.name;
    cardsTitle.textContent = location.name;

    cardsImage.addEventListener('click', () => {
        const popupOpenImage = document.querySelector('.popup_type_image');
        const popupImage = popupOpenImage.querySelector('.popup__image');
        const popupCaption = popupOpenImage.querySelector('.popup__caption');

        popupImage.src = location.link ;
        popupImage.alt = location.name;
        popupCaption.textContent = location.name;

        openPopup(popupOpenImage);
    });

    const likeButton = cardsItem.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeCard(likeButton);
    });

    const deleteCards = cardsItem.querySelector('.card__delete-button');
    deleteCards.addEventListener('click', () => {
        deleteCard(cardsItem);
    });


    return cardsItem;
}

// @todo: Функция удаления карточки и лайка карточки

export function deleteCard(cardElement) {
    cardElement.remove();
}

export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
}
