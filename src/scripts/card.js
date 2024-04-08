import { deleteCardById, likeCard, dislikeCard} from "./api";
const likeState = {};
const cardTemplate = document.querySelector('#card-template').content;

//Функция создания карточки
export function createCard(userId, data, deleteCard, likeOnCard, openImage) {
  // Темплейт карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.like__counter');
  
  cardElement.dataset.id = data._id;

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  const cardId = data._id;
  const isLiked = data.likes.some(like => like._id === userId)
  
  // Проверяем чья карточка
  if(userId === data.owner._id) {
    deleteButton.addEventListener('click',() => {
      deleteCard(cardId, cardElement)});
  } else {
    deleteButton.remove();
  }

  // Проверяем состояние лайка
  if(isLiked) {
    likeButton.classList.add('card__like-button_is-active');
    likeState[cardId] = true;
  }
  likeCounter.textContent = data.likes.length

  cardImage.addEventListener('click', () => {openImage(data.link, data.name)});
 
  likeButton.addEventListener('click',() => {likeOnCard(cardId, likeButton, likeCounter)});

  return cardElement;
};

//Функция лайк
export function likeOnCard (cardId, likeButton, likeCounter) {
  const likeMethod = likeState[cardId] ? dislikeCard : likeCard;
  likeMethod(cardId).then(data => {
    likeButton.classList.toggle('card__like-button_is-active');
    likeCounter.textContent = data.likes.length
    likeState[cardId] = !likeState[cardId];
  })
  .catch(err => {
    console.error(err)
  })
};

//Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  deleteCardById(cardId, cardElement).then(() => {
    cardElement.remove();
  })
  .catch(err => {
    console.error(err)
  })
};