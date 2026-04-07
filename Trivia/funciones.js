var selectedPreguntas = [];
var currentIndex = 0;
var resultado = 0;

function fetchPreguntas() {
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
        ${shuffledOpciones.map(op => `<button onclick="verificarRespuesta('${op.replace(/'/g, "\\'")}', '${p.correcta.replace(/'/g, "\\'")}', ${currentIndex})">${op}</button>`).join('')}
        <div class="feedback"></div>
    </div>`;
    document.getElementById('preguntas').innerHTML = html;
}

function verificarRespuesta(opcion, correcta, index) {
    let preguntaDiv = document.querySelector(`.pregunta[data-index="${index}"]`);
    let feedbackDiv = preguntaDiv.querySelector('.feedback');
    let buttons = preguntaDiv.querySelectorAll('button');
    
    if (opcion === correcta) {
        feedbackDiv.textContent = '¡Correcto!';
        feedbackDiv.style.color = 'green';
        resultado++;
    } else {
        feedbackDiv.textContent = 'Incorrecto. La respuesta correcta es: ' + correcta;
        feedbackDiv.style.color = 'red';
    }
    
    // Deshabilitar todos los botones de esta pregunta
    buttons.forEach(btn => btn.disabled = true);
    
    // Agregar botón siguiente
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