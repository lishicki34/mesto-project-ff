import '../index.css'; 
import { initialCards } from "./cards.js";
import { createCard } from './card.js';
import { openImage } from './card.js';
import { likeOnCard } from './card.js';
import { deleteCard } from './card.js';
import { openPopup } from './modal.js';
import { closePopup } from './modal.js';
import { clickOverlayClose } from './modal.js';
import { createNewCard } from './card.js';

//DOM узлы
const placesList = document.querySelector('.places__list');
//Popups-элементы, переменные
const popups = document.querySelectorAll('.popup');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

//Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item, deleteCard, likeOnCard, openImage));
});

// Проходим массив попапов
popups.forEach((popup) => {
  const popupCloseButton = popup.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', () => {closePopup(popup)});

  popup.addEventListener('mousedown', function(evt){
    clickOverlayClose(evt, popup)
  });
});

// Открытие редактирования профиля
popupEditOpenButton.addEventListener('click', () => {openPopup(popupEdit)});
// Открытие модалки добавления новой карточки
popupAddOpenButton.addEventListener('click', () => {openPopup(popupNewCard)});

// Редактируем ин-цию о себе
// 1-Находим форму и поля ввода в DOM
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const descriptionInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const descriptionUser = document.querySelector('.profile__description');

// 2-Получаем значения актуальной ин-ции в поля ввода
nameInput.value = profileName.textContent;
descriptionInput.value = descriptionUser.textContent;

// 3-Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    descriptionUser.textContent = descriptionInput.value;
    closePopup(popupEdit);
};

// 4-Прикрепляем обработчик к форме редактирования профиля
formElement.addEventListener('submit', handleFormSubmit);

// Добовление новой карточки
//Находим форму в DOM
const formElementNewCard = document.querySelector('.popup_type_new-card');
//Добовляем обработчик к форме новой добавления карточки
formElementNewCard.addEventListener('submit', (evt) => {createNewCard(evt, deleteCard, likeOnCard, openImage)});

