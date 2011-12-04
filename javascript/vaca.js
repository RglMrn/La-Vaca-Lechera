function Vaca(juego, x, y) {
    //Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, x, y, 1337);
    
	this.imagen = asset_manager.getAsset('vacanormal');
	var espera = 880; //Tiempo antes de siguiente acción
	this.animation = new Animation(this.imagen, 1, espera, false);
}

Vaca.prototype = new Entidad();
Vaca.prototype.constructor = Vaca;

Vaca.prototype.actualizar = function() {
    this.x = this.juego.ancho * 0.97;
	if(this.animation.willBeDone(this.juego.clock.maxStep)){
		var disparo = this.elegirDisparo();
		if(disparo != null) {
			if(disparo.y > this.y) {
				//Mover hacia abajo
				this.juego.addEntidad(new VacaAbajo(this.juego, this.x, this.y, disparo.y, disparo));
				this.remover = true;
			}
			else if(disparo.y < this.y) {
				//Mover hacia arriba
				this.juego.addEntidad(new VacaArriba(this.juego, this.x, this.y, disparo.y, disparo));
				this.remover = true;
			}
			else {
				//Disparar
				this.juego.addEntidad(new VacaDisparo(this.juego, this.x, this.y, disparo));
				this.remover = true;
			}
		}
		else {
			var nuevaY = 100+Math.floor(Math.random()*300);
			if(nuevaY > this.y) {
				//Mover hacia abajo
				this.juego.addEntidad(new VacaAbajo(this.juego, this.x, this.y, nuevaY, disparo));
				this.remover = true;
			}
			else if(nuevaY < this.y) {
				//Mover hacia arriba
				this.juego.addEntidad(new VacaArriba(this.juego, this.x, this.y, nuevaY, disparo));
				this.remover = true;
			}
		}
	}
    
	//Llama a la función actualizar de la clase Entidad
    Entidad.prototype.actualizar.call(this);
};

Vaca.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
    
    //Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};

Vaca.prototype.elegirDisparo = function() {
	var intentos = 0;
	do {
		var disparo = {
			"x":100+Math.floor(Math.random()*400),
			"y":215+Math.floor(Math.random()*135),
			"t":7000+Math.floor(Math.random()*8000)
		}
		var aceptable = true;
		var tiempoLlegada = disparo.t + this.juego.getTiempoJuego();
		var tiempoEntreChorros = 3000;
		
		for (var i = 0; i < this.juego.tiemposLlegada.length; i++) { //Revisa si existe algun chorro que caera en un rango de 
			if((tiempoLlegada - tiempoEntreChorros) <= this.juego.tiemposLlegada[i] &&  //-3 a +3 segundos del tiempo generado 
				this.juego.tiemposLlegada[i] <= (tiempoLlegada + tiempoEntreChorros)) {
				aceptable = false;	
				intentos++;
			}
		}
	}while (aceptable == false && intentos <= 10);
	
    if(aceptable == true) {
		this.juego.tiemposLlegada.push(tiempoLlegada);
		return disparo;
	}
	else {
		return null;
	}
};

//CLASE VACA ARRIBA

function VacaArriba(juego, x, y, yFinal, disparo ) {
	//Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, x, y);
    
    this.imagen = asset_manager.getAsset('vacacamina');
	this.speed = 0.1;
	this.animation = new Animation(this.imagen, 2, 100, true);
	this.disparo = disparo;
	this.yFinal = yFinal;
}

VacaArriba.prototype = new Entidad();
VacaArriba.prototype.constructor = VacaArriba;

VacaArriba.prototype.actualizar = function() {
    this.x = this.juego.ancho * 0.97;
	if(this.y < this.yFinal) {
		this.y = this.yFinal
		if(this.disparo != null){
			this.juego.addEntidad(new VacaDisparo(this.juego, this.x, this.y, this.disparo));
		}
		else {
			this.juego.addEntidad(new Vaca(this.juego, this.x, this.y));
		}
		this.remover = true;
	}
	else {
		this.y -= this.speed * this.juego.clockTick;
	}
    
	//Llama a la función actualizar de la clase Entidad
    Entidad.prototype.actualizar.call(this);
};

VacaArriba.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
    
    //Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};

//CLASE VACA ABAJO

function VacaAbajo(juego, x, y,yFinal ,disparo) {
    //Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, x, y);
    
	this.imagen = asset_manager.getAsset('vacacamina');
	this.speed = 0.1;
	this.animation = new Animation(this.imagen, 2, 100, true);
	this.disparo = disparo;
	this.yFinal = yFinal;
	
}

VacaAbajo.prototype = new Entidad();
VacaAbajo.prototype.constructor = VacaAbajo;

VacaAbajo.prototype.actualizar = function() {
    this.x = this.juego.ancho * 0.97;
	if(this.y > this.yFinal) {
		this.y = this.yFinal
		if(this.disparo != null){
			this.juego.addEntidad(new VacaDisparo(this.juego, this.x, this.y, this.disparo));
		}
		else {
			this.juego.addEntidad(new Vaca(this.juego, this.x, this.y));
		}
		this.remover = true;
	}
	else {
		this.y += this.speed * this.juego.clockTick;
	}
    
	//Llama a la función actualizar de la clase Entidad
    Entidad.prototype.actualizar.call(this);
};

VacaAbajo.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
    
    //Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};

//CLASE VACA DISPARO

function VacaDisparo(juego, x, y, disparo) {
    //Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, x, y);
    
	this.imagen = asset_manager.getAsset('vacadisparo');
	this.animation = new Animation(this.imagen, 11, 100, false);
	this.disparo = disparo;

}

VacaDisparo.prototype = new Entidad();
VacaDisparo.prototype.constructor = VacaDisparo;

VacaDisparo.prototype.actualizar = function() {
    this.x = this.juego.ancho * 0.97;
    var offset = 60;  //Ancho invisible de la vaca
	if(this.animation.willBeDone(this.juego.clock.maxStep)) {
		this.juego.addEntidad(new Vaca(this.juego, this.x, this.y));
		this.juego.addEntidad(new Chorro(this.juego, this.x - offset, this.y, 
                                    this.disparo.t, this.disparo.x));
        this.juego.addEntidad(new Sombra(this.juego, this.x - offset, 
            this.y + this.imagen.height / 2 , this.disparo.t, 
            this.disparo.x));
            
    this.juego.lanzados++;
		this.remover = true;
	}
    
	//Llama a la función actualizar de la clase Entidad
    Entidad.prototype.actualizar.call(this);
};

VacaDisparo.prototype.dibujar = function(ctx) {
	this.animation.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
    
    //Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};
