// Импортируем изображения с помощью Webpack
const amsterdamImage = new URL('../images/cards_images/amsterdam.jpeg', import.meta.url);
const antwerpenImage = new URL('../images/cards_images/antwerpen.jpeg', import.meta.url);
const istanbulImage = new URL('../images/cards_images/istanbul.jpeg', import.meta.url);
const kaliningradImage = new URL('../images/cards_images/kaliningrad.jpeg', import.meta.url);
const parisImage = new URL('../images/cards_images/paris.jpeg', import.meta.url);
const rigaImage = new URL('../images/cards_images/riga.jpeg', import.meta.url);

// Массив карточек с правильными ссылками
const initialCards = [
  { name: 'Амстердам', link: amsterdamImage },
  { name: 'Антверпен', link: antwerpenImage },
  { name: 'Стамбул', link: istanbulImage },
  { name: 'Калининградская область', link: kaliningradImage },
  { name: 'Париж', link: parisImage },
  { name: 'Рига', link: rigaImage },
];

export default initialCards;

