var fs = require('fs');

var ReadHtml = require('../products/ReadHtml');
var ReadFile = ReadHtml.ReadFile;

var upProd = require('../products/UpProduct');
var UpProduct = upProd.UpProduct;


DefProduct = function (req, res, next) {
    var file = req.files.archivo;
    console.log(file);
    var table = ReadFile(file.path);
    debugger;
    console.log(table);
    /*
    fs.readFile(file.path, function (err, data) {
        var newPath = __dirname + "/uploads/" + file.name;
        debugger;
        fs.writeFile(newPath, data, function (err) {
            debugger;
            var table = ReadFile(newPath);
            console.log(table);
            res.redirect("back");
            next();

           for (i=1; i<= table ; i++){
             var product =  table[i];
             UpProduct(product);
             }
        });
    });*/
}

module.exports = DefProduct;