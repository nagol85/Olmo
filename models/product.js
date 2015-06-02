
var mongoose = require('mongoose');

module.exports = mongoose.model('Product',{
	sapId: String,
	name: String,
	grupArt: String,
	grupArticulos: String,
	box: String,
	stability: String,
	note:String
});
