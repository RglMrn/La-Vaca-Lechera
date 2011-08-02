function Chorro(juego, x, y, disparo) { //Entidad Chorro
	Entidad.call(this, juego, x, y); //Obteniendo los atributos de Entidad
	this.imagen = ASSET_MANAGER.getAsset('./imagenes/chorro.svg');
	this.speed = 0.4
  this.disparo = disparo;
  this.radius = this.imagen.height/2;
}

Chorro.prototype = new Entidad();
Chorro.prototype.constructor = Chorro;

Chorro.prototype.actualizar = function() {//Logica de actualizar la posicion del Chorro
  
  if(this.x <= this.disparo.x) {
    this.x = this.disparo.x;
    this.remover = true;
    //Detectar si se atrapó o no el chorro
    for (var i = 0; i < this.juego.entidades.length; i++) {
      var cubeta = this.juego.entidades[i];
      if (cubeta instanceof Cubeta && this.isCaught(cubeta)) {
        console.log("se atrapo");
      }
    }
  }
  else {
    this.x -= this.speed * this.juego.clockTick;
  }
  Entidad.prototype.actualizar.call(this);
};

Chorro.prototype.dibujar = function(ctx) {//Logica de dibujar del Chorro
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx);
};

Chorro.prototype.isCaught = function(cubeta) {
    var distance_squared = (((this.x - cubeta.x) * 
        (this.x - cubeta.x)) + ((this.y - cubeta.y) * (this.y - cubeta.y)));
    var radii_squared = (this.radius + cubeta.radius) * 
        (this.radius + cubeta.radius);
    return distance_squared < radii_squared;
}
