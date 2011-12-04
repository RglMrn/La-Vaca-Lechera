//Estos métodos están para hacer resizing a los anchos y altos de los 
//elementos del juego

//Ancho que estamos tomando como estándar
var anchoOriginal = 800;
//Alto que estamos tomando como estándar
var altoOriginal = 450;

var porc_alto = altoOriginal/anchoOriginal;

//Valores de ancho y alto actuales de la pantalla
var anchoPantalla;
var altoPantalla;


//Regresa el ancho correcto acorde al tamaño de la pantalla
function generarAncho (ancho, anchoReferencia) {
    var anchoBase = anchoReferencia || anchoOriginal;
    
    obtenerValoresPantalla();
    
    return anchoPantalla * ancho/anchoOriginal;
}

//Regresa el alto correcto acorde al tamaño de la pantalla
function generarAlto (alto, altoReferencia) {
    var altoBase = altoReferencia || altoOriginal;
    
    obtenerValoresPantalla();

    return altoPantalla * alto/altoOriginal;
}

function getAnchoPantalla() {
    obtenerValoresPantalla();
    return anchoPantalla;
}

function getAltoPantalla() {
    obtenerValoresPantalla();
    return altoPantalla;
}

function getScale() {
    
    return anchoPantalla/anchoOriginal;
}

//Obtiene los valores actuales que tiene la pantalla
function obtenerValoresPantalla() {
    anchoPantalla = window.innerWidth;
    if (anchoPantalla > anchoOriginal) {
        anchoPantalla = anchoOriginal;
    }
    altoPantalla = anchoPantalla * porc_alto;
    
}
