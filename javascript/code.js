//Shim que se encarga de solicitar el animationFrame del browser que estemos utilizando
//para optimizar la animacion del juego
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();

//Se encarga de cargar todas las imagenes e indicarnos si se cargaron todas exitosamente
//o si hubo algun error.
function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.downloadAll = function(callback) {
    if (this.downloadQueue.length === 0) {
        callback();
    }
    
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            console.log(this.src + ' is loaded');
            that.successCount += 1;
            if (that.isDone()) {
                callback();
            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            if (that.isDone()) {
                callback();
            }
        }, false);
        img.src = path;
        this.cache[path] = img;
    }
}

AssetManager.prototype.getAsset = function(path) {
    return this.cache[path];
}

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
}

function Entidad(imagen, juego, x, y ) { //Define los atributos bases de toda entidad
	this.imagen = imagen;
	this.juego = juego;
	this.x = x;
	this.y = y;
	this.remover = false;
}

Entidad.prototype.actualizar = function() { //La logica basica de actualizacion de las entidades
	
}

Entidad.prototype.dibujar = function(ctx) { //La logica basica de dibujo de las entidades
	if (this.imagen && this.x && this.y) {
        var x = this.x - this.imagen.width/2;
        var y = this.y - this.imagen.height/2;
        ctx.drawImage(this.imagen, x, y);
	}	
}

function Cubeta(imagen, juego, x, y) { //Entidad Cubeta
	Entidad.call(this, imagen, juego, x, y); //Obteniendo los atributos de Entidad
}

Cubeta.prototype = new Entidad();
Cubeta.prototype.constructor = Cubeta;

Cubeta.prototype.actualizar = function() {//Logica de actualizar la posicion de la cubeta
	//Logica propia
	Entidad.prototype.actualizar.call(this)
}

Cubeta.prototype.dibujar = function(ctx) {//Logica de dibujar de la cubeta
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx)
}

function Vaca(imagen, juego, x, y) { //Entidad Vaca
	Entidad.call(this, imagen, juego, x, y); //Obteniendo los atributos de Entidad
}

Vaca.prototype = new Entidad();
Vaca.prototype.constructor = Vaca;

Vaca.prototype.actualizar = function() {//Logica de actualizar la posicion de la Vaca
	//Logica propia
	Entidad.prototype.actualizar.call(this)
}

Vaca.prototype.dibujar = function(ctx) {//Logica de dibujar de la Vaca
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx)
}

Vaca.prototype.generarChorro = function() { 
	//Generar el chorro y adicionarlo a las entidades del juego
}

function Chorro(imagen, juego, x, y) { //Entidad Chorro
	Entidad.call(this, imagen, juego, x, y); //Obteniendo los atributos de Entidad
}

Chorro.prototype = new Entidad();
Chorro.prototype.constructor = Chorro;

Chorro.prototype.actualizar = function() {//Logica de actualizar la posicion del Chorro
	//Logica propia
	Entidad.prototype.actualizar.call(this)
}

Chorro.prototype.dibujar = function(ctx) {//Logica de dibujar del Chorro
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx)
}

function Juego(ctx) { //El controlador principal del juego
    this.entidades = [];
    this.ctx = ctx;
    this.ancho = ctx.canvas.width;
    this.alto = ctx.canvas.height;
    
    this.lastUpdateTimestamp = null; //Sirven para determinar cuanto tiempo ha pasado desde el ultimo update
    this.deltaTime = null;
}

Juego.prototype.iniciar = function() { //Inicia el juego y el loop principal
    this.lastUpdateTimestamp = Date.now();
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

Juego.prototype.addEntidad = function(entidad) {
    this.entidades.push(entidad);
}

Juego.prototype.dibujar = function() {
    this.ctx.clearRect(0, 0, this.ancho, this.alto);
    this.ctx.save(); //No se si es necesario
    for (var i = 0; i < this.entidades.length; i++) {
        this.entidades[i].draw(this.ctx);
    }
    this.ctx.restore(); //No se si es necesario
}

Juego.prototype.actualizar = function() {
    for (var i = 0; i < this.entidades.length; i++) {
        var entidad = this.entidades[i];
        
        if (!entidad.remover) {
            entity.update();
        }
    }
    
    for (var i = this.entities.length-1; i >= 0; --i) {
        if (this.entities[i].remover) {
            this.entities.splice(i, 1);
        }
    }
}

Juego.prototype.loop = function() { //loop del juego que llama a los actualizar y dibujar de las entidades
    var now = Date.now();
    this.deltaTime = now - this.lastUpdateTimestamp;
    this.actualizar();
    this.dibujar();
    this.lastUpdateTimestamp = now;
}

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

