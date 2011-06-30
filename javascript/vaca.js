function Vaca(imagen, juego, x, y) { //Entidad Vaca
	Entidad.call(this, imagen, juego, x, y); //Obteniendo los atributos de Entidad
}

Vaca.prototype = new Entidad();
Vaca.prototype.constructor = Vaca;

Vaca.prototype.actualizar = function() {//Logica de actualizar la posicion de la Vaca
	//Logica propia
	Entidad.prototype.actualizar.call(this);
};

Vaca.prototype.dibujar = function(ctx) {//Logica de dibujar de la Vaca
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx);
};

Vaca.prototype.generarChorro = function() { 
	//Generar el chorro y adicionarlo a las entidades del juego
};
