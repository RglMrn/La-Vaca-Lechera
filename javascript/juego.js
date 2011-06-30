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
};

Juego.prototype.addEntidad = function(entidad) {
    this.entidades.push(entidad);
};

Juego.prototype.dibujar = function() {
    this.ctx.clearRect(0, 0, this.ancho, this.alto);
    this.ctx.save(); //No se si es necesario
    for (var i = 0; i < this.entidades.length; i++) {
        this.entidades[i].draw(this.ctx);
    }
    this.ctx.restore(); //No se si es necesario
};

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
};

Juego.prototype.loop = function() { //loop del juego que llama a los actualizar y dibujar de las entidades
    var now = Date.now();
    this.deltaTime = now - this.lastUpdateTimestamp;
    this.actualizar();
    this.dibujar();
    this.lastUpdateTimestamp = now;
};
