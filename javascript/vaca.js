function Vaca(juego, x, y) {
	this.sprite = ASSET_MANAGER.getAsset('./imagenes/vaca_normal.jpg');
	Entidad.call(this, this.sprite, juego, x, y);
	var espera = 1000; //Tiempo antes de siguiente acción
	this.animation = new Animation(this.sprite, 100, espera, false);
	//Opciones para los disparos
	this.alturas = [100, 250, 450];
	this.distancias = [100, 200, 400];
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
	var altura_rand = Math.floor(Math.random()*this.alturas.length);
	var distancia_rand = Math.floor(Math.random()*this.distancias.length);
	disparo = {
		"x":this.distancias[distancia_rand],
		"y":this.alturas[altura_rand]
	}
	return disparo;
}

function VacaArriba(juego, x, y, disparo) {
	this.sprite = ASSET_MANAGER.getAsset('./imagenes/vaca_arriba.jpg');
	this.speed = 0.1;
	this.animation = new Animation(this.sprite, 100, 100, true);
	this.disparo = disparo;
	Entidad.call(this, this.sprite, juego, x, y);
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
	this.sprite = ASSET_MANAGER.getAsset('./imagenes/vaca_abajo.png');
	this.speed = 0.1;
	this.animation = new Animation(this.sprite, 100, 100, true);
	this.disparo = disparo;
	Entidad.call(this, this.sprite, juego, x, y);
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
	this.sprite = ASSET_MANAGER.getAsset('./imagenes/vaca_disparo.jpg');
	this.animation = new Animation(this.sprite, 100, 100, false);
	this.disparo = disparo;
	Entidad.call(this, this.sprite, juego, x, y);
}

VacaDisparo.prototype = new Entidad();
VacaDisparo.prototype.constructor = VacaDisparo;

VacaDisparo.prototype.actualizar = function() {
	if(this.animation.willBeDone(this.juego.clock.maxStep)) {
		this.juego.addEntidad(new Vaca(this.juego, this.x, this.y));
		this.remover = true;
	}
	Entidad.prototype.actualizar.call(this);
}

VacaDisparo.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
};
