import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const STORAGE_STATE_KEY = 'feedback-form-state';
let formData = {};

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

fillForm();

function onFormInput(event) {
  formData = JSON.parse(localStorage.getItem(STORAGE_STATE_KEY)) ?? {};

  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const email = event.target.email.value;
  const message = event.target.message.value;

  if (email === "" || message === "") {
        return alert("Всі поля повинні бути заповнені!!!");
      }

  event.target.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_STATE_KEY);
}

function fillForm() {
  const savedData = localStorage.getItem(STORAGE_STATE_KEY);
  const parsedData = JSON.parse(savedData);

  if (savedData) {
    formRef.email.value = parsedData.email ?? '';
    formRef.message.value = parsedData.message ?? '';
  }
}

