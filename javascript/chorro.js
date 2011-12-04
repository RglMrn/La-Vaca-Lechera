function Chorro(juego, xInicial, yInicial, tiempoVuelo, xFinal) {
    //Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, xInicial, yInicial, yInicial); 
    
    //Coordenadas iniciales
    this.xInicial = xInicial;
    this.yInicial = yInicial;
    
    //Tiempo que pasará el chorro volando
    this.tiempoVuelo = tiempoVuelo;
    //Tiempo que ha transcurrido desde que nacío el chorro
    this.elapsedTime = 0;
    
    //Coordenada en x hasta donde tiene que llegar el chorro
    this.xFinal = xFinal;
    //Distancia en x que tiene que recorrer el chorro
    var deltaX = Math.abs(xFinal - xInicial);
    
    //Gravedad que siente el chorro
    this.gravedad = 1/10000;
    //Velocidades del chorro
    this.velocidadX = deltaX / this.tiempoVuelo;
    this.velocidadY = 0.5 * this.gravedad * this.tiempoVuelo;
    
    //Ángulo del chorro medido en radianes
    this.angulo = 0;
    
    this.imagen = asset_manager.getAsset('chorro');
    this.radius = this.imagen.height/2;
    
    //Tiempo que dura cada frame en milisegundos
    var espera = 100;
    var cantidad_frames = 1;
    this.animation = new Animation(this.imagen, cantidad_frames, espera, true);
}

Chorro.prototype = new Entidad();
Chorro.prototype.constructor = Chorro;

Chorro.prototype.actualizar = function() {  
    //Aumenta el tiempo que lleva el chorro en el aire
    this.elapsedTime += this.juego.clockTick;
    
    //Calcula las coordenadas del chorro
	this.x = this.xInicial - this.velocidadX * this.elapsedTime;
	
    this.y = this.yInicial - this.velocidadY * this.elapsedTime + 0.5 * 
		  this.gravedad * this.elapsedTime * this.elapsedTime;
	
    //Calcula el ángulo del chorro
    this.angulo = Math.atan(this.velocidadY / this.velocidadX + 
						this.gravedad * this.x / Math.pow(this.velocidadX,2) -
						this.gravedad * this.xInicial / Math.pow(this.velocidadX,2) );
	
    //Si ya llegó a su destino
    if(this.y > this.yInicial) {
        this.y = this.yInicial;
        this.remover = true;
    //Detectar si se atrapó o no el chorro
        if(this.isCaught()) {  
            this.juego.atrapados++;
        }
        else {
            this.juego.addEntidad(new ChorroDerramado(this.juego, this.x, this.y + 87 ));
            this.juego.fallados++;
        }
    }
    
    //Llama a la función actualizar de la clase Entidad
	Entidad.prototype.actualizar.call(this);
}

Chorro.prototype.dibujar = function(ctx) {
	this.rotarAndDibujar(ctx);
    
	//Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};

Chorro.prototype.isCaught = function() {
    for (var i = 0; i < this.juego.entidades.length; i++) {
        var granjero = this.juego.entidades[i];
        if (granjero instanceof Granjero && granjero.atrapoChorro(this)) {
            return true;
        }
    }
    return false;
}

Chorro.prototype.rotarAndDibujar = function(ctx) { 
    ctx.save();
    ctx.translate(this.x ,this.y);
	ctx.rotate(this.angulo);
    this.animation.drawFrame(this.juego.clockTick, ctx,  0, 0);
    ctx.restore(); 
};

//CLASE CHORRODERRAMADO

function ChorroDerramado(juego, x, y) {
    //Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, x, y, 0); 
    
    
    this.imagen = asset_manager.getAsset("chorroderramado");
    
    //Tiempo que dura cada frame en milisegundos
    var espera = 100;
    var cantidad_frames = 4;
    this.animation = new Animation(this.imagen, cantidad_frames, espera, false);
}

ChorroDerramado.prototype = new Entidad();
ChorroDerramado.prototype.constructor = ChorroDerramado;

ChorroDerramado.prototype.actualizar = function() {  
    //Verifica si termino la animación
    if(this.animation.willBeDone(this.juego.clock.maxStep)) {
        this.remover = true;
    }
    
    //Llama a la función actualizar de la clase Entidad
    Entidad.prototype.actualizar.call(this);
};

ChorroDerramado.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx,  this.x, this.y);
    
    //Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};
