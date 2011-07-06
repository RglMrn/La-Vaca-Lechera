function Cubeta(juego, x, y) { //Entidad Cubeta
	Entidad.call(this, juego, x, y); //Obteniendo los atributos de Entidad
	this.imagen = ASSET_MANAGER.getAsset('./imagenes/granjero_cubeta_abajo_small.jpeg');
	this.ancho = this.imagen.width;
	this.largo = this.imagen.height;
	this.dx = 0;
	this.dy = 0;
}

Cubeta.prototype = new Entidad();
Cubeta.prototype.constructor = Cubeta;

Cubeta.prototype.moverCubeta = function(evt) {//Evento que sera llamado cuando se presione una tecla
    switch (evt.keyCode) {
        case 38 :  /* Up arrow was pressed o se presiono w */
        case 87 :            
            this.dx = 0;
            this.dy = -20;
        break;
        case 40:  /* Down arrow was pressed */
        case 83:    
            this.dx = 0;
            this.dy = 20;
        break;
        case 37:  /* Left arrow was pressed */
        case 65:    
            this.dx = -20;
            this.dy = 0;
        break;
        case 39:  /* Right arrow was pressed */
        case 68:    
            this.dx = 20;
            this.dy = 0;
        break;
    }
};

Cubeta.prototype.actualizar = function() {//Logica de actualizar la posicion de la cubeta
	//Logica propia
	if (((this.x + this.dx) > 0 + this.ancho/2  && (this.x + this.dx) < this.juego.ancho - this.ancho/2) && 
            ((this.y + this.dy) > 0 + this.largo/2 && (this.y + this.dy) < this.juego.alto - this.largo/2)) {
        this.x += this.dx;
        this.y += this.dy;  
        this.dx = 0;
        this.dy = 0;
    }
    
    
	Entidad.prototype.actualizar.call(this);
};

Cubeta.prototype.dibujar = function(ctx) {//Logica de dibujar de la cubeta
	//Logica propia
	Entidad.prototype.dibujar.call(this, ctx);
};
