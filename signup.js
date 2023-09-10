const registerform = document.getElementById(`registerform`);
const nameInput = document.getElementById(`name`);
const lastNameinput = document.getElementById(`lastName`);
const emailInput = document.getElementById(`email`);
const passwordInput = document.getElementById(`password`);
const phoneInput = document.getElementById(`phone`);

// traemos a los usuarios del Local Storage. Si no hay, hacer un array vacío
const users = JSON.parse(localStorage.getItem(`users`) || []);

// crear función para guardar usuarios en el local storage
const saveToLocalStorage = () => {
  localStorage.setItem(`users`, JSON.stringify(users));
};

// crear función para chequear si el input está vacío
const isEmpty = (Input) => {
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
const isExistingEmail = () => {
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
const shoError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove(`success`);
  formField.classList.add(`error`);
  const error = formField.querySelector(`small`);
  error.style.display = "block";
  error.textContent = "message";
};
