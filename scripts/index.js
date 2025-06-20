// @todo: Темплейт карточки

  const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

  const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(location, deleteCard) {
  const cardsItem = cardsTemplate.querySelector('.card').cloneNode(true);
  const cardsImage = cardsItem.querySelector('.card__image');
  const cardsTitle = cardsItem.querySelector('.card__title');

  cardsImage.src = location.link;
  cardsImage.alt = location.name;
  cardsTitle.textContent = location.name;

  const deleteCards = cardsItem.querySelector('.card__delete-button');
  deleteCards.addEventListener('click', () => {
    deleteCard(cardsItem);
  });

  return cardsItem;
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  const cardList = createCard(card, deleteCard);
  placesList.append(cardList);
});
