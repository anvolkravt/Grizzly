const consultationButton = document.getElementById('consultation-button'),
  consultationFormContainer = document.getElementById('form-container'),
  popUpCloseButton = document.getElementById('pop-up-close'),
  wrapper = document.getElementById('wrapper');

consultationButton.addEventListener('click', () => {
  consultationFormContainer.classList.remove('form-container_disabled');
  wrapper.classList.add('wrapper__pop-up-open');
});

popUpCloseButton.addEventListener('click', () => {
  consultationFormContainer.classList.add('form-container_disabled');
  wrapper.classList.remove('wrapper__pop-up-open');
});
