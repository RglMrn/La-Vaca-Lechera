function Chorro(juego, xInicial, yInicial, tiempoTotal, xFinal) {
    this.xInicial = xInicial;
    this.yInicial = yInicial;
    this.angulo = 0;
    this.tiempoTotal = tiempoTotal;
    this.xFinal = xFinal;

    this.gravedad = 1/10000;
    this.elapsedTime = 0;

    var deltaX = Math.abs(xFinal - xInicial);
    this.velocidadX = deltaX / tiempoTotal;
    this.velocidadY = 0.5 * this.gravedad * this.tiempoTotal;

    Entidad.call(this, juego, this.xInicial, this.yInicial);
    this.imagen = ASSET_MANAGER.getAsset('./imagenes/chorro_chico.png');
    this.radius = this.imagen.height/2;
    var espera = 100;
    this.animation = new Animation(this.imagen, 67, espera, true);
}

Chorro.prototype = new Entidad();
Chorro.prototype.constructor = Chorro;

Chorro.prototype.actualizar = function() {  
  

	this.x = this.xInicial - this.velocidadX * this.elapsedTime;
	this.y = this.yInicial - this.velocidadY * this.elapsedTime + 0.5 * 
		  this.gravedad * this.elapsedTime * this.elapsedTime;
	this.angulo = Math.atan(this.velocidadY / this.velocidadX + 
						this.gravedad * this.x / Math.pow(this.velocidadX,2) -
						this.gravedad * this.xInicial / Math.pow(this.velocidadX,2) );

	this.elapsedTime += this.juego.clockTick;
	
  //Si ya llegó a su destino
  if(this.y > this.yInicial) {
    this.y = this.yInicial;
    this.remover = true;
    //Detectar si se atrapó o no el chorro
    if(this.isCaught()) {  
        this.juego.atrapados++;
    }
    else {
        this.juego.fallados++;
    }
  }
	Entidad.prototype.actualizar.call(this);
}

Chorro.prototype.dibujar = function(ctx) {
	this.rotarAndDibujar(ctx);
	Entidad.prototype.dibujar.call(this, ctx);
};

Chorro.prototype.isCaught = function() {
  for (var i = 0; i < this.juego.entidades.length; i++) {
    var cubeta = this.juego.entidades[i];
    if (cubeta instanceof Cubeta && cubeta.atrapoChorro(this)) {
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
