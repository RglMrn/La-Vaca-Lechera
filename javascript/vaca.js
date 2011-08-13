function Vaca(juego, x, y) {
	this.imagen = ASSET_MANAGER.getAsset('./imagenes/vaca_normal.jpg');
	Entidad.call(this, juego, x, y);
	var espera = 1000; //Tiempo antes de siguiente acción
	this.animation = new Animation(this.imagen, 100, espera, false);
}

Vaca.prototype = new Entidad();
Vaca.prototype.constructor = Vaca;

Vaca.prototype.actualizar = function() {
	if(this.animation.willBeDone(this.juego.clock.maxStep)){
		var disparo = this.elegirDisparo();
		if(disparo.y > this.y) {
			//Mover hacia abajo
			this.juego.addEntidad(new VacaAbajo(this.juego, this.x, this.y, disparo));
			this.remover = true;
		}
		else if(disparo.y < this.y) {
			//Mover hacia arriba
			this.juego.addEntidad(new VacaArriba(this.juego, this.x, this.y, disparo));
			this.remover = true;
		}
		else {
			//Disparar
			this.juego.addEntidad(new VacaDisparo(this.juego, this.x, this.y, disparo));
			this.remover = true;
		}
	}
	Entidad.prototype.actualizar.call(this);
}

Vaca.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
};

Vaca.prototype.elegirDisparo = function() {
	disparo = {
		"x":50+Math.floor(Math.random()*450),
		"y":100+Math.floor(Math.random()*300),
    "t":7000+Math.floor(Math.random()*8000)
	}
	return disparo;
}

function VacaArriba(juego, x, y, disparo) {
	this.imagen = ASSET_MANAGER.getAsset('./imagenes/vaca_arriba.jpg');
	this.speed = 0.1;
	this.animation = new Animation(this.imagen, 100, 100, true);
	this.disparo = disparo;
	Entidad.call(this, juego, x, y);
}

VacaArriba.prototype = new Entidad();
VacaArriba.prototype.constructor = VacaArriba;

VacaArriba.prototype.actualizar = function() {
	if(this.y < this.disparo.y) {
		this.y = this.disparo.y
		this.juego.addEntidad(new VacaDisparo(this.juego, this.x, this.y, this.disparo));
		this.remover = true;
	}
	else {
		this.y -= this.speed * this.juego.clockTick;
	}
	Entidad.prototype.actualizar.call(this);
}

VacaArriba.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
};

function VacaAbajo(juego, x, y, disparo) {
	this.imagen = ASSET_MANAGER.getAsset('./imagenes/vaca_abajo.png');
	this.speed = 0.1;
	this.animation = new Animation(this.imagen, 100, 100, true);
	this.disparo = disparo;
	Entidad.call(this, juego, x, y);
}

VacaAbajo.prototype = new Entidad();
VacaAbajo.prototype.constructor = VacaAbajo;

VacaAbajo.prototype.actualizar = function() {
	if(this.y > this.disparo.y) {
		this.y = this.disparo.y
		this.juego.addEntidad(new VacaDisparo(this.juego, this.x, this.y, this.disparo));
		this.remover = true;
	}
	else {
		this.y += this.speed * this.juego.clockTick;
	}
	Entidad.prototype.actualizar.call(this);
}

VacaAbajo.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
};

function VacaDisparo(juego, x, y, disparo) {
	this.imagen = ASSET_MANAGER.getAsset('./imagenes/vaca_disparo.jpg');
	this.animation = new Animation(this.imagen, 100, 100, false);
	this.disparo = disparo;
	Entidad.call(this, juego, x, y);
}

VacaDisparo.prototype = new Entidad();
VacaDisparo.prototype.constructor = VacaDisparo;

VacaDisparo.prototype.actualizar = function() {
	if(this.animation.willBeDone(this.juego.clock.maxStep)) {
		this.juego.addEntidad(new Vaca(this.juego, this.x, this.y));
		this.juego.addEntidad(new Chorro(this.juego, this.x, this.y, 
                                    this.disparo.t, this.disparo.x));
    this.juego.addEntidad(new Sombra(this.juego, this.x, this.y + this.imagen.height / 2 , 
                                    this.disparo.t, this.disparo.x));
    this.juego.lanzados++;
		this.remover = true;
	}
	Entidad.prototype.actualizar.call(this);
}

VacaDisparo.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
};
