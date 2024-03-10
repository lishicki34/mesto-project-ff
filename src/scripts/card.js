import { openPopup } from "./modal";
import { closePopup } from "./modal";

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

// Функция фуллскрин
export function openImage(src, alt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupFullScrinIgm = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  popupImage.style.backgroundColor = 'rgba(0, 0, 0, .9)';

  popupFullScrinIgm.src = src;
  popupFullScrinIgm.alt = alt;
  popupCaption.textContent = popupFullScrinIgm.alt;
  
  openPopup(popupImage);
};

// 2-Функция создания новой карточки
export function createNewCard(evt, deleteCard, likeOnCard, openImage) {
  const placesList = document.querySelector('.places__list');
  const formElementNewCard = document.querySelector('.popup_type_new-card');
  const namePlaceInput = formElementNewCard.querySelector('.popup__input_type_card-name');
  const linkPlaceInput = formElementNewCard.querySelector('.popup__input_type_url');
  evt.preventDefault();
  const newCardInfo = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  };

  placesList.prepend(createCard(newCardInfo, deleteCard, likeOnCard, openImage));
  closePopup(formElementNewCard);
};
