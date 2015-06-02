var fs = require('fs');
var ReadHtml = require('../products/ReadHtml');
var upProd = require('../products/UpProduct');


DefProduct = function (req, res, next) {
    console.log(req.files.archivo.path)
    var table = ReadFile(req.files.archivo.path);
    if (table == 'err'){
        req.flash('message', 'incorrect file');
        return (next());
    }
    for (var i=1; i< table.length ; i++){
        var message = UpProduct(table[i]);
    }
    req.flash('message', message);
    return (next());
}

module.exports = DefProduct;