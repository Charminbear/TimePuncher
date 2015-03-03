'use strict';
/**
 * Created by David on 26.12.14.
 */

const PORT = process.env.PORT,
	ENV = process.env.NODE_ENV,
	CONFIG = require('./config/config');

const koa = require('koa'),
	mount = require('koa-mount'),
	co = require('co');

var app = koa();
var db = require('./db'),
	middleware = require('./config/middleware'),
	router = require('./routes');

// SETUP AND START APP
connectToDatabase();
app.use(mount(middleware()));
app.use(mount(router));
startApp();

module.exports = app;

// CONVENIENCE FUNCTIONS
function connectToDatabase() {
	co(function *() {
		try {
			console.log('Trying DB Connection...');
			yield db.sync();
			console.log('Connected to DB!');
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
		// We also need to catch again here, else we won't get syntax errors
	}).catch(function (err) {
		console.log('caught error: ', err);
	});
}

function startApp() {
	if (!module.parent) {
		app.listen(PORT);
		console.log('App Listening on Port ' + PORT + ' in ' + ENV + ' mode!');
	}

}
