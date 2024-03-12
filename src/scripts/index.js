import '../index.css'; 
import { initialCards } from "./cards.js";
import { createCard, likeOnCard, deleteCard,} from './card.js';
import { openPopup, closePopup, clickOverlayClose } from './modal.js';
//Dom-элементы
const placesList = document.querySelector('.places__list');//Список карточек
const popups = document.querySelectorAll('.popup');//Массив попапов
const popupEditOpenButton = document.querySelector('.profile__edit-button');//Кнопка редактирования профиля
const popupAddOpenButton = document.querySelector('.profile__add-button');//Кнопка добавления новой карточки
//Модалки
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
//Информация о картинке
const popupFullScrinIgm = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
// Находим форму и поля ввода добавления новой карточки в DOM
const formElementNewCard = document.querySelector('.popup_type_new-card');
const namePlaceInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const linkPlaceInput = formElementNewCard.querySelector('.popup__input_type_url');
// Находим форму и поля ввода редактирования профлия в DOM
const formElementEdit = document.forms.edit_profile;
//Инпут новой ин-ции о профиле
const nameInput = formElementEdit.querySelector('.popup__input_type_name'); //edit
const descriptionInput = formElementEdit.querySelector('.popup__input_type_description');//edit
//Текущая ин-ция о профиле
const profileName = document.querySelector('.profile__title');//current
const descriptionUser = document.querySelector('.profile__description');//current

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
popupEditOpenButton.addEventListener('click',() => {openPopup(popupEdit);
//Получаем значения текущей ин-ции в поля ввода
nameInput.value = profileName.textContent;
descriptionInput.value = descriptionUser.textContent;});

// Открытие модалки добавления новой карточки
popupAddOpenButton.addEventListener('click', () => {openPopup(popupNewCard)});

// Функция фуллскрин
export function openImage(src, alt) {
  popupFullScrinIgm.src = src;
  popupFullScrinIgm.alt = alt;
  popupCaption.textContent = popupFullScrinIgm.alt;
  
  openPopup(popupImage);
};

//Функция создания новой карточки
export function createNewCard(evt, deleteCard, likeOnCard, openImage) {
  evt.preventDefault();
  const newCardInfo = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  };
  evt.target.reset();

  placesList.prepend(createCard(newCardInfo, deleteCard, likeOnCard, openImage));
  closePopup(formElementNewCard);
};

// Обработчик «отправки» формы профиля
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    descriptionUser.textContent = descriptionInput.value;
    closePopup(popupEdit);
};

//Добавляем слушателя к форме редактирования профиля
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

//Добавляем слушателя к форме добавления новой карточки
formElementNewCard.addEventListener('submit', (evt) => {createNewCard(evt, deleteCard, likeOnCard, openImage)});

/*Геннадий, доброго времени суток! Ваше сообщение: Элементы, которые являются константами, 
нужно найти 1 раз вверху файла и использовать тут уже их переменные,
чтобы не тратить зря ресурсы на постоянный поиск. 
В чек-листе есть такой пункт: Поиск одного и того же DOM-элемента не происходит дважды. 
Нужно объявлять переменную, а потом ее уже использовать в коде.

Правильно ли я понимаю ваше замечание:
Если поиск дом-элемента происходит в функции(как сделал я), 
то при каждой итерации функции, поиск снова повторяется?
(Каждое повторение функции ищешь элемент)
В отличии от объявления переменной в глобальной области
С поиском дом-элемента, и последующим использованием непосредственно переменной(как нужно сделать).
(Один раз нашел элемент и пользуешься).
Можно кратенькое пояснение по этому вопросу*/
