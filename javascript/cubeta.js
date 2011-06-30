function Cubeta(imagen, juego, x, y) { //Entidad Cubeta
	Entidad.call(this, imagen, juego, x, y); //Obteniendo los atributos de Entidad
}

Cubeta.prototype = new Entidad();
Cubeta.prototype.constructor = Cubeta;

Cubeta.prototype.actualizar = function() {//Logica de actualizar la posicion de la cubeta
	//Logica propia
	Entidad.prototype.actualizar.call(this);
};

Cubeta.prototype.dibujar = function(ctx) {//Logica de dibujar de la cubeta
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx);
};
