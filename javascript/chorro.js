function Chorro(juego, xInicial, yInicial, tiempoTotal, xFinal) {
  this.xInicial = xInicial;
  this.yInicial = yInicial;
  this.tiempoTotal = tiempoTotal;
  this.xFinal = xFinal;
  
  this.gravedad = 1/10000;
  this.elapsedTime = 0;
  
  var deltaX = Math.abs(xFinal - xInicial);
  this.velocidadX = deltaX / tiempoTotal;
  this.velocidadY = 0.5 * this.gravedad * this.tiempoTotal;
  
  Entidad.call(this, juego, this.xInicial, this.yInicial);
  this.imagen = ASSET_MANAGER.getAsset('./imagenes/chorro.png');
  this.radius = this.imagen.height/2;
  var espera = 100;
	this.animation = new Animation(this.imagen, 335, espera, true);
}

Chorro.prototype = new Entidad();
Chorro.prototype.constructor = Chorro;

Chorro.prototype.actualizar = function() {  
  this.elapsedTime += this.juego.clockTick;
  this.x = this.xInicial - this.velocidadX * this.elapsedTime;
  this.y = this.yInicial - this.velocidadY * this.elapsedTime + 0.5 * 
          this.gravedad * this.elapsedTime * this.elapsedTime;
  //Si ya llegó a su destino
  if(this.y >= this.yInicial) {
    this.remover = true;
    //Detectar si se atrapó o no el chorro
    if(this.isCaught()) {  
      this.juego.atrapados++;
    }
  }
	Entidad.prototype.actualizar.call(this);
}

Chorro.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
  Entidad.prototype.dibujar.call(this, ctx);
};

Chorro.prototype.isCaught = function() {
  for (var i = 0; i < this.juego.entidades.length; i++) {
    var cubeta = this.juego.entidades[i];
    if (cubeta instanceof Cubeta && this.hayColision(cubeta)) {
      return true;
    }
  }
  return false;
}

Chorro.prototype.hayColision = function(cubeta) {
    var distance_squared = (((this.x - cubeta.x) * 
        (this.x - cubeta.x)) + ((this.y - cubeta.y) * (this.y - cubeta.y)));
    var radii_squared = (this.radius + cubeta.radius) * 
        (this.radius + cubeta.radius);
    return distance_squared < radii_squared;
}
