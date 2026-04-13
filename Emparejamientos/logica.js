class JuegoMemoria {
  constructor(filas = 10, columnas = 10) {
    this.filas = filas;
    this.columnas = columnas;
    this.contenedor = document.getElementById("matriz");
    this.mensajeCompletado = document.getElementById("mensaje");
    this.elementoCronometro = document.getElementById("cronometro");
    this.elementoIntentos = document.getElementById("intentos");

    this.parejas = [];
    this.tarjetas = [];
    this.tarjetasReveladas = [];
    this.pares_encontrados = 0;
    this.intentos = 0;
    this.segundos = 0;
    this.cronometroActivo = false;
    this.idCronometro = null;

    this.inicializar();
  }

  inicializar() {
    // Crear parejas de emojis
    emojis.forEach((emoji) => {
      this.parejas.push(emoji, emoji);
    });

    if (this.filas * this.columnas !== this.parejas.length) {
      throw new Error("La matriz debe tener 100 casillas para 50 parejas de emojis.");
    }

    // Mezclar parejas
    this.mezclar(this.parejas);

    // Crear array de tarjetas
    this.tarjetas = this.parejas.map((emoji, indice) => ({
      indice,
      emoji,
      revelada: false,
      emparejada: false,
    }));
  }

  mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  iniciarCronometro() {
    if (!this.cronometroActivo) {
      this.cronometroActivo = true;
      this.idCronometro = setInterval(() => {
        this.segundos++;
        this.actualizarCronometro();
      }, 1000);
    }
  }

  detenerCronometro() {
    this.cronometroActivo = false;
    clearInterval(this.idCronometro);
  }

  actualizarCronometro() {
    const minutos = Math.floor(this.segundos / 60);
    const segs = this.segundos % 60;
    this.elementoCronometro.textContent = `${minutos}:${segs.toString().padStart(2, "0")}`;
  }

  incrementarIntentos() {
    this.intentos++;
    this.elementoIntentos.textContent = this.intentos;
  }

  crearTarjeta(tarjeta) {
    const elemento = document.createElement("div");
    elemento.className = "tarjeta";
    elemento.dataset.indice = tarjeta.indice;
    elemento.textContent = tarjeta.revelada ? tarjeta.emoji.simbolo : "?";

    if (tarjeta.revelada) {
      elemento.classList.add("revelada");
    }
    if (tarjeta.emparejada) {
      elemento.classList.add("emparejada");
    }

    elemento.addEventListener("click", () => this.revelarTarjeta(tarjeta, elemento));
    return elemento;
  }

  revelarTarjeta(tarjeta, elemento) {
    if (!tarjeta.emparejada && !tarjeta.revelada && this.tarjetasReveladas.length < 2) {
      this.iniciarCronometro();
      tarjeta.revelada = true;
      elemento.textContent = tarjeta.emoji.simbolo;
      elemento.classList.add("revelada");
      this.tarjetasReveladas.push({ tarjeta, elemento });

      if (this.tarjetasReveladas.length === 2) {
        this.incrementarIntentos();
        this.verificarPar();
      }
    }
  }

  verificarPar() {
    const [primera, segunda] = this.tarjetasReveladas;
    const sonIguales =
      primera.tarjeta.emoji.simbolo === segunda.tarjeta.emoji.simbolo;

    if (sonIguales) {
      primera.tarjeta.emparejada = true;
      segunda.tarjeta.emparejada = true;
      primera.elemento.classList.add("emparejada");
      segunda.elemento.classList.add("emparejada");
      this.pares_encontrados++;

      if (this.pares_encontrados === emojis.length) {
        this.mostrarCompletado();
      }

      this.tarjetasReveladas = [];
    } else {
      setTimeout(() => {
        primera.tarjeta.revelada = false;
        segunda.tarjeta.revelada = false;
        primera.elemento.textContent = "?";
        segunda.elemento.textContent = "?";
        primera.elemento.classList.remove("revelada");
        segunda.elemento.classList.remove("revelada");
        this.tarjetasReveladas = [];
      }, 1000);
    }
  }

  mostrarCompletado() {
    this.detenerCronometro();
    setTimeout(() => {
      this.mensajeCompletado.style.display = "block";
    }, 500);
  }

  jugar() {
    for (const tarjeta of this.tarjetas) {
      this.contenedor.appendChild(this.crearTarjeta(tarjeta));
    }
  }
}

// Instanciar y iniciar el juego
const juego = new JuegoMemoria();
juego.jugar();