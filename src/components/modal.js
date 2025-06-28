// @todo: функции открытия и закрытия попапа

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
}

export function closeEsc(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup_is-opened');
        if (openPopup) {
            closePopup(openPopup);
        }
    }
}

export function closePopupsOverlay(popup){
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
}