var express = require('express');
var router = express.Router();


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
		res.render('register',{message: req.flash('message')})
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
		res.render('user', { user: req.user, password : req.user.username+req.user.password.substring(5, 15), message: req.flash('message') })
	});

	/* Handle Registration POST */
	router.post('/user', chPassword ,function(req, res){
		res.redirect('/user');
	});

	/* GET Admin Home Page */
	router.get('/admin', isAdminAuthenticated, function(req, res){
		res.render('admin', { user: req.user });
	});

	/* Down Stock */
	router.get('/downstock', function(req, res){
		res.render('downstock', { message: req.flash('message') });
	});

  	/* UP Stock */
    router.get('/upstock', function(req, res){
        res.render('upstock', { message: req.flash('message') });
    });


  	/* Products */
	router.get('/product', function(req, res){
		res.render('product', { message: req.flash('message') });
	});

	router.post('/upload', DefProduct , function(req, res) {
        res.redirect('/product')
	});



	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
