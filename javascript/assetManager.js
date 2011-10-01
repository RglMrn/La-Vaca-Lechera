//Se encarga de cargar todas las imagenes e indicarnos si se cargaron todas exitosamente
//o si hubo algun error.
function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = {};
    this.downloadQueue = [];
}


AssetManager.prototype.queueDownload = function(path,id) { // crea un objeto con un id y el path de la imagen y lo adiciona al arreglo
    var objeto=new Object();
    objeto.id=id;
    objeto.path=path;
    this.downloadQueue.push(objeto); 
};

AssetManager.prototype.downloadAll = function(callback) {
    if (this.downloadQueue.length === 0) {
        callback();
    }
    
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var asset = this.downloadQueue[i];
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
        img.src = asset.path;
        this.cache[asset.id] = img; //Guarda la imagen en cache con el id como indice
    }
};

AssetManager.prototype.getAsset = function(id) {
    return this.cache[id];
};

AssetManager.prototype.isDone = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
};
