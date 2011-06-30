//Pruebas
var canvas = document.getElementById('fondo');
var ctx = canvas.getContext('2d');
var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./imagenes/vaca2.jpg");
ASSET_MANAGER.queueDownload("./imagenes/fondo.jpg");
ASSET_MANAGER.queueDownload("./imagenes/cubo.jpg");
ASSET_MANAGER.queueDownload("./imagenes/chorro2.jpeg");

ASSET_MANAGER.downloadAll(function() {
	ctx.drawImage(ASSET_MANAGER.getAsset('./imagenes/fondo.jpg'),0,0);
    var vaca = new Vaca(ASSET_MANAGER.getAsset('./imagenes/vaca2.jpg'), "jueg", 950, 600);
	var cubeta = new Cubeta(ASSET_MANAGER.getAsset('./imagenes/cubo.jpg'), "juego", 200, 600);
	var chorro = new Chorro(ASSET_MANAGER.getAsset('./imagenes/chorro2.jpeg'), "juego", 600, 500);
	
	vaca.dibujar(ctx);
	cubeta.dibujar(ctx);
	chorro.dibujar(ctx);
});
