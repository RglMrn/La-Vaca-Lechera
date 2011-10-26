var canvas = document.getElementById('canvas0');
var estadoLoad = document.getElementById("estadoLoad");
var portada = document.getElementById("portada");
var contenedor = document.getElementById("content");

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
    estadoLoad.innerHTML = "Presiona cualquier tecla para continuar";
    
    vacalechera = new Juego(ctx,function(){
	vaca = new Vaca(this, 780, 200);
    granjero = new Granjero(this, 200, 200);
    pollo = new Pollo(this, 485, 135);
    contador = new Contador(this, 300, 30);
    cronometro = new Cronometro(this, 50, 30);
    
    this.addEntidad(vaca);
    this.addEntidad(granjero);    
    this.addEntidad(pollo);  
    this.addEntidad(contador);  
    this.addEntidad(cronometro);  
	});
    loaded = true;
    
});

function iniciarJuego() {
    canvas.style.display = "block";
    canvas.style.background = 'url(./imagenes/fondo.png)';
    
    contenedor.removeChild(portada); 
    contenedor.removeChild(estadoLoad);
    vacalechera.iniciar();
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


