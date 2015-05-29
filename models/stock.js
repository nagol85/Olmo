
var mongoose = require('mongoose');

module.exports = mongoose.model('Stock',{
	sapId: String,
	lot: String,
	date: String,
	name: String,
	number: String,
	code: String
});
