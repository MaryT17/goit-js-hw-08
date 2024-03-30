import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');
const formData = {};

function saveFormState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

const throttledSaveFormState = throttle(saveFormState, 500);

function onInput(e) {
  formData[e.target.name] = e.target.value;
  throttledSaveFormState();
}

function populateFormFields() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const savedValues = JSON.parse(savedData);

    Object.entries(savedValues).forEach(([name, value]) => {
      formData[name] = value;
      feedbackForm.elements[name].value = value;
    });
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);

  feedbackForm.reset();

  for (let key in formData) {
    delete formData[key];
  }
}

feedbackForm.addEventListener('input', onInput);
feedbackForm.addEventListener('submit', onFormSubmit);

populateFormFields();
