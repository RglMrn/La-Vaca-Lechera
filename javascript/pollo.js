function Pollo(juego, x, y) { //Entidad Pollo de Zealotscout
	this.animacion = new Animation(ASSET_MANAGER.getAsset('pollo'), 21, 100, true);
    Entidad.call(this, juego, x, y); //Obteniendo los atributos de Entidad
}

Pollo.prototype = new Entidad();
Pollo.prototype.constructor = Pollo;

Pollo.prototype.actualizar = function() {
    
};

Pollo.prototype.dibujar = function(ctx) {
    this.animacion.drawFrame(this.juego.clockTick, ctx, this.x, this.y);
};
