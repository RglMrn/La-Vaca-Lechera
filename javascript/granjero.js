function Granjero(juego, x, y) { //Entidad Granjero
	Entidad.call(this, juego, x, y); //Obteniendo los atributos de Entidad
    this.animParado =  new Animation(ASSET_MANAGER.getAsset('cubetaarriba'), 1, 100, true);
    this.animMovimiento = new Animation(ASSET_MANAGER.getAsset('granjeroquieto'), 1, 100, true);
    this.animAtrapando = new Animation (ASSET_MANAGER.getAsset('granjeroatrapando'), 2, 350, true);
    
	this.animacion = this.animParado;
	
    this.ancho = this.animParado.frameWidth;
	this.largo = this.animParado.frameHeight;
	this.dx = 0;
	this.dy = 0;
    
    
    this.angulo = 0; 
    this.velocidad = 0.1;
    this.velocidadX = 0;
    this.velocidadY = 0;
    this.xNegativa = false;
    this.yNegativa = false;
    this.movimientoX = false;
    this.movimientoY = false;
    this.destino = {'x':this.x, 'y':this.y};
    this.elapsedTime = 0;
    
    this.limites = { "izq":this.ancho/2, "der":600-this.ancho/2, "arriba":215 - this.largo/2, 
        "abajo":450-this.largo/2};
  //Radio de captura de la cubeta
    this.offsetCubetaX = 30;
    this.offsetCubetaY = -25;
    this.radioCubeta = this.largo/4;
}

Granjero.prototype = new Entidad();
Granjero.prototype.constructor = Granjero;

Granjero.prototype.onKeyDown = function(evt) {//Evento que sera llamado cuando se presione una tecla
    /*switch (evt.keyCode) {
        case 38 :   //Se presionó up arrow
        case 87 :   //Se presionó w            
            this.dx = 0;
            this.dy = -20;
        break;
        case 40:    //Se presionó down arrow
        case 83:    //Se presionó s
            this.dx = 0;
            this.dy = 20;
        break;
        case 37:    //Se presionó left arrow
        case 65:    //Se presionó a
            this.dx = -20;
            this.dy = 0;
        break;
        case 39:    //Se presionó right arrow
        case 68:    //Se presionó d
            this.dx = 20;
            this.dy = 0;    
        break;
    }*/
};

Granjero.prototype.onClick = function(evt) {
    this.destino.x = evt.layerX;
    this.destino.y = evt.layerY - this.largo/2;
    
    this.movimientoX = true;
    this.movimientoY = true;
    
    this.animacion = this.animMovimiento;
    
    if (this.destino.x < this.x) {
        this.xNegativa = true;
    }
    else {
        this.xNegativa = false;
    }
    
    if (this.destino.y < this.y) {
        this.yNegativa = true;
    }
    else {
        this.yNegativa = false;
    }
    
}

Granjero.prototype.actualizar = function() {
    var deltaY = this.destino.y - this.y;
    var deltaX = this.destino.x - this.x;
    
    this.angulo = Math.abs(Math.atan(deltaY / deltaX));
    this.velocidadX = this.velocidad * Math.cos(this.angulo);
    this.velocidadY = this.velocidad * Math.sin(this.angulo);
    
    if (this.xNegativa) {
        this.velocidadX = -this.velocidadX;
    }
    
    if (this.yNegativa) {
        this.velocidadY = -this.velocidadY;
    }
    
	if (this.destino.x -1 <= this.x && this.x <= this.destino.x + 1) {
        this.velocidadX = 0;
        this.x = this.destino.x;
        this.movimientoX = false;
    }
    
    if (this.destino.y -1 <= this.y && this.y <= this.destino.y + 1) {
        this.y = this.destino.y;
        this.velocidadY = 0;
        this.movimientoY = false;
    }
    
    
    this.x = this.x + this.velocidadX * this.juego.clockTick;
    this.y = this.y + this.velocidadY * this.juego.clockTick;
    
    if (!this.movimientoX && !this.movimientoY) {
        this.animacion = this.animParado;
    }
    
    //Revisa que no se pase de los límites
    if(this.x < this.limites.izq) {
        this.x = this.limites.izq;
    }
    else if(this.x > this.limites.der) {
        this.x = this.limites.der;
    }
    
    if(this.y < this.limites.arriba) {
        this.y = this.limites.arriba;
    }
    else if(this.y > this.limites.abajo) {
        this.y = this.limites.abajo;
    }
    
	Entidad.prototype.actualizar.call(this);
};

Granjero.prototype.dibujar = function(ctx) {//Logica de dibujar del Granjero
    //var x = this.x - this.imagen.width/2;
    //var y = this.y - this.imagen.height/2;
    this.animacion.drawFrame(this.juego.clockTick, ctx,  this.x, this.y);

    //Dibujar circulo de guia
    /*ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.arc(this.x+this.offsetCubetaX, this.y+this.offsetCubetaY, 
        this.radioCubeta, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();*/
};


Granjero.prototype.atrapoChorro = function(chorro) {
    //Posición de la cubeta
    var cubetaX = this.x + this.offsetCubetaX;
    var cubetaY = this.y + this.offsetCubetaY;
    
    if( Math.abs(cubetaX - chorro.x) < this.radioCubeta &&
        Math.abs(cubetaY - chorro.y) < this.radioCubeta) {
        this.animacion = this.animAtrapando;
        return true;  
    }
    else {
        this.animacion = this.animMovimiento;
        return false;
    }
}

