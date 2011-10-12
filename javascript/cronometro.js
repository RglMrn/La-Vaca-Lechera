function Cronometro(juego, x, y) { //Cronometro del juego
    Entidad.call(this, juego, x, y); //Obteniendo los atributos de Entidad
    this.texto = "";
}

Cronometro.prototype = new Entidad();
Cronometro.prototype.constructor = Cronometro;

Cronometro.prototype.actualizar = function() {
    this.texto = "Reloj: " + this.juego.getTiempoJuego() / 1000;
};

Cronometro.prototype.dibujar = function(ctx) {
    ctx.font = "7mm Arial";
    ctx.fillStyle = "teal";  
    ctx.fillText(this.texto, this.x, this.y);
};
