'use strict';
/**
 * Created by dave on 02.11.14.
 */

angular.module('tt:core')
	.factory('Task', function ($log, restmod) {
		$log = $log.getInstance('Task');
		/**
		 * @class Task
		 */
		var Task = restmod.model('/task').mix({
			name      : {},
			tags      : {belongsToMany : 'Tag'},
			startedAt : {},
			stoppedAt : {}
			//user : {belongsTo : 'User'}
		});
		// #CRUD

		return Task;
	});
