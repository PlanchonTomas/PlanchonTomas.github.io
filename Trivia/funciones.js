var selectedPreguntas = [];
var currentIndex = 0;
var resultado = 0;
var timerId = null;
var countdownInterval = null;
var tiempoLimite = 7;

window.addEventListener('DOMContentLoaded', fetchPreguntas);

async function fetchPreguntas() {
    fetch('trivia_240_preguntas.json')
        .then(response => response.json())
        .then(data => {
            prehistoria = data.Prehistoria;
            edadAntigua = data.Edad_Antigua;
            altaEdadMedia = data.Alta_Edad_Media;
            plenaEdadMedia = data.Plena_Edad_Media;
            bajaEdadMedia = data.Baja_Edad_Media;
            edadModerna = data.Edad_Moderna;
        })
        .catch(error => console.error('Error al cargar las preguntas:', error));
}

const categoriasMap = {
    "Prehistoria": "prehistoria",
    "Edad Antigua": "edadAntigua",
    "Alta Edad Media": "altaEdadMedia",
    "Plena Edad Media": "plenaEdadMedia",
    "Baja Edad Media": "bajaEdadMedia",
    "Edad Moderna": "edadModerna"
};

function mostrarPreguntas(categoriaTexto) {
    let varName = categoriasMap[categoriaTexto];
    if (!window[varName]) {
        alert('Primero carga las preguntas');
        return;
    }
    let preguntas = window[varName];
    let preguntasArray = preguntas[0]; // Asumiendo la estructura del JSON
    let shuffled = preguntasArray.slice().sort(() => 0.5 - Math.random());
    selectedPreguntas = shuffled.slice(0, 5);
    currentIndex = 0;
    resultado = 0;
    mostrarPreguntaActual();
}

function mostrarPreguntaActual() {
    let p = selectedPreguntas[currentIndex];
    let opciones = [p.correcta, ...p.incorrectas];
    let shuffledOpciones = opciones.sort(() => 0.5 - Math.random());
    let html = `<div class="pregunta" data-index="${currentIndex}">
        <p>${p.pregunta}</p>
        <div class="temporizador">Tiempo restante: <span class="timer-value">${tiempoLimite}</span>s</div>
        ${shuffledOpciones.map(op => `<button onclick="verificarRespuesta('${op.replace(/'/g, "\\'")}', '${p.correcta.replace(/'/g, "\\'")}', ${currentIndex})">${op}</button>`).join('')}
        <div class="feedback"></div>
    </div>`;
    document.getElementById('preguntas').innerHTML = html;
    iniciarTemporizador(currentIndex, p.correcta);
}

function iniciarTemporizador(index, correcta) {
    detenerTemporizador();
    let tiempo = tiempoLimite;
    let timerSpan = document.querySelector(`.pregunta[data-index="${index}"] .timer-value`);
    if (timerSpan) {
        timerSpan.textContent = tiempo;
    }

    timerId = setTimeout(() => {
        marcarTiempoAgotado(index, correcta);
    }, tiempo * 1000);

    countdownInterval = setInterval(() => {
        tiempo--;
        if (timerSpan) {
            timerSpan.textContent = tiempo;
        }
        if (tiempo <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function detenerTemporizador() {
    if (timerId) {
        clearTimeout(timerId);
        timerId = null;
    }
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function marcarTiempoAgotado(index, correcta) {
    let preguntaDiv = document.querySelector(`.pregunta[data-index="${index}"]`);
    if (!preguntaDiv) {
        return;
    }
    let buttons = preguntaDiv.querySelectorAll('button');
    if ([...buttons].every(btn => btn.disabled)) {
        return;
    }

    let feedbackDiv = preguntaDiv.querySelector('.feedback');
    feedbackDiv.textContent = 'Tiempo agotado. La respuesta correcta es: ' + correcta;
    feedbackDiv.style.color = 'red';
    buttons.forEach(btn => btn.disabled = true);
    feedbackDiv.insertAdjacentHTML('beforeend', '<br><button onclick="siguientePregunta()">Siguiente</button>');
}

function verificarRespuesta(opcion, correcta, index) {
    detenerTemporizador();
    let preguntaDiv = document.querySelector(`.pregunta[data-index="${index}"]`);
    let feedbackDiv = preguntaDiv.querySelector('.feedback');
    let buttons = preguntaDiv.querySelectorAll('button');

    if ([...buttons].every(btn => btn.disabled)) {
        return;
    }

    if (opcion === correcta) {
        feedbackDiv.textContent = '¡Correcto!';
        feedbackDiv.style.color = 'green';
        resultado++;
    } else {
        feedbackDiv.textContent = 'Incorrecto. La respuesta correcta es: ' + correcta;
        feedbackDiv.style.color = 'red';
    }

    buttons.forEach(btn => btn.disabled = true);
    feedbackDiv.insertAdjacentHTML('beforeend', '<br><button onclick="siguientePregunta()">Siguiente</button>');
}

function siguientePregunta() {
    currentIndex++;
    if (currentIndex < selectedPreguntas.length) {
        mostrarPreguntaActual();
    } else {
        document.getElementById('preguntas').innerHTML = '<p>¡Has completado la trivia!</p><br><p>Haz respondido correctamente ' + resultado + ' de ' + selectedPreguntas.length + ' preguntas.</p>';
        
    }
}
