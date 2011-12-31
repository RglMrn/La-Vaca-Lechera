function Juego(ctx,mostrar_perdiste) { //El controlador principal del juego
    this.mostrar_perdiste = mostrar_perdiste;
    //Context 2d del canvas
    this.ctx = ctx;
}

Juego.prototype.inicializarAtributos = function() {
    //Arreglo que contiene todas las entidades que se actualizan y dibujan
    this.entidades = [];
    
    this.ancho = getAnchoPantalla();
    this.alto = getAltoPantalla();  

    //Total de chorros atrapados
    this.atrapados = 0; 
    //Total de chorros fallados
    this.fallados = 0; 
    //Total de chorros lanzados
    this.lanzados = 0;
    
    //Tiempos en los que llegarán los chorros al suelo
    this.tiemposLlegada = []; 
    
    //Último tick del reloj interno
    this.clockTick = 0;
    
};

Juego.prototype.adicionarElementosIniciales = function() {
    this.stats = new Stats();
    stats = document.getElementById("stats");
	if(stats) {
		document.getElementById('content').removeChild(stats);
    }
    document.getElementById('content').appendChild(this.stats.domElement);
    
    this.clock = new Clock();
    
    
    vaca = new Vaca(this, generarAncho(776), generarAlto(200));
    granjero = new Granjero(this, generarAncho(200), generarAlto(200));
    pollo = new Pollo(this, generarAncho(485), generarAlto(135));
    contador = new Contador(this, generarAncho(300), generarAlto(30));
    cronometro = new Cronometro(this, generarAncho(50), generarAlto(30));
    
    this.addEntidad(vaca);
    this.addEntidad(granjero);    
    this.addEntidad(pollo);  
    this.addEntidad(contador);  
    this.addEntidad(cronometro); 
    
};

//Empieza el loop del juego
Juego.prototype.iniciarJuego = function() { 
	this.inicializarAtributos();
    this.adicionarElementosIniciales();
    
    
    var that = this;
    (function gameLoop() {   
        //evalúa si el jugador perdió
        if (that.fallados > 9) { 
            that.mostrar_perdiste();
        }
        else {
             that.loop();
			 requestAnimFrame(gameLoop, that.ctx.canvas);
        }
        
    })();
};

//Loop del juego que llama a los actualizar y dibujar de las entidades
Juego.prototype.loop = function() { 
    this.actualizar();
    this.dibujar();
    this.stats.update();
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
    
    //Ordena las entidades por su atributo z en orden ascendente
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


Juego.prototype.addEntidad = function(entidad) {
    this.entidades.push(entidad);
    this.entidades.sort(sortAscending);
};

Juego.prototype.getTiempoJuego = function() {
	return this.clock.gameTime;
};

Juego.prototype.calcularDimensiones = function() {
    for (var i = 0; i < this.entidades.length; i++) {
        this.entidades[i].reposicionar(this.ancho, this.alto);
    }
    
    this.ancho = getAnchoPantalla();
    this.alto = getAltoPantalla();  
};

//Función para hacer sorting ascendente en base al atributo 'z'
function sortAscending(a,b){
	return a.z-b.z;
}
    
