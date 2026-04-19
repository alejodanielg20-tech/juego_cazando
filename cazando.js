const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

const ANCHO_GATO = 60;
const ALTO_GATO = 60;
const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;

function graficarRectangulo(x, y, ancho, alto, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
  graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#8B00FF");
}

function graficarComida() {
  graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#00BFFF");
}

function iniciarJuego() {
  gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
  gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
  comidaX = canvas.width - ANCHO_COMIDA - 5;
  comidaY = canvas.height - ALTO_COMIDA - 5;
  graficarGato();
  graficarComida();
}








