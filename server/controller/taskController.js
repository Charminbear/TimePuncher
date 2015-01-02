'use strict';
/**
 * Created by David on 27.12.14.
 */

const models = require('../db').models,
	_ = require('lodash'),
	Task = models.Task;

var TaskController = {
	find     : function* () {

		this.body = yield Task.findAll(); // 500 Internal Server Error
	},
	findById : function* () {
		var taskId = this.params.taskId;
		var whereClause = {
			where : {
				id : taskId
			}
		};
		var task = yield Task.find(whereClause);
		if(!task){
			this.throw(404);
		}

		this.body = task;
	},
	create   : function* () {

	},
	update   : function* () {

	},
	del      : function* () {

	}
};

module.exports = TaskController;

/**
 * GET /tasks?id=1&
 * POST /tasks
 * PUT /tasks
 * GET /tasks/{id}
 * DELETE /tasks/{id}
 * GET /tasks/recent/
 *
 */
