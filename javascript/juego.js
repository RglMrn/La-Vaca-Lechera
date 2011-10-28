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

//Función para hacer sorting ascendente en base al atributo 'z'
function sortAscending(a,b){
	return a.z-b.z;
}

function Juego(ctx,mostrar_perdiste) { //El controlador principal del juego
    this.mostrar_perdiste = mostrar_perdiste;
    
}

Juego.prototype.inicializarAtributos = function() {
    this.entidades = [];
    this.ctx = ctx;
    this.ancho = ctx.canvas.width;
    this.alto = ctx.canvas.height;
    this.lanzados = 0; //Total de chorros lanzados
    this.atrapados = 0; //Total de chorros atrapados
    this.fallados = 0; //Total de chorros fallados
    this.tiemposLlegada = []; //Tiempos en los que llegarán los chorros al suelo
    this.clockTick = 0;
    
    
};

Juego.prototype.adicionarElementosIniciales = function() {
    this.stats = new Stats();
    stats = document.getElementById("stats");
	if(stats)
		document.body.removeChild(stats);
    document.body.appendChild(this.stats.domElement);
    
    this.clock = new Clock();
    
    
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
    
};

Juego.prototype.iniciarJuego = function() { //Inicia el juego y el loop principal
	this.inicializarAtributos();
    this.adicionarElementosIniciales();
    
    
    var that = this;
    (function gameLoop() {   
        //evalúa si el jugador perdió
        if (that.fallados > 0) { 
            that.mostrar_perdiste();
        }
        else {
             that.loop();
			 requestAnimFrame(gameLoop, that.ctx.canvas);
        }
        
    })();
};

Juego.prototype.addEntidad = function(entidad) {
    this.entidades.unshift(entidad);
    this.entidades.sort(sortAscending);
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
    this.entidades.sort(sortAscending);
    for (var i = this.entidades.length-1; i >= 0; --i) {
        
        if (this.entidades[i].remover) {
            this.entidades.splice(i, 1);
        }
    }
    
    //Ordena las entidades por su atributo z en orden ascendente
    this.entidades.sort(sortAscending);
};

Juego.prototype.getTiempoJuego = function() {
	return this.clock.gameTime;
};

Juego.prototype.loop = function() { //loop del juego que llama a los actualizar y dibujar de las entidades
    this.actualizar();
    this.dibujar();
    this.stats.update();
    this.actualizarPintadas();
};

Juego.prototype.actualizarPintadas = function() { //Indica la cantidad de veces que se ha pintado sobre el window
    this.ctx.font = "5mm Arial";
    this.ctx.fillStyle = "black"; 
    this.ctx.fillText(window.mozPaintCount ,750, 25);
    
}
    
