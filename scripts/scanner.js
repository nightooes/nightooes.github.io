const savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];
const scannedCodes = new Set(); // Для отслеживания дубликатов
const successSound = document.getElementById('successSound');
const errorSound = document.getElementById('errorSound');

Quagga.init({
  inputStream: {
    name: "Live",
    type: "LiveStream",
    target: document.querySelector('#interactive'),
    constraints: {
      facingMode: "environment" // Используем заднюю камеру
    }
  },
  decoder: {
    readers: ["ean_reader", "ean_8_reader"] // Форматы штрих-кодов
  }
}, (err) => {
  if (err) {
    console.error("Ошибка инициализации Quagga:", err);
    return;
  }
  Quagga.start();
});

Quagga.onDetected((result) => {
  const code = result.codeResult.code;
  if (scannedCodes.has(code)) {
    showFeedback(false, 'Код уже отсканирован!');
    return;
  }

  if (savedNumbers.includes(code)) {
    scannedCodes.add(code);
    showFeedback(true, 'Верно!');
  } else {
    showFeedback(false, 'Код не найден в списке!');
  }
});

function showFeedback(isSuccess, message) {
  const body = document.body;
  body.className = isSuccess ? 'green-bg' : 'red-bg';
  
  const sound = isSuccess ? successSound : errorSound;
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    body.className = '';
  }, 3000);
}