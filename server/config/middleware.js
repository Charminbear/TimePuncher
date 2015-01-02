'use strict';
/**
 * Created by dave on 02.01.15.
 */
const CONFIG = require('./config'),
	app = require('koa')(),
	betterBody = require('koa-better-body');
module.exports = function () {
	app.use(betterBody());
	app.use(function *(next) {
		var start = new Date;
		yield next;
		var ms = new Date - start;
		console.log('%s %s - %s ms', this.method, this.url, ms);
	});
	// todo implement session support
	// todo implement securitiy layer
	// todo implement error handling
	// todo implement logger

	// todo implement static middleware
	return app;
};