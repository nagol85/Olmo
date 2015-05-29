var User = require('../models/user');

isAdminAuthenticated = function (req, res, next) {
    User.findOne({ 'username' :  'admin'}, function (err, user) {
        if (!user){
            return next();
        }
        else{
            if (req.user){
                if (req.user.username == 'admin'){
                    return next();
                }
                res.redirect('/');
            }
            res.redirect('/');
        }
    });
}

isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = isAdminAuthenticated;
module.exports = isAuthenticated;
