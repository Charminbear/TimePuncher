'use strict';
/**
 * Created by David on 27.12.14.
 */

var APP_ROUTER = require('koa')();
APP_ROUTER.use(require('koa-trie-router')(APP_ROUTER));

const taskController = require('./controller/taskController');

// ROUTES
APP_ROUTER.get('/', function *() {
	this.body = 'Hello World!';
});

APP_ROUTER.route('/tasks')
	.get(taskController.find)
	.post()
	.put();
APP_ROUTER.route('/tasks/:taskId')
	.get(taskController.findById);


module.exports = APP_ROUTER;



