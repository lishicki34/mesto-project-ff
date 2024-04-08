import '../index.css'; 
//Импорт JS файлов
import { createCard, likeOnCard, deleteCard,} from './card.js';
import { openPopup, closePopup, clickOverlayClose } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getData, updateProfile, updateCard, updateAvatar} from './api.js';
//Dom-элементы
const placesList = document.querySelector('.places__list');//Список карточек
const popups = document.querySelectorAll('.popup');//Массив попапов
const popupEditOpenButton = document.querySelector('.profile__edit-button');//Кнопка редактирования профиля
const popupAddOpenButton = document.querySelector('.profile__add-button');//Кнопка добавления новой карточки
const popupOpenAvatarEdit = document.querySelector('.profile__image-button')
//Модалки
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupAvatar = document.querySelector('.popup_type_edit-avatar')
//Информация о картинке
const popupFullScrinIgm = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
//Находим форму и поля ввода добавления новой карточки в DOM
const formElementNewCard = document.forms.new_place;
const namePlaceInput = formElementNewCard.querySelector('.popup__input_type_card-name');// Input
const linkPlaceInput = formElementNewCard.querySelector('.popup__input_type_url');// Input
//Находим форму и поля ввода редактирования профлия в DOM
const formElementEdit = document.forms.edit_profile;
const formElementAvatar = document.forms.avatar_edit;
//Инпут новой ин-ции о профиле
const avatarInput = formElementAvatar.querySelector('.popup__input_type_avatar_url')
const nameInput = formElementEdit.querySelector('.popup__input_type_name'); // Input
const descriptionInput = formElementEdit.querySelector('.popup__input_type_description');// Input
//Текущая ин-ция о профиле
const profileName = document.querySelector('.profile__title');//current
const descriptionUser = document.querySelector('.profile__description');//current
const profileImage = document.querySelector('.profile__image');
//Кнопка сабмит(сохранить) в модальных окнах
const saveButton = document.querySelector('.popup__button');
let userId;
//Данные валидации
const validationConfig = {
  selectorForm: '.popup__form',
  selectorInput: '.popup__input',
  selectorButtonSubmit: '.popup__button',
  classDisabledButton: 'popup__button_disabled',
  classVisibleError: 'popup__input-error',
  classErrorInput: 'popup__input_type_error'
};

//Проходим массив попапов
popups.forEach((popup) => {
  const popupCloseButton = popup.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', () => {closePopup(popup)});

  popup.addEventListener('mousedown', function(evt){
    clickOverlayClose(evt, popup)
  });
});

//Открытие окна редактирования профиля
popupEditOpenButton.addEventListener('click',() => {
openPopup(popupEdit);
//Получаем значения текущей ин-ции в поля ввода
nameInput.value = profileName.textContent;
descriptionInput.value = descriptionUser.textContent;
clearValidation(popupEdit, validationConfig);
});
//Открытие окна добавления новой карточки
popupAddOpenButton.addEventListener('click', () => {
openPopup(popupNewCard);
clearValidation(popupNewCard, validationConfig);
});
//Открытие окна изменения аватара
popupOpenAvatarEdit.addEventListener('click', () => {
openPopup(popupAvatar);
clearValidation(popupAvatar, validationConfig);
})

//Функция фуллскрин
export function openImage(src, alt) {
  popupFullScrinIgm.src = src;
  popupFullScrinIgm.alt = alt;
  popupCaption.textContent = popupFullScrinIgm.alt;
  
  openPopup(popupImage);
};

//Коллбэк обработчика создания новой карточки
export function createNewCard(evt) {
  evt.preventDefault();

  saveButton.textContent = "Сохранение...";

  updateCard(namePlaceInput.value, linkPlaceInput.value).then(data => {
    const addNewCard = createCard(userId, data, deleteCard, likeOnCard, openImage);
    placesList.prepend(addNewCard);
  })
  .catch (err => {
    console.error(err);
  })
  .finally(() => {
    saveButton.textContent = "Сохранить";
  });

  formElementNewCard.reset();
  closePopup(popupNewCard);
};
//Добавляем слушатель на кнопку сохранения новой карточки
formElementNewCard.addEventListener('submit', createNewCard);

//Коллбэк обработчика сохранения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  saveButton.textContent = "Сохранение...";

  profileName.textContent = nameInput.value;
  descriptionUser.textContent = descriptionInput.value;
// Функция отправки данных редактирования профиля на сервер.
  updateProfile(nameInput.value, descriptionInput.value).then(data => {
    const userName = data.name;
    const userAbout = data.about;
    const userAvatar = data.avatar;

    profileName.textContent = userName;
    descriptionUser.textContent = userAbout;
    profileImage.style.backgroundImage = `url(${userAvatar})`;
  }) 
  .catch(err => {
      console.error(err);
  })
  .finally(() => {
    saveButton.textContent = "Сохранить";
  });

  closePopup(popupEdit);
};
//Добавляем слушатель на кнопку сохранения данных профиля
formElementEdit.addEventListener('submit',handleProfileFormSubmit);

//Коллбэк обработчика сохранения изменения аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  saveButton.textContent = "Сохранение...";

  updateAvatar(avatarInput.value).then(data =>{
    const avatarImg = data.avatar;
    profileImage.style.backgroundImage = `url(${avatarImg})`;
    closePopup(popupAvatar);
  })
  .catch(err =>{
    console.error(err)
  })
  .finally(() => {
    saveButton.textContent = "Сохранить";
  });

  formElementAvatar.reset();
}
//Добовляем слушатель на кнопку сохранения изменения аватара
formElementAvatar.addEventListener('submit', handleAvatarFormSubmit);

//Вызываем функцию включения валидации
enableValidation(validationConfig);

//Получаем список карточек с сервера и данные профиля
getData().then((res) => {
  const [userData, cardsData] = res;

  const userName = userData.name;
  const userAbout = userData.about;
  const userAvatar = userData.avatar;
  userId = userData._id;

  profileName.textContent = userName,
  descriptionUser.textContent = userAbout,
  profileImage.style.backgroundImage = `url(${userAvatar})`

  cardsData.forEach((card) => {
    const cardElement = createCard(userId, card, deleteCard, likeOnCard, openImage);
    placesList.append(cardElement);
  });
})
.catch(err => {
  console.error(err);
});

