'use strict';
/**
 * Created by David on 26.12.14.
 */

const koa = require('koa'),
	mount = require('koa-mount'),
	Router = require('koa-router'),
	betterBody = require('koa-better-body'),
	co = require('co');

const PORT = process.env.PORT || 3000,
	ENV = process.env.NODE_ENV || 'development';

var app = module.exports = koa();

var db = require('./db');

function connectToDatabase () {
	co(function *() {
		try {
			console.log('Trying DB Connection...');
			yield db.sync();
			console.log('Connected to DB!');
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
	}).catch(function (err) {
		console.log('caught error: ', err);
	});
}
connectToDatabase();

app.use(betterBody());


// CONFIGURATION
app.use(function *(next) {
	var start = new Date;
	yield next;
	var ms = new Date - start;
	console.log('%s %s - %s ms', this.method, this.url, ms);
});


// ROUTES
var router = new Router();
router.get('/', function *() {
	this.body = 'Hello World!';
});

app.use(mount(router.middleware()));

// ERROR HANDLING
app.use(function *() {
	console.log('Ohoh... I 404ed...');
	this.throw(404);
});


// START APP
if (!module.parent) {
	app.listen(PORT);
	console.log('App Listening on Port ' + PORT + ' in ' + ENV + ' mode!');
}