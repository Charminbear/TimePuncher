'use strict';
/**
 * Created by David on 27.12.14.
 */

const models = require('../db').models,
	_ = require('lodash'),
	Task = models.Task;


/**
 * @type {{find: Function}}
 */
var TaskController = {
	find     : function* (next) {
		try {
			var allTasks = yield Task.findAll();
			this.body = allTasks;
		} catch (error) {
			console.error('Error: ', error);
			yield next;
		}
	},
	findById : function* () {
		var userId = this.params.id;
	}
};

module.exports = TaskController;