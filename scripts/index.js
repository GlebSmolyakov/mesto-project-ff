// @todo: Темплейт карточки

  const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

  const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function cardCreate(location, deleteCard) {
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

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  const cardList = cardCreate(card, deleteCard);
  placesList.append(cardList);
});
