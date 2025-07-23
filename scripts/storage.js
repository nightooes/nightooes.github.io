document.getElementById('saveBtn').addEventListener('click', () => {
  const input = document.getElementById('numbersInput').value;
  const numbers = input.split(/[, ]+/).filter(num => num.trim() !== '');
  localStorage.setItem('savedNumbers', JSON.stringify(numbers));
  alert('Список сохранен!');
});