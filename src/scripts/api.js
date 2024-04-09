// import { reject } from "core-js/fn/promise";

import { data } from "autoprefixer";
// Конфиг для запросов
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-10",
  headers: {
    authorization: "730f059c-8441-4382-a1de-5675ec69148e",
    "Content-Type": "application/json",
  },
};
// Вспомогательная функция
function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//Запрос получения данных профиля
const getProfile = () => {
return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
.then(handleResponse);
};
//Запрос получения данных о карточках
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(handleResponse)
};
//
export const getData = async () => {
  return await Promise.all([getProfile(), getCards()]);
};
//Запрос отправки изменения данных профиля на сервер
export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    }),
  })
  .then(handleResponse);
}
//Запрос добавления новой карточки на сервер
export const updateCard = (name, link) => {
  return fetch (`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    }),
  })
  .then(handleResponse);
}
//Запрос удаления карточки с сервера
export const deleteCardById = (cardId) => {
  return fetch (`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers : config.headers,
  })
  .then(handleResponse);
}
//Запрос лайка на сервер(+лайк)
export const likeCard = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponse);
};
//Запрос "дизлайка"(-лайк)
export const dislikeCard = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse);
};
//Запрос на обновление аватара
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
  .then(handleResponse);
}