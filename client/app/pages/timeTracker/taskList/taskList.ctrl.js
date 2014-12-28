'use strict';
/**
 * Created by dave on 06.11.14.
 */

angular.module('tt:timeTracker')
	.controller('TaskListCtrl',
	/**
	 * @constructor
	 * @name TaskListCtrl
	 */
	function ($scope, $log, Task) {
		$log = $log.getInstance('TaskListCtrl');
		this.gridOptions = {
			data           : 'taskList',
			columnDefs     : [
				{field : 'name', displayName : 'Name'},
				{
					field        : 'tags',
					displayName  : 'Tags',
					cellTemplate : '<span ng-repeat="tag in row.entity.tags">{{tag.name}}</span>'
				}
			],
			enableCellEdit : true
		};
		$scope.taskList = Task.$collection({creationMonth : 'November'}).$refresh().$then(function () {
			//$log.debug('Through here!');
		});
	});