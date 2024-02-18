// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(item, {deleteCard}) {//Поясните пожалуйста, функция берется в фигурные скобки, потому что мы передаём ей в агрумент?
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  deleteButton.addEventListener("click",() => {
    deleteCard(cardElement)
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
};


// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item,{deleteCard}));//Поясните пожалуйста, функция берется в фигурные скобки, потому что мы передаём ей в агрумент?
});
