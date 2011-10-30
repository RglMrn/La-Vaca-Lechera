function Pollo(juego, x, y) { //Entidad Pollo de Zealotscout
   //Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, x, y, 0); 
    
	this.animacion = new Animation(asset_manager.getAsset('pollo'), 21, 100, true);
    
}

Pollo.prototype = new Entidad();
Pollo.prototype.constructor = Pollo;

Pollo.prototype.actualizar = function() {
    //Llama a la función actualizar de la clase Entidad
    Entidad.prototype.actualizar.call(this);
};

Pollo.prototype.dibujar = function(ctx) {
    this.animacion.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
    
    //Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};
