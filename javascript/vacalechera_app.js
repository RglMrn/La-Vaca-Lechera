var canvas = document.getElementById('canvas0');
var lbl_loading = document.getElementById("lbl_loading");
var portada = document.getElementById("portada");
var contenedor = document.getElementById("content");
var fondo_perdiste = document.getElementById("fondo_perdiste");
var btn_reintentar = document.getElementById("btn_reintentar");

var ctx = canvas.getContext('2d');
var ASSET_MANAGER = new AssetManager();

var vacalechera;
var vaca;
var granjero;
var pollo;
var contador;
var cronometro;

var loaded = false;
var iniciado = false;

window.addEventListener('keydown',onKeyDown,true);
contenedor.addEventListener('click',onClick,true);

ASSET_MANAGER.queueDownload("./imagenes/vaca_normal.png","vacanormal");
ASSET_MANAGER.queueDownload("./imagenes/vaca_disparo.png","vacadisparo");
ASSET_MANAGER.queueDownload('./imagenes/vacaCaminaSprite.png',"vacacamina");
ASSET_MANAGER.queueDownload("./imagenes/granjero1.png","granjeroquieto");
ASSET_MANAGER.queueDownload("./imagenes/granjero2.png","cubetaarriba");
ASSET_MANAGER.queueDownload("./imagenes/Sprites3-4.png","granjeroatrapando");
ASSET_MANAGER.queueDownload("./imagenes/chorro_chico.png","chorro");
ASSET_MANAGER.queueDownload("./imagenes/fondo.png","fondo");
ASSET_MANAGER.queueDownload("./imagenes/chorro_derramado.png","chorroderramado");
ASSET_MANAGER.queueDownload("./imagenes/pollo.png","pollo");

ASSET_MANAGER.downloadAll(function() {
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

function reiniciarJuego(evt){
	fondo_perdiste.style.display = "none";
	vacalechera.iniciarJuego();
};

function mostrar_perdiste() {
    fondo_perdiste.style.display = "block";
    btn_reintentar.addEventListener('click',reiniciarJuego,false);
};

