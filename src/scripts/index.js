import '../index.css'; 
import { initialCards } from "./cards.js";
import { createCard, likeOnCard, deleteCard,} from './card.js';
import { openPopup, closePopup, clickOverlayClose } from './modal.js';
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
popupEditOpenButton.addEventListener('click',
() => {openPopup(popupEdit),
  //Получаем значения актуальной ин-ции в поля ввода
nameInput.value = profileName.textContent;
descriptionInput.value = descriptionUser.textContent;});
// Открытие модалки добавления новой карточки
popupAddOpenButton.addEventListener('click', () => {openPopup(popupNewCard)});

// Функция фуллскрин
export function openImage(src, alt) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupFullScrinIgm = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  // popupImage.style.backgroundColor = 'rgba(0, 0, 0, .9)';

  popupFullScrinIgm.src = src;
  popupFullScrinIgm.alt = alt;
  popupCaption.textContent = popupFullScrinIgm.alt;
  
  openPopup(popupImage);
};

// 2-Функция создания новой карточки
export function createNewCard(evt, deleteCard, likeOnCard, openImage) {
  const namePlaceInput = formElementNewCard.querySelector('.popup__input_type_card-name');
  const linkPlaceInput = formElementNewCard.querySelector('.popup__input_type_url');
  evt.preventDefault();
  const newCardInfo = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  };
  evt.target.reset();

  placesList.prepend(createCard(newCardInfo, deleteCard, likeOnCard, openImage));
  closePopup(formElementNewCard);
};

// Редактируем ин-цию о себе
// Находим форму и поля ввода в DOM
const formElementEdit = document.forms.edit_profile;
const nameInput = formElementEdit.querySelector('.popup__input_type_name'); //edit
const descriptionInput = formElementEdit.querySelector('.popup__input_type_description');//edit
const profileName = document.querySelector('.profile__title');//current
const descriptionUser = document.querySelector('.profile__description');//current

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    descriptionUser.textContent = descriptionInput.value;
    closePopup(popupEdit);
};

// 4-Прикрепляем обработчик к форме редактирования профиля
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// Добовление новой карточки
//Находим форму в DOM
const formElementNewCard = document.querySelector('.popup_type_new-card');
//Добовляем обработчик к форме новой добавления карточки
formElementNewCard.addEventListener('submit', (evt) => {createNewCard(evt, deleteCard, likeOnCard, openImage)});

