const registerform = document.getElementById(`register-form`);
const nameInput = document.getElementById(`name`);
const lastNameInput = document.getElementById(`lastName`);
const emailInput = document.getElementById(`email`);
const passwordInput = document.getElementById(`password`);
const phoneInput = document.getElementById(`phone`);

// traemos a los usuarios del Local Storage. Si no hay, hacer un array vacío
const users = JSON.parse(localStorage.getItem(`users`)) || [];

// crear función para guardar usuarios en el local storage
const saveToLocalStorage = () => {
  localStorage.setItem(`users`, JSON.stringify(users));
};

// crear función para chequear si el input está vacío
const isEmpty = (input) => {
  return !input.value.trim().length;
};

// crear función para chequear si el largo del value del input está entre un mínimo y un máximo de caracteres
const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length < max;
};

// crear función para validar email con expresión regular
const isEmailValid = (input) => {
  const re = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return re.test(input.value.trim());
};

// función para chequear si el mail ya existe en el array de usuarios
const isExistingEmail = (input) => {
  return users.some((user) => user.email === input.value.trim());
};

// función para validar una contraseña con expresión regular
const isPassSecure = (input) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$^&*()_-]).{8,18}$/;
  return re.test(input.value.trim());
};

// función para validar el teléfono con expresión regular
const isPhoneValid = (input) => {
  const re = /^[0-9]{10}$/;
  return re.test(input.value.trim());
};

// función para mostrar error al validar un input
const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove(`success`); //VER CSS
  formField.classList.add(`error`); //VER CSS
  const error = formField.querySelector(`small`);
  error.style.display = "block";
  error.textContent = message;
};

// función para mostrar success al validar un input
const showSuccess = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove(`error`); //VER CSS
  formField.classList.add(`success`); //VER CSS
  const error = formField.querySelector(`small`);
  error.textContent = "";
};

//función para validar un input tipo texto
const checkTextInput = (input) => {
  // setear la validez del value a retornar
  const minCharacters = 3;
  const maxCharacters = 16;

  if (isEmpty(input)) {
    showError(input, `Este campo es obligatorio`);
    return false;
  }

  if (!isBetween(input, minCharacters, maxCharacters)) {
    showError(
      input,
      `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`
    );
    return false;
  }

  showSuccess(input);
  return true;
};

//función para validar email
const checkEmail = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    showError(input, `Este campo es obligatorio`);
    return;
  }

  if (!isEmailValid(input)) {
    showError(input, `El email ingresado no es válido`);
    return;
  }
  if (!isExistingEmail(input)) {
    showError(input, `El email ya se encuentra registrado`);
    return;
  } else showSuccess(input);
  valid = true;
  return valid;
};

//función para validar password

const checkPassword = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    showError(input, `Por favor, elige una contraseña`);
    return;
  }
  if (!isPassSecure(input)) {
    showError(
      input,
      `La contraseña debe tener una mayúscula, una minúscula y entre 6 y 9 caracteres`
    );
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//función para validar teléfono
const checkPhone = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    showError(input, `Ingrese un número válido`);
    return valid;
  }
  if (!isPhoneValid(input)) {
    showError(input, `El número ingresao no es válido`);
    return;
  }

  showSuccess(input);
  valid = true;
  return valid;
};

//Función general

const validateForm = (e) => {
  e.preventDefault();

  //guardar estados de los inpur en las variables
  let isNameValid = checkTextInput(nameInput);
  let isLastNameValid = checkTextInput(lastNameInput);
  let isEmailValid = checkEmail(emailInput);
  let isPasswordValid = checkPassword(passwordInput);
  let isPhoneValid = checkPhone(phoneInput);

  let isValidForm =
    isNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPhoneValid;

  if (isValidForm)
    users.push({
      name: nameInput.value,
      lastName: nameInput.value,
      email: lastNameInput.value,
      password: passwordInput.value,
      phone: phoneInput.value,
    });
  saveToLocalStorage(users);
  alert(`¡Te has registrado!`);
  window.location.href = `signin.html`;
};

const init = () => {
  registerform.addEventListener(`submit`, validateForm);
  nameInput.addEventListener(`input`, () => checkTextInput(nameInput));
  lastNameInput.addEventListener(`input`, () => checkTextInput(lastNameInput));
  emailInput.addEventListener(`input`, () => checkEmail(emailInput));
  passwordInput.addEventListener(`input`, () => checkPassword(passwordInput));
  phoneInput.addEventListener(`input`, () => checkPhone(phoneInput));
};

init();
