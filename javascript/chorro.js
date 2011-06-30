function Chorro(imagen, juego, x, y) { //Entidad Chorro
	Entidad.call(this, imagen, juego, x, y); //Obteniendo los atributos de Entidad
}

Chorro.prototype = new Entidad();
Chorro.prototype.constructor = Chorro;

Chorro.prototype.actualizar = function() {//Logica de actualizar la posicion del Chorro
	//Logica propia
	Entidad.prototype.actualizar.call(this);
};

Chorro.prototype.dibujar = function(ctx) {//Logica de dibujar del Chorro
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx);
};
