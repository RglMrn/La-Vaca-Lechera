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
		"x":Math.floor(Math.random()*600),
		"y":100+Math.floor(Math.random()*350)
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
		this.juego.addEntidad(new Chorro(this.juego, this.x, this.y, this.disparo));
    this.juego.lanzados++;
		this.remover = true;
	}
	Entidad.prototype.actualizar.call(this);
}

VacaDisparo.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
};











function Parabola(juego) {
  this.dix = 700;
  this.diy = 400;
  Entidad.call(this, juego, this.dix, this.diy);
  
  this.t = 5000;
  this.g = 1/10000;
  this.ti = this.juego.clock.gameTime;
  this.vy = 0.5 * this.g * this.t;
  var angulo = 70 * Math.PI / 180;
  this.vx = this.vy * Math.cos(angulo) / Math.sin(angulo);
  
  this.imagen = ASSET_MANAGER.getAsset('./imagenes/vaca_normal.jpg');
  var espera = 100;
	this.animation = new Animation(this.imagen, 100, espera, true);
}

Parabola.prototype = new Entidad();
Parabola.prototype.constructor = Parabola;

Parabola.prototype.actualizar = function() {
  var tiempo = this.juego.clock.gameTime - this.ti;
  this.x = this.dix - this.vx * tiempo;
  this.y = this.diy - this.vy * tiempo + 0.5 * this.g * tiempo * tiempo;
  console.log("x=" + this.x + " y=" + this.y);
	Entidad.prototype.actualizar.call(this);
}

Parabola.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
};
