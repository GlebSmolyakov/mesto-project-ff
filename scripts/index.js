// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

function cardCreate(location, deleteCard) {
  const cardsTemplate = document.querySelector('#card-template').content;
  const cardsItem = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardsImage = cardsItem.querySelector('.card__image');
  const cardsTitle = cardsItem.querySelector('.card__title');

  cardsImage.src = location.link;
  cardsImage.alt = location.name;
  cardsTitle.textContent = location.name;

  const cardsDelete = cardsItem.querySelector('.card__delete-button');
  cardsDelete.addEventListener('click', () => {
    deleteCard(cardsItem);
  });

  return cardsItem;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((card) => {
  const cardList = cardCreate(card, deleteCard);
  placesList.append(cardList);
});