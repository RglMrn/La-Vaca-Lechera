//Se encarga de cargar todas las imagenes e indicarnos si se cargaron todas exitosamente
//o si hubo algun error.
// Ahora las imagenes pueden ser reconocidas mediante un id
function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
}

	
AssetManager.prototype.queueDownload = function(path,id) {
    var objeto=new Object();
    objeto.id=id;
    objeto.path=path;
    this.downloadQueue.push(objeto); // crea un objeto con un id y el path de la imagen
};

AssetManager.prototype.downloadAll = function(callback) {
    if (this.downloadQueue.length === 0) {
        callback();
    }
    
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var Asset = this.downloadQueue[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            console.log(this.src + ' is loaded');
            that.successCount += 1;
            if (that.isDone()) {
                callback();
            }
        }, false);
        img.addEventListener("error", function() {
            that.errorCount += 1;
            if (that.isDone()) {
                callback();
            };
        }, false);
        img.src = Asset.path;
        this.cache[Asset.id] = img; //Guarda la imagen en cache con el id como indice
    }
};

AssetManager.prototype.getAsset = function(id) {
    return this.cache[id];
};

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
};
