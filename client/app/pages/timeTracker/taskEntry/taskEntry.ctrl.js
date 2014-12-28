'use strict';
/**
 * Created by dave on 02.11.14.
 */
angular.module('tt:timeTracker')
	.controller('TaskEntryCtrl', function ($scope, $log, moment, Task) {
		$log = $log.getInstance('TaskEntryCtrl');

		var currentTask;

		this.taskModel = {
			name : '',
			tags : []
		};

		this.timerRunning = false;

		this.startTimer = function () {
			currentTask = Task.$build({
				name      : this.taskModel.name,
				tags      : this.taskModel.tags,
				startedAt : moment().unix()
			});
			// Create new Tasks
			$scope.$broadcast('timer-start');
			this.timerRunning = true;
		}.bind(this);

		this.stopTimer = function () {
			$scope.$broadcast('timer-stop');
			this.timerRunning = false;

			// Create new
			currentTask.stoppedAt = moment().unix();
			currentTask.$save();
		}.bind(this);
	});

