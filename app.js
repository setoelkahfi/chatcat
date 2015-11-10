var express = require('express'),
	app = express(),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	config = require('./config/config.js'),
	ConnectMongo = require('connect-mongo')(session);
	mongoose = require('mongoose').connect(config.dbURL),
	passport = requuire('passport'),
	FacebookStrategy = require('passport-facebook').Strategy
	
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
	// development specific settings
	app.use(session({secret:config.sessionSecret, saveUninitialized:true, resave:true}));
} else {
	// production specific settings
	app.use(session({
		secret:config.sessionSecret, 
		saveUninitialized:true, 
		resave:true,
		store: new ConnectMongo({
			url:config.dbURL,
			mongoose_connection:mongoose.connection[0],
			stringify:true
		})
	}));
}

require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);
	
require('./routes/routes.js')(express, app);

app.listen(3000, function() {
	console.log('Chatcat running on port 3000');
	console.log('Mode: ' + env);
});