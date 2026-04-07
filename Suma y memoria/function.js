const intervalInput = document.getElementById('interval-input');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const numberDisplay = document.getElementById('number-display');
const sumContainer = document.getElementById('sum-container');
const sumInput = document.getElementById('sum-input');
const checkBtn = document.getElementById('check-btn');
const feedback = document.getElementById('feedback');

let sequence = [];
let sequenceIndex = 0;
let sequenceSum = 0;
let timerId = null;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSequence() {
  const length = randInt(2, 9);
  const seq = [];
  for (let i = 0; i < length; i += 1) {
    const sign = Math.random() < 0.5 ? -1 : 1;
    seq.push(sign * randInt(1, 9));
  }
  return seq;
}

function resetState() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  sequence = [];
  sequenceIndex = 0;
  sequenceSum = 0;
  numberDisplay.textContent = '-';
  feedback.textContent = '';
  feedback.className = 'feedback';
  sumInput.value = '';
  sumContainer.hidden = true;
}

function startSequence() {
  resetState();
  const interval = Number(intervalInput.value);
  if (Number.isNaN(interval) || interval < 100) {
    alert('Ingresa un intervalo válido desde 100 ms en adelante.');
    return;
  }

  sequence = createSequence();
  sequenceSum = sequence.reduce((acc, x) => acc + x, 0);
  startBtn.disabled = true;
  stopBtn.disabled = false;

  numberDisplay.textContent = 'Listo...';

  timerId = setInterval(() => {
    if (sequenceIndex < sequence.length) {
      const currentNumber = sequence[sequenceIndex];
      numberDisplay.textContent = currentNumber;
      sequenceIndex += 1;

      if (sequenceIndex === sequence.length) {
        clearInterval(timerId);
        timerId = null;
        startBtn.disabled = false;
        stopBtn.disabled = true;

        setTimeout(() => {
          numberDisplay.textContent = 'Secuencia terminada';
          sumContainer.hidden = false;
          sumInput.focus();
        }, interval);
      }
    }
  }, interval);
}

function stopSequence() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
  numberDisplay.textContent = 'Detenido.';
  sumContainer.hidden = true;
  feedback.textContent = '';
}

function verifySum() {
  const userValue = Number(sumInput.value);
  if (Number.isNaN(userValue)) {
    feedback.textContent = 'Por favor ingresa un número.';
    feedback.className = 'feedback error';
    return;
  }

  if (userValue === sequenceSum) {
    feedback.textContent = '¡Correcto! La suma es ' + sequenceSum + '.';
    feedback.className = 'feedback success';
  } else {
    feedback.textContent = 'Incorrecto. La suma es ' + sequenceSum + '.';
    feedback.className = 'feedback error';
  }
}

startBtn.addEventListener('click', startSequence);
stopBtn.addEventListener('click', stopSequence);
checkBtn.addEventListener('click', verifySum);
