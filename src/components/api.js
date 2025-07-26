// @todo конфиг

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
    headers: {
        authorization: '09942ff5-5eef-41b7-8a2b-d4d36cf1519f',
        'Content-Type': 'application/json'
    }
};
// @todo функция обработки ответа

const getInitialCards = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}


// @todo получение информации о пользователе

export function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(getInitialCards);
}
// @todo получает карточки

export function getCard(){
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(getInitialCards);
}

// @todo обновление профиля пользователя

export function updateProfile(name, about){
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name, about})
    })
        .then(getInitialCards);
}

// @todo добавляет карточку

export function addNewCard(name, link){
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name, link})
    })
        .then(getInitialCards);
}


//@todo обновление аватара

export function updateAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar})
    })
        .then(getInitialCards);
}

//@todo удаление карточки

export function apiDeleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(getInitialCards);
}

//@todo поставить лайк карточке

export function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(getInitialCards);
}

//@todo удалить лайк карточке

export function unlikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(getInitialCards);
}

//@todo универсальная функция переключения лайка

export function changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? likeCard(cardId) : unlikeCard(cardId);
}