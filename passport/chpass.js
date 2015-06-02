var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
}


chPassword = function (req, res, next){
    if (req.body.password != req.body.repassword){
        req.flash('message', 'Invalid Password');
        return next();
    }
    if (isValidPassword(req.user, req.body.password)){
        req.flash('message', 'new Password is Identic');
        return next();
    }
    User.findOneAndUpdate({ username: req.user.username  }, { 'password' :  createHash(req.body.password) }, function (err, user){
        if (err)
            console.log(err);
            req.flash('message', 'Error Mongo Update');
            return next();
        }
    );
    req.flash('message', 'password changed');
    return next();
}




module.exports = chPassword;
