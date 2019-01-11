//Load env variables
require('dotenv').config();

//Requires
var express = require('express');
var layouts = require('express-ejs-layouts');
var parser = require('body-parser');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require('express-session');

//Declare express app
var app = express();

//declare a reference to the models folder
var db = require('./models');

//Set views to ELS
app.set('view engine', 'ejs');

//Use Middleware
app.use(layouts);
app.use('/', express.static('static'));
app.use(parser.urlencoded({ extended:false }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Custom middleware - write data to locals
app.use(function(req, res, next){
	res.locals.alerts = req.flash();
	res.locals.user = req.user;
	next();
});

//Declare routes
app.get('/', function(req, res) {
	res.render('home');
})


// app.get('/profile/:id', function(req, res){
// 	// db.findByPk(id)
// 	// .then(function(user){
// 		res.render('profile');
// 	// })
// })

//Include controllers [app.use(what they are relevant to, require(the file path))]
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profiles'));

//Listen on a local port
app.listen(3000);

//To-do
//Persistent log-in in sessions
//Log out functionality
//configure passport
//create logged-in only view priviledges
//Personalize the site - (header don't show log in, etc)
//Edit profile functionality
//
//
