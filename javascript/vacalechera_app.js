var loaded = false;
var iniciado = false;

function iniciarJuego() {
    var texto = document.getElementById("estadoLoad");
    var imagen = document.getElementById("portada");
    var canvas = document.getElementById("canvas0");
    canvas.style.display = "block";
    canvas.style.background = 'url(./imagenes/fondo.png)';
    var container = document.getElementById("content");
    container.removeChild(imagen); 
    container.removeChild(texto);
    vacalechera.iniciar();
    iniciado = true;
}

function onKeyDown(evt) {
    if(iniciado) {
        granjero.moverGranjero(evt);
    }
    else if (loaded) {
        iniciarJuego();
    }
}

function onClick (evt) {
	if(iniciado) {
        granjero.moverGranjero2(evt);
	}
	else if (loaded) {
        iniciarJuego();
  }
}

var canvas = document.getElementById('canvas0');
var ctx = canvas.getContext('2d');
var ASSET_MANAGER = new AssetManager();

var vacalechera;
var vaca;
var granjero;

ASSET_MANAGER.queueDownload("./imagenes/vaca_normal.png","vacanormal");
ASSET_MANAGER.queueDownload("./imagenes/vaca_disparo.png","vacadisparo");
ASSET_MANAGER.queueDownload('./imagenes/vacaCaminaSprite.png',"vacacamina");
ASSET_MANAGER.queueDownload("./imagenes/granjero_cubeta_arriba.png","cubetaarriba");
ASSET_MANAGER.queueDownload("./imagenes/chorro_chico.png","chorro");
ASSET_MANAGER.queueDownload("./imagenes/fondo.png","fondo");
ASSET_MANAGER.queueDownload("./imagenes/chorro_derramado.png","chorroderramado");


ASSET_MANAGER.downloadAll(function() {
    document.getElementById("estadoLoad").innerHTML = "Presiona cualquier tecla para continuar"
    vacalechera = new Juego(ctx);
    vaca = new Vaca(vacalechera, 780, 200);
    granjero = new Granjero(vacalechera, 200, 200);
    
    window.addEventListener('keydown',onKeyDown,true);
	window.addEventListener('click',onClick,true);
    
    vacalechera.addEntidad(vaca);
    vacalechera.addEntidad(granjero);    
    loaded = true;
});
