//создать и экспортировать класс валидации форм
export default class FormValidator {
  constructor(formItems, form) {
    this._form = form;
    this._inputSelector = formItems.inputSelector;
    this._inputs = form.querySelectorAll(this._inputSelector);
    this._submitButtonSelector = this._form.querySelector(formItems.submitButtonSelector);
    this._inactiveButtonClass = formItems.inactiveButtonClass;
    this._inputErrorClass = formItems.inputErrorClass;
    this._errorClass = formItems.errorClass;
  }

  //проверяет на валидность переданный инпут
  _isValid (input) {
    return input.validity.valid;
  }

  //добавить сообщение об ошибке в контейнер для ошибки
  _showErrorMessage (messageContainer, message) {
    messageContainer.textContent = message;
  }

  //проверить валидность поля и
  _toggleErrorClass (input, className) {
    //если ввод неверный
    if (!this._isValid(input)) {
      //выделить поле как некорректное
      input.classList.add(className);
    }
    else {
      //иначе убрать выделение
      input.classList.remove(className);
    }
  }

  //проверить валидность поля и
  _toggleErrorMessage (input) {
    //если ввод неверный
    if (!this._isValid (input)) {
      //добавить сообщение об ошибке ввода в соответствующий инпуту контейнер для ошибки
      this._showErrorMessage(document.querySelector(`#${input.name}-error-container`), input.validationMessage);
    }
    //если ввод верный
    else {
      //удалить сообщение об ошибке
      this._showErrorMessage(document.querySelector(`#${input.name}-error-container`), '');
    }
  }

  //вернуть true, если хотя бы один инпут в текущей форме заполнен неверно
  _hasInvalidInput (evt, elements) {
    //собрать все инпуты текущей формы в константу
    const inputs = Array.from(evt.currentTarget.querySelectorAll(elements));
    //вернуть true, если перебор массива даст хоть один true
    return inputs.some((input) => {
      //вернуть true, если инпут невалидный
      return !this._isValid (input);
    });
  }
  disableButton(button, className) {
    //отключить кнопку
    button.disabled = true;
    //добавить кнопке класс
    button.classList.add(className);
  }
  enableButton(button, className) {
    //включить кнопку
    button.disabled = false;
    //удалить класс отключения
    button.classList.remove(className);
  }
  //отключить или включить кнопку submit
  _toggleSubmitButton (hasInvalidInput, submitButton, className) {
    //Если хоть одно поле невалидно
    if (hasInvalidInput) {
      this.disableButton(submitButton, className);
    }
    //если все поля валидны
    else {
      this.enableButton(submitButton, className);
    }
  }

//включить валидацию полей в формах
  enableValidation () {
    this._form.addEventListener('input', (evt) => {
      if(evt.target.classList.contains(this._inputSelector.slice(1))) {
        this._toggleErrorClass(evt.target, this._inputErrorClass);
        this._toggleErrorMessage(evt.target);
        this._toggleSubmitButton(this._hasInvalidInput(evt, this._inputSelector), this._submitButtonSelector, this._inactiveButtonClass);
      }
    });
  }
  //очистить визуальные эффекты валидации
  clearValidation(errorMessageContainers, enableButton) {
    //удалить для всех инпутов стилизацию под ошибочный инпут
    Array.from(this._inputs).forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });
    //очистить сообщения об ошибке
    Array.from(errorMessageContainers).forEach((errorMessageContainer) => {
      errorMessageContainer.textContent = '';
    });
    //если нужно активировать кнопку
    if (enableButton) {
      this.enableButton(this._submitButtonSelector, this._inactiveButtonClass);
    }
  }
}
