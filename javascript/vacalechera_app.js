var canvas = document.getElementById('canvas0');
var lbl_loading = document.getElementById("lbl_loading");
var portada = document.getElementById("portada");
var contenedor = document.getElementById("content");
var fondo_perdiste = document.getElementById("fondo_perdiste");
var btn_reintentar = document.getElementById("btn_reintentar");
var sugerencias = document.getElementById("linkSugerencias");

var ctx = canvas.getContext('2d');

//Estado del juego que indica si ya se cargaron todas las imágenes
var loaded = false;
//Estado del juego que indica si el juego ya inició
var iniciado = false;

//Añade un asset_manager al objeto window para que sea accesible en cualquier parte
window.asset_manager = new AssetManager();

//Evento para cuando se presiona cualquier tecla
window.onkeydown = function (evt) {
    if(iniciado) {
        granjero.onKeyDown(evt);
    }
    else if (loaded) {
        iniciarJuego();
    }
}
//Evento para cuando se da un click dentro del área de juego
contenedor.onclick = function (evt) {
	if(iniciado) {
        granjero.onClick(evt);
	}
	else if (loaded) {
        iniciarJuego();
  }
}
//Evento para cuando se da resize a la pantalla
window.onresize = function(event) {
    ajustarPantalla();
    vacalechera.calcularDimensiones();
 
}

//Se añaden todas las imágenes a la lista de imágenes a descargar
asset_manager.queueDownload("./imagenes/vacaNormal.png","vacaNormal");
asset_manager.queueDownload("./imagenes/vacaDisparo.png","vacaDisparo");
asset_manager.queueDownload('./imagenes/vacaCamina.png',"vacaCamina");
asset_manager.queueDownload("./imagenes/granjeroQuieto.png","granjeroQuieto");
asset_manager.queueDownload("./imagenes/granjeroCubetaArriba.png","cubetaArriba");
asset_manager.queueDownload("./imagenes/granjeroAtrapando.png","granjeroAtrapando");
asset_manager.queueDownload("./imagenes/chorro.png","chorro");
asset_manager.queueDownload("./imagenes/fondo.png","fondo");
asset_manager.queueDownload("./imagenes/chorroDerramado.png","chorroDerramado");
asset_manager.queueDownload("./imagenes/pollo.png","pollo");

//Al culminar de descargar todas las imágenes se llama a la función enviada
asset_manager.downloadAll(function() {
    lbl_loading.innerHTML = "Presiona cualquier tecla para continuar";
    
    ajustarPantalla();
    
    vacalechera = new Juego(ctx, this.mostrar_perdiste);
    
    loaded = true;
    
});

function iniciarJuego() {

    
    canvas.style.display = "block";
    canvas.style.backgroundImage = 'url(./imagenes/fondo.png)';
    
    contenedor.removeChild(portada); 
    contenedor.removeChild(lbl_loading);
    vacalechera.iniciarJuego();
    iniciado = true;
}

function reiniciar_Juego(evt){
	fondo_perdiste.style.display = "none";
	vacalechera.iniciarJuego();
};

//Muestra la pantalla que indica que perdiste y el botón de reintentar
function mostrar_perdiste() {
    
    fondo_perdiste.style.display = "block";
    btn_reintentar.addEventListener('click',reiniciar_Juego,false);
};

//Ajusta las dimensiones de los elementos de la pantalla
function ajustarPantalla() {
    
    contenedor.style.width = getAnchoPantalla() + 'px';
    canvas.width = getAnchoPantalla();
    canvas.height = getAltoPantalla();
    
    lbl_loading.style.top = generarAlto(420) + 'px';
    lbl_loading.style.left = generarAncho(190) + 'px';
    lbl_loading.style.padding = generarAlto(20) + 'px';
    lbl_loading.style.fontSize = generarAlto(25) + 'px';
    
    sugerencias.style.fontSize = generarAlto(16) + 'px';
    sugerencias.style.marginTop = generarAlto(50) + 'px';
    
    fondo_perdiste.style.width = generarAncho(630) + 'px';
    fondo_perdiste.style.height = generarAlto(395) + 'px';
    fondo_perdiste.style.left = generarAncho(87) + 'px';
    fondo_perdiste.style.top = generarAlto(30) + 'px';
    
    btn_reintentar.style.width = generarAncho(150) + 'px';
    btn_reintentar.style.fontSize = generarAlto(25) + 'px';
    btn_reintentar.style.top = generarAlto(290) + 'px';
    btn_reintentar.style.left = generarAncho(200) + 'px';
    btn_reintentar.style.padding = generarAlto(5) + 'px';
    btn_reintentar.style.borderRadius = generarAlto(8) + 'px';
}

//Shim que se encarga de solicitar el animationFrame del browser que estemos utilizando
//para optimizar la animacion del juego
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame     ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();
