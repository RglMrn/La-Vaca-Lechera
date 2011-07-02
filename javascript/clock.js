function Clock() { //Reloj interno del juego
    this.gameTime = 0;
    this.maxStep = 17;
    this.wallLastTimestamp = 0;
}

Clock.prototype.tick = function() {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp);
    this.wallLastTimestamp = wallCurrent;
    
    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
};
