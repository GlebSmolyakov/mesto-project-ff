// validation.js

function showError(inputElement, errorMessage, config) {
    const errorElement = inputElement.form.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) return;

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideError(inputElement, config) {
    const errorElement = inputElement.form.querySelector(`#${inputElement.id}-error`);
    if (!errorElement) return;

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(inputElement, config) {
    if (!inputElement.validity.valid) {
        let errorMessage = inputElement.validationMessage;
        if (inputElement.validity.patternMismatch && inputElement.dataset.errorMessage) {
            errorMessage = inputElement.dataset.errorMessage;
        }
        showError(inputElement, errorMessage, config);
        return false;
    }
    hideError(inputElement, config);
    return true;
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
}

export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        setEventListeners(formElement, config);
    });
}

export function clearValidation(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach(inputElement => {
        hideError(inputElement, config);
    });

    toggleButtonState(inputList, buttonElement, config);
}