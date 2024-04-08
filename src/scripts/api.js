// import { reject } from "core-js/fn/promise";

import { data } from "autoprefixer";

//Запрос получения данных профиля
const getProfile = () => {
return fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
  headers: {
    authorization: '730f059c-8441-4382-a1de-5675ec69148e'
  }
})
.then(res => res.json())
};
//Запрос получения данных о карточках
const getCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-10/cards', {
    headers: {
      authorization: '730f059c-8441-4382-a1de-5675ec69148e',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
};
//
export const getData = async () => {
  return await Promise.all([getProfile(), getCards()]);
};
//Запрос отправки изменения данных профиля на сервер
export const updateProfile = (name, about) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '730f059c-8441-4382-a1de-5675ec69148e',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    }),
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
//Запрос добавления новой карточки на сервер
export const updateCard = (name, link) => {
  return fetch ('https://nomoreparties.co/v1/wff-cohort-10/cards', {
    method: 'POST',
    headers: {
      authorization: '730f059c-8441-4382-a1de-5675ec69148e',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    }),
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch(err => {
    console.error(err)
  })
}
//Запрос удаления карточки с сервера
export const deleteCardById = (cardId) => {
  return fetch (`https://nomoreparties.co/v1/wff-cohort-10/cards/${cardId}`,{
    method: 'DELETE',
    headers : {
    authorization: '730f059c-8441-4382-a1de-5675ec69148e',
    'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}
//Запрос лайка на сервер(+лайк)
export const likeCard = (cardId) => {
  return fetch (`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization:'730f059c-8441-4382-a1de-5675ec69148e',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch(err => {
    console.error(err)
  })
};
//Запрос "дизлайка"(-лайк)
export const dislikeCard = (cardId) => {
  return fetch (`https://nomoreparties.co/v1/wff-cohort-10/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization:'730f059c-8441-4382-a1de-5675ec69148e',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch(err => {
    console.error(err)
  })
};
//Запрос на обновление аватара
export const updateAvatar = (avatar) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-10/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '730f059c-8441-4382-a1de-5675ec69148e',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}