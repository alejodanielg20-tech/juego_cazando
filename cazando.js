const canvas = document.getElementById("areaJuego");
const ctx = canvas.getContext("2d");

const imgGato = new Image();
imgGato.src = "gato.png";


let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;
let puntos = 0;
let tiempoMaximo = 15;
let tiempo = tiempoMaximo;
let intervalo;


const ANCHO_GATO = 60;
const ALTO_GATO = 60;
const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;
const PASO = 10;

function graficarRectangulo(x, y, ancho, alto, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
  ctx.drawImage(imgGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
} 

function graficarComida() {
  graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#00BFFF");
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function actualizarPanel() {
  document.getElementById("puntos").innerText = puntos;
  document.getElementById("tiempo").innerText = tiempo;
}

function posicionAleatoria(max, tamElemento) {
  return Math.floor(Math.random() * (max - tamElemento));
}

function verificarColision() {
  return (
    gatoX < comidaX + ANCHO_COMIDA &&
    gatoX + ANCHO_GATO > comidaX &&
    gatoY < comidaY + ALTO_COMIDA &&
    gatoY + ALTO_GATO > comidaY
  );
}

function iniciarTemporizador() {
  intervalo = setInterval(() => {   // ✅ corregido
    tiempo--;
    actualizarPanel();
    if (tiempo <= 0) {
      clearInterval(intervalo);
      document.getElementById("mensaje").innerText = "¡Tiempo agotado! Tu puntaje final es: " + puntos;
    }
  }, 1000);
}

function moverGato(direccion) {   // ✅ corregido
  if (direccion === "arriba" && gatoY - PASO >= 0) gatoY -= PASO;
  if (direccion === "abajo" && gatoY + ALTO_GATO + PASO <= canvas.height) gatoY += PASO;
  if (direccion === "izquierda" && gatoX - PASO >= 0) gatoX -= PASO;
  if (direccion === "derecha" && gatoX + ANCHO_GATO + PASO <= canvas.width) gatoX += PASO;

  limpiarCanvas();
  graficarGato();
  graficarComida();

  if (verificarColision()) {
    puntos++;
    tiempoMaximo--;
    tiempo = tiempoMaximo;
    comidaX = posicionAleatoria(canvas.width, ANCHO_COMIDA);
    comidaY = posicionAleatoria(canvas.height, ALTO_COMIDA);
    limpiarCanvas();
    graficarGato();
    graficarComida();
  }
  actualizarPanel();  // ✅ agregado
}

function iniciarJuego() {
  gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
  gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
  comidaX = canvas.width - ANCHO_COMIDA - 5;
  comidaY = canvas.height - ALTO_COMIDA - 5;
  graficarGato();
  graficarComida();
  actualizarPanel();
  iniciarTemporizador();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") moverGato("arriba");
  if (e.key === "ArrowDown") moverGato("abajo");
  if (e.key === "ArrowLeft") moverGato("izquierda");
  if (e.key === "ArrowRight") moverGato("derecha");
});

document.querySelectorAll("button").forEach((btn) => {   // ✅ corregido
  btn.addEventListener("click", () => {
    const txt = btn.innerText;
    if (txt === "↑") moverGato("arriba");
    if (txt === "↓") moverGato("abajo");
    if (txt === "←") moverGato("izquierda");
    if (txt === "→") moverGato("derecha");
  });
});