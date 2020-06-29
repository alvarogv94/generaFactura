var miLienzo; // el canvas
var contexto; // el contexto
var canvasLimites; // los margenes del canvas
var flagPaint = false; // nos dice si pintar o no
var actualPos; // la posición actual donde hice click

function prepareCanvas() {
  miLienzo = document.getElementById("panelFirma");
  contexto = miLienzo.getContext("2d"); // obtenemos el contexto ( dibujar en 2d)
  canvasLimites = miLienzo.getBoundingClientRect(); // obtenemos los limites del canvas
  miLienzo.addEventListener("mousedown", cambiarEstado, false);
  miLienzo.addEventListener("mouseup", cambiarEstado, false);
  miLienzo.addEventListener("mousemove", pintarLinea, false);
  miLienzo.style.cursor = "hand";
  borrador = document.getElementById("borrador");
  borrador.addEventListener("click", erase, false);
}

function cambiarEstado() {
  flagPaint = !flagPaint;
  // Obtenemos los límites de nuevo, por si hubiera redimensionado la pantalla
  canvasLimites = miLienzo.getBoundingClientRect();
  actualPos = obtenerCoordenadas(event);
}

function pintarLinea(event) {
  if (flagPaint) {
    let coordenadas = obtenerCoordenadas(event);
    contexto.beginPath(); // comenzamos a dibujar
    contexto.moveTo(actualPos.x, actualPos.y); // ubicamos el cursor en la posicion (10,10)
    contexto.lineTo(coordenadas.x, coordenadas.y);

    actualPos = {
      x: coordenadas.x,
      y: coordenadas.y,
    };

    contexto.strokeStyle = "#000"; // color de la linea

    contexto.stroke(); // dibujamos la linea
  }
}

function obtenerCoordenadas(event) {
  let posX;
  let posY;

  if (event.pageX || event.pageY) {
    posX = event.pageX - canvasLimites.left;
    posY = event.pageY - canvasLimites.top;
  } else {
    posX = event.clientX - canvasLimites.left;
    posY = event.clientY - canvasLimites.top;
  }

  return {
    x: posX,
    y: posY,
  };
}

function erase() {
  contexto.clearRect(0, 0, miLienzo.width, miLienzo.height);
}
