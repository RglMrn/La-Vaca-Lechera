var canvas = document.getElementById('canvas0');
var lbl_loading = document.getElementById("lbl_loading");
var portada = document.getElementById("portada");
var contenedor = document.getElementById("content");
var fondo_perdiste = document.getElementById("fondo_perdiste");
var btn_reintentar = document.getElementById("btn_reintentar");

var ctx = canvas.getContext('2d');

//Estado del juego que indica si ya se cargaron todas las imágenes
var loaded = false;
//Estado del juego que indica si el juego ya inició
var iniciado = false;

//Añade un asset_manager al objeto window para que sea accesible en cualquier parte
window.asset_manager = new AssetManager();

//Se añaden event listeners para cuando se presiona una tecla o se da un click
window.addEventListener('keydown',onKeyDown,true);
contenedor.addEventListener('click',onClick,true);

//Se añaden todas las imágenes a la lista de imágenes a descargar
asset_manager.queueDownload("./imagenes/vaca_normal.png","vacanormal");
asset_manager.queueDownload("./imagenes/vaca_disparo.png","vacadisparo");
asset_manager.queueDownload('./imagenes/vacaCaminaSprite.png',"vacacamina");
asset_manager.queueDownload("./imagenes/granjero1.png","granjeroquieto");
asset_manager.queueDownload("./imagenes/granjero2.png","cubetaarriba");
asset_manager.queueDownload("./imagenes/Sprites3-4.png","granjeroatrapando");
asset_manager.queueDownload("./imagenes/chorro_chico.png","chorro");
asset_manager.queueDownload("./imagenes/fondo.png","fondo");
asset_manager.queueDownload("./imagenes/chorro_derramado.png","chorroderramado");
asset_manager.queueDownload("./imagenes/pollo.png","pollo");

//Al culminar de descargar todas las imágenes se llama a la función enviada
asset_manager.downloadAll(function() {
    lbl_loading.innerHTML = "Presiona cualquier tecla para continuar";
    
    vacalechera = new Juego(ctx, this.mostrar_perdiste);
    
    loaded = true;
    
});

function iniciarJuego() {
    canvas.style.display = "block";
    canvas.style.background = 'url(./imagenes/fondo.png)';
    
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

function onKeyDown(evt) {
    if(iniciado) {
        granjero.onKeyDown(evt);
    }
    else if (loaded) {
        iniciarJuego();
    }
}

function onClick (evt) {
	if(iniciado) {
        granjero.onClick(evt);
	}
	else if (loaded) {
        iniciarJuego();
  }
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

