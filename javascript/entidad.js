function Entidad(juego, x, y, z) { //Define los atributos bases de toda entidad
	this.juego = juego;
	this.x = x;
	this.y = y;
	this.z = z;
	this.remover = false;
	//juego.addEntidad(this);
}

//La logica basica de actualizacion de las entidades
Entidad.prototype.actualizar = function() { 
	
};

//La logica basica de dibujo de las entidades
Entidad.prototype.dibujar = function(ctx) { 

    //Dibujar circulo de guia alrededor de la imagen
    /*ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();*/
};

Entidad.prototype.reposicionar = function(anchoReferencia, altoReferencia) {
    this.x = generarAncho(this.x, anchoReferencia);
    this.y = generarAlto(this.y, altoReferencia);
    
}


