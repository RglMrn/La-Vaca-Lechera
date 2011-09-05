function Sombra(juego, xInicial, yInicial, tiempoTotal, xFinal) {
  this.xInicial = xInicial;
  this.yInicial = yInicial;
  this.tiempoTotal = tiempoTotal;
  this.xFinal = xFinal;
  this.distanciaChorro = 0;
  
  this.gravedad = 1/10000;
  this.elapsedTime = 0;
  
  var deltaX = Math.abs(xFinal - xInicial);
  this.velocidadX = deltaX / tiempoTotal;
  this.velocidadY = 0.5 * this.gravedad * this.tiempoTotal;
  
  Entidad.call(this, juego, this.xInicial, this.yInicial);
  //var espera = 100;
	//this.animation = new Animation(this.imagen, 50, espera, true);
}

Sombra.prototype = new Entidad();
Sombra.prototype.constructor = Sombra;

Sombra.prototype.actualizar = function() {  
  this.elapsedTime += this.juego.clockTick;
  this.x = this.xInicial - this.velocidadX * this.elapsedTime;
  
  //Calcular la distancia a la cual se encuentra el chorro
  var yChorro = this.yInicial - this.velocidadY * this.elapsedTime + 0.5 * 
          this.gravedad * this.elapsedTime * this.elapsedTime;
  this.distanciaChorro = Math.abs(yChorro - this.y);
  
  //Si ya llegó a su destino
  if(this.x <= this.xFinal) {
    this.remover = true;
  }
	Entidad.prototype.actualizar.call(this);
}

Sombra.prototype.dibujar = function(ctx) {  
    //El tamaño y el alpha de la sombra dependen de la distancia del chorro
    var radius;
    var distMax=1500;

    ctx.save();
    if(this.distanciaChorro>distMax) {
    ctx.globalAlpha = 0;
    radius = 0;
    }
    else {
    ctx.globalAlpha = 1-this.distanciaChorro/distMax;
    radius = 25*this.distanciaChorro/distMax;
    }
    //Dibujar sombra
    ctx.translate(this.x, this.y);
    ctx.scale(2, 1);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI*2, false);    
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
    ctx.restore();

    
};
