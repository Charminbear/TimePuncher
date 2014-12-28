'use strict';
/**
 * Created by David on 27.12.14.
 */


const Router = require('koa-router');

const APP_ROUTER = new Router(),
	taskController = require('./controller/taskController');

APP_ROUTER.route('/tasks')
	.get()
	.post()
	.put()
	.del();


module.exports = APP_ROUTER;



