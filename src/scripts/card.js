

// Функция лайк
export function likeOnCard (likeButton){
  likeButton.classList.toggle('card__like-button_is-active');
};

//Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
};

//Функция создания карточки
export function createCard(item, deleteCard, likeOnCard, openImage) {
  // Темплейт карточки
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  cardImage.addEventListener('click', () => {openImage(cardImage.src, cardImage.alt)});
  deleteButton.addEventListener('click',() => deleteCard(cardElement));
  likeButton.addEventListener('click',() => likeOnCard(likeButton));

  return cardElement;
};