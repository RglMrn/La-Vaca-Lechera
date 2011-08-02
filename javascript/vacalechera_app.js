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

ASSET_MANAGER.queueDownload("./imagenes/vaca_normal.jpg");
ASSET_MANAGER.queueDownload("./imagenes/vaca_disparo.jpg");
ASSET_MANAGER.queueDownload('./imagenes/vaca_arriba.jpg');
ASSET_MANAGER.queueDownload('./imagenes/vaca_abajo.png');
ASSET_MANAGER.queueDownload("./imagenes/granjero_cubeta_abajo_small.jpeg");
ASSET_MANAGER.queueDownload("./imagenes/chorro.svg");



ASSET_MANAGER.downloadAll(function() {

    vacalechera = new Juego(ctx);
    vaca = new Vaca(vacalechera, 800, 200);
    cubeta = new Cubeta(vacalechera, 200, 200);
    window.addEventListener('keydown',presionoKey,true);
    vacalechera.addEntidad(vaca);
    vacalechera.addEntidad(cubeta);
    
    vacalechera.iniciar();
});
