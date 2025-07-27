import { changeLikeCardStatus } from './api.js';
// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки

export function createCard(location, deleteCard, likeCard, processCardImage, userId, openConfirmPopup) {
    const cardsItem = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardsImage = cardsItem.querySelector('.card__image');
    const cardsTitle = cardsItem.querySelector('.card__title');

    cardsImage.src = location.link;
    cardsImage.alt = location.name;
    cardsTitle.textContent = location.name;

    cardsImage.addEventListener('click', () => {
        processCardImage(location.link, location.name);
    });

    const likeButton = cardsItem.querySelector('.card__like-button');
    const likesQuantity = cardsItem.querySelector('.card__likes-quantity');
    likesQuantity.textContent = location.likes.length;

    if (location.likes.some(user => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        likeCard(likeButton, location._id, likesQuantity);
    });

    const deleteCards = cardsItem.querySelector('.card__delete-button');

    if (location.owner._id !== userId) {
        deleteCards.remove();
    }else {
        deleteCards.addEventListener('click', () => {
            deleteCard(location._id, cardsItem, openConfirmPopup);
        });
    }


    return cardsItem;
}

// @todo: Функция удаления карточки и лайка карточки


export function deleteCard(cardId, cardElement, openConfirmPopup) {
    openConfirmPopup(cardId, cardElement);
}

export function likeCard(button, cardId, likesQuantity) {
    const isLiked = button.classList.contains('card__like-button_is-active');

    changeLikeCardStatus(cardId, !isLiked)
        .then((res) => {
            button.classList.toggle('card__like-button_is-active');
            likesQuantity.textContent = res.likes.length;
        })
        .catch((err) => {
            console.error('Ошибка при изменении лайка:', err);
        });
}