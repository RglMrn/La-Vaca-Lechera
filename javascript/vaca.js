function Vaca(imagenes, juego, x, y) { //Entidad Vaca
	this.img_normal = imagenes[0];
	this.img_disparo = imagenes[1];
	Entidad.call(this, this.img_normal, juego, x, y) //Obteniendo los atributos de Entidad
	this.acciones = { //Acciones que puede realizar la vaca
		ELEGIR_DISPARO : 0,
		MOVERSE : 1,
		DISPARAR : 2
	}
	this.posiciones = [100, 250, 450] //Valor Y para cada posición
	this.dy = 5 //Aumento en Y por cada iteración
	this.dt = 50 //Tiempo entre un disparo y otro
	this.contador = 0
	this.accion = this.acciones.ELEGIR_DISPARO
}

Vaca.prototype = new Entidad()
Vaca.prototype.constructor = Vaca

Vaca.prototype.actualizar = function() {//Logica de actualizar la posicion de la Vaca
	if(this.accion == this.acciones.ELEGIR_DISPARO){ this.elegir_disparo() }
	else if(this.accion == this.acciones.MOVERSE) { this.moverse() }
	else { this.disparar() }
	Entidad.prototype.actualizar.call(this)
}

Vaca.prototype.elegir_disparo = function() {
	this.imagen = this.img_normal
	if(this.contador < this.dt) {
		this.contador++
	}
	else {
		this.contador = 0
		var random = Math.floor(Math.random()*this.posiciones.length)
		this.posicion = this.posiciones[random]
		this.accion = this.acciones.MOVERSE
	}
}

Vaca.prototype.moverse = function() {
	if(this.y < this.posicion) { 
		this.y += this.dy
		if(this.y > this.posicion) {
			this.y = this.posicion
		}
	}
	else if(this.y > this.posicion) { 
		this.y -= this.dy
		if(this.y < this.posicion) {
			this.y = this.posicion
		}
	}
	else {
		this.accion = this.acciones.DISPARAR
	}
}

Vaca.prototype.disparar = function() {
	this.imagen = this.img_disparo
	if(this.contador < this.dt) {
		this.contador++
	}
	else {
		this.contador = 0
		this.accion = this.acciones.ELEGIR_DISPARO
	}
}

Vaca.prototype.dibujar = function(ctx) {//Logica de dibujar de la Vaca
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx);
};

Vaca.prototype.generarChorro = function() { 
	//Generar el chorro y adicionarlo a las entidades del juego
};
