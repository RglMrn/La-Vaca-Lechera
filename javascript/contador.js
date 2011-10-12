function Contador(juego, x, y) { //Entidad que muestra las falladas y atrapadas
    Entidad.call(this, juego, x, y); //Obteniendo los atributos de Entidad
    this.texto = "";
}

Contador.prototype = new Entidad();
Contador.prototype.constructor = Contador;

Contador.prototype.actualizar = function() {
    this.texto = "Atrapados: " + this.juego.atrapados + 
        "  Fallados: " + this.juego.fallados;
};

Contador.prototype.dibujar = function(ctx) {
    ctx.font = "7mm Arial";
    ctx.fillStyle = "blue"; 
    ctx.fillText(this.texto, this.x, this.y);
};
