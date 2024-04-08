// Проверка валидности поля
const isValid = (selectorForm, selectorInput, validationConfig) => {
  if (selectorInput.validity.patternMismatch) {
selectorInput.setCustomValidity(selectorInput.dataset.errorMessage);
} else {
selectorInput.setCustomValidity("");
}

  if (!selectorInput.validity.valid) {
showInputError(selectorForm, selectorInput, selectorInput.validationMessage, validationConfig);
} else {
hideInputError(selectorForm, selectorInput, validationConfig);
}
};

// Функция блокировки кнопки сабмит
const disableButtonElement = (buttonElement, validationConfig) => {
  buttonElement.classList.add(validationConfig.classDisabledButton); 
  buttonElement.disabled = true; 
};


// Добовляем класс с ошибкой
const showInputError = (selectorForm, selectorInput, errorMessage, validationConfig) => {
// Уникальный класс для выбора элемента ошибки
  const errorElement = selectorForm.querySelector(`.${selectorInput.id}-error`);
  selectorInput.classList.add(validationConfig.classErrorInput);
  errorElement.classList.add(validationConfig.classVisibleError);
  errorElement.textContent = errorMessage;
};

// Удаляем класс с ошибкой
const hideInputError = (selectorForm, selectorInput, validationConfig) => {
  const errorElement = selectorForm.querySelector(`.${selectorInput.id}-error`);
  selectorInput.classList.remove(validationConfig.classErrorInput);
  errorElement.classList.remove(validationConfig.classVisibleError);
 errorElement.textContent = "";
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву
  return inputList.some((selectorInput) => {
    // Если поле не валидно, коллбэк вернут ТРУ, обход прекратится и вся функция вернёт ТРУ
    return !selectorInput.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
  disableButtonElement(buttonElement, validationConfig);
  } else {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.classDisabledButton);
  }
};

// Функция навешивания слушателей на все инпуты
const setEventListener = (selectorForm, validationConfig) => {
  // Делаем массив из полей внутри формы
  const inputList = Array.from(selectorForm.querySelectorAll(validationConfig.selectorInput));
  // Найдёт в форме кнопку отправки
  const buttonElement = selectorForm.querySelector(validationConfig.selectorButtonSubmit);
  toggleButtonState(inputList, buttonElement, validationConfig);
  // Обходим массив и вешаем обработчик 
  inputList.forEach((selectorInput) => {
    selectorInput.addEventListener('input', () => {
      // В колбэке вызываем функцию валидности, которая принимает форму и проверяемый элемент
      isValid(selectorForm, selectorInput, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Функция навешивания слушателей на все формы
export const enableValidation = (validationConfig) => {
  // Делаем массив из форм 
  const formList = Array.from(document.querySelectorAll(validationConfig.selectorForm));
  // Обходим массив и вешаем функцию поиска инпутов, передаём элемент формы
  formList.forEach((selectorForm) => {
    selectorForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(selectorForm, validationConfig);
  });
};

// Очищаем ошибки валидации и делаем кнопку неактивной
export const clearValidation = (selectorForm, validationConfig) => { 
  const inputList = Array.from(selectorForm.querySelectorAll(validationConfig.selectorInput)); 
  const buttonElement = selectorForm.querySelector(validationConfig.selectorButtonSubmit); 
  inputList.forEach((selectorInput) => { 
    // selectorInput.value = "";
    hideInputError(selectorForm, selectorInput, validationConfig); 
  }); 
  disableButtonElement(buttonElement, validationConfig); 
};




