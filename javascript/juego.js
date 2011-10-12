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

function Juego(ctx) { //El controlador principal del juego
    this.entidades = [];
    this.ctx = ctx;
    this.ancho = ctx.canvas.width;
    this.alto = ctx.canvas.height;
    this.lanzados = 0; //Total de chorros lanzados
    this.atrapados = 0; //Total de chorros atrapados
    this.fallados = 0; //Total de chorros fallados
    this.tiemposLlegada = []; //Tiempos en los que llegarán los chorros al suelo
	
    this.clock = new Clock();
    this.clockTick;
}

Juego.prototype.iniciar = function() { //Inicia el juego y el loop principal
    var that = this;
    (function gameLoop() {
        if (that.fallados > 9) { //evalúa si el jugador perdió
            that.perdiste();
        }
        else {
             that.loop();
        }
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
};

Juego.prototype.addEntidad = function(entidad) {
    this.entidades.unshift(entidad);
};

Juego.prototype.dibujar = function() {
    this.ctx.clearRect(0, 0, this.ancho, this.alto);
    this.ctx.save();
    for (var i = 0; i < this.entidades.length; i++) {
        this.entidades[i].dibujar(this.ctx);
    }
    this.ctx.restore();
};

Juego.prototype.actualizar = function() {
    this.clockTick = this.clock.tick();
    
    //Se recorre dos veces para asegurarse de que entidades que deben 
    //ser removidas no lleguen a ser dibujadas.
    
    for (var i = this.entidades.length-1; i >= 0; --i) {
        
        if (!this.entidades[i].remover) {
            this.entidades[i].actualizar();
        }
    }
    
    for (var i = this.entidades.length-1; i >= 0; --i) {
        
        if (this.entidades[i].remover) {
            this.entidades.splice(i, 1);
        }
    }
};

Juego.prototype.getTiempoJuego = function() {
	return this.clock.gameTime;
};

Juego.prototype.loop = function() { //loop del juego que llama a los actualizar y dibujar de las entidades
    this.actualizar();
    this.dibujar();
};

Juego.prototype.perdiste = function() { //evalúa si el jugador perdió

    this.ctx.font = "20mm Arial";
    this.ctx.fillStyle = "red"; 
    this.ctx.fillText("Perdiste" ,275, 225);
};    
    
