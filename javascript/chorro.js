function Chorro(juego, x, y) { //Entidad Chorro
	Entidad.call(this, juego, x, y); //Obteniendo los atributos de Entidad
	this.imagen = ASSET_MANAGER.getAsset('./imagenes/chorro.svg');
	this.speed = 0.4
}

Chorro.prototype = new Entidad();
Chorro.prototype.constructor = Chorro;

Chorro.prototype.actualizar = function() {//Logica de actualizar la posicion del Chorro
	this.x -= this.speed * this.juego.clockTick;
	Entidad.prototype.actualizar.call(this);
};

Chorro.prototype.dibujar = function(ctx) {//Logica de dibujar del Chorro
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx);
};
