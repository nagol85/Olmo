var express = require('express');
var router = express.Router();


var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

var isAdminAuthenticated = function (req, res, next) {
    User.findOne({ 'username' :  'admin'}, function (err, user) {
            if (!user){
                return next();
            }
            else{
                if (req.isAuthenticated()){
                    if (req.user.username == 'admin'){
                        return next();
                    }
                    res.redirect('/');
                }
                res.redirect('/');
            }
        }
    );
}


module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message'), admin : req.user});
	});

	/* GET Login */
	router.get('/login', function(req, res){
		res.render('login',{message: req.flash('message')});
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/user',
		failureRedirect: '/login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', isAdminAuthenticated, function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/user',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/user', isAuthenticated, function(req, res){
		if (req.user.username == 'admin') 
			res.redirect('/admin');
		res.render('user', { user: req.user, password : req.user.username+req.user.password.substring(5, 15), message: req.flash('message') });
	});

	/* Handle Registration POST */
	router.post('/user', chPassword ,function(req, res){
		res.redirect('/user');
	});

	/* GET Admin Home Page */
	router.get('/admin', isAdminAuthenticated, function(req, res){
		res.render('admin', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





