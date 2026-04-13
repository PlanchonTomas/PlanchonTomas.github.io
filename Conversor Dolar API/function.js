const apiUrl = 'https://dolarapi.com/v1/dolares';
let rates = [];

function conectarAPI() {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al conectar con la API: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            rates = data;
            cargarTiposDeCambio(data);
            mostrarMensaje('Selecciona un tipo de cambio y escribe una cantidad en pesos.');
        })
        .catch(error => {
            console.error(error);
            mostrarMensaje('No se pudo cargar la API. Intenta de nuevo más tarde.');
        });
}

function cargarTiposDeCambio(data) {
    const select = document.getElementById('rateType');
    select.innerHTML = '';

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.casa;
        option.textContent = `${item.nombre} - venta: ${item.venta}`;
        select.appendChild(option);
    });
}

function convertir() {
    const arsInput = document.getElementById('arsAmount');
    const select = document.getElementById('rateType');
    const cantidadARS = parseFloat(arsInput.value);

    if (isNaN(cantidadARS) || cantidadARS <= 0) {
        mostrarMensaje('Ingresa una cantidad válida mayor a cero.');
        return;
    }

    const tasaSeleccionada = rates.find(rate => rate.casa === select.value);
    if (!tasaSeleccionada) {
        mostrarMensaje('No se encontró el tipo de cambio seleccionado.');
        return;
    }

    const usd = cantidadARS / tasaSeleccionada.venta;
    const fecha = new Date(tasaSeleccionada.fechaActualizacion).toLocaleString('es-AR');
    mostrarMensaje(`${usd.toFixed(2)} USD <br> (Última actualización: ${fecha})`);
}

function mostrarMensaje(text) {
    const message = document.getElementById('message');
    message.innerHTML = text;
}

window.addEventListener('DOMContentLoaded', () => {
    conectarAPI();

    const button = document.getElementById('convertButton');
    button.addEventListener('click', convertir);
});