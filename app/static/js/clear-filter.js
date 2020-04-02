const clearButton = document.getElementById('clear-filter'),
  checkboxes = [...document.getElementsByClassName('filter__checkbox')];

function uncheck() {
  checkboxes.map(item => (item.checked = false));
}

clearButton.addEventListener('click', uncheck);
