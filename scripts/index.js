import FormValidator from './FormValidator.js';
const form = document.querySelector('[name="customer-data-form"]');

//элементы для валидации
const itemsToValidate = {
  inputSelector: '.customer-data-form__input',
  submitButtonSelector: '.customer-data-form__submit',
  inactiveButtonClass: 'customer-data-form__submit_disabled',
  inputErrorClass: 'customer-data-form__input_type_error',
  errorClass: 'customer-data-form__error-container'
};

//добавить валидацию формы
const FormValidation = new FormValidator(itemsToValidate, form);
FormValidation.enableValidation();

