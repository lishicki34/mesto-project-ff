// Открываем попап
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', pressEscClose);
};

// Закрываем попап
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  window.removeEventListener('keydown', pressEscClose);
  popup.removeEventListener('mousedown', clickOverlayClose);
};

// функция закрытия по кнопке esc
export function pressEscClose(evt) {
  if(evt.key === 'Escape'){
    const currentPopup = document.querySelector('.popup_is-opened');
    closePopup(currentPopup);
  }
};

// Функция закрытия по клику на оверлее
export function clickOverlayClose(evt, popup) {
  if (evt.target === popup) {
    closePopup(popup);
  }
};