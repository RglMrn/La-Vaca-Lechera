function Cronometro(juego, x, y) { //Cronometro del juego
    //Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, x, y); 
    
    this.texto = "";
}

Cronometro.prototype = new Entidad();
Cronometro.prototype.constructor = Cronometro;

Cronometro.prototype.actualizar = function() {
    this.texto = "Reloj: " + this.juego.getTiempoJuego() / 1000;
    
    //Llama a la función actualizar de la clase Entidad
    Entidad.prototype.actualizar.call(this);
};

Cronometro.prototype.dibujar = function(ctx) {
    ctx.font = "7mm Arial";
    ctx.fillStyle = "teal";  
    ctx.fillText(this.texto, this.x, this.y);
    
    //Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};
