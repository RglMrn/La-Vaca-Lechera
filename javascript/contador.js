function Contador(juego, x, y) { //Entidad que muestra las falladas y atrapadas
    //Obteniendo los atributos de la clase Entidad
    Entidad.call(this, juego, x, y); 
    
    this.texto = "";
}

Contador.prototype = new Entidad();
Contador.prototype.constructor = Contador;

Contador.prototype.actualizar = function() {
    this.texto = "Atrapados: " + this.juego.atrapados + 
        "  Fallados: " + this.juego.fallados;
        
    //Llama a la función actualizar de la clase Entidad
    Entidad.prototype.actualizar.call(this);
};

Contador.prototype.dibujar = function(ctx) {
    ctx.font = "7mm Arial";
    ctx.fillStyle = "blue"; 
    ctx.fillText(this.texto, this.x, this.y);
    
    //Llama a la función dibujar de la clase Entidad
	Entidad.prototype.dibujar.call(this, ctx);
};
