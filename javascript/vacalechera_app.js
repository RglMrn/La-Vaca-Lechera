//Pruebas
function presionoKey(evt) {
    cubeta.moverCubeta(evt);
}

var canvas = document.getElementById('fondo');
var ctx = canvas.getContext('2d');
var ASSET_MANAGER = new AssetManager();

var vacalechera;
var vaca;
var cubeta;

ASSET_MANAGER.queueDownload("./imagenes/vaca2.jpg");
ASSET_MANAGER.queueDownload("./imagenes/granjero_cubeta_abajo_small.jpeg");
ASSET_MANAGER.queueDownload("./imagenes/chorro2.jpeg");



ASSET_MANAGER.downloadAll(function() {
	
    vacalechera = new Juego(ctx);
    vaca = new Vaca(ASSET_MANAGER.getAsset('./imagenes/vaca2.jpg'), vacalechera, 800, 400);
    cubeta = new Cubeta(ASSET_MANAGER.getAsset('./imagenes/granjero_cubeta_abajo_small.jpeg'), vacalechera, 200, 200);
    window.addEventListener('keydown',presionoKey,true);
    vacalechera.addEntidad(vaca);
    vacalechera.addEntidad(cubeta);
    
    vacalechera.iniciar();
});
