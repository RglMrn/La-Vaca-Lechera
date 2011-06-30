function Entidad(imagen, juego, x, y ) { //Define los atributos bases de toda entidad
	this.imagen = imagen;
	this.juego = juego;
	this.x = x;
	this.y = y;
	this.remover = false;
}

Entidad.prototype.actualizar = function() { //La logica basica de actualizacion de las entidades
	
};

Entidad.prototype.dibujar = function(ctx) { //La logica basica de dibujo de las entidades
	if (this.imagen && this.x && this.y) {
        var x = this.x - this.imagen.width/2;
        var y = this.y - this.imagen.height/2;
        ctx.drawImage(this.imagen, x, y);
	}
};
