'use strict';
/**
 * Created by dave on 26.10.14.
 */

angular.module('tt:timeTracker', []);

// todo merge those and put as dependencies
var bowerDeps  = ['ngResource', 'ui.router', 'log.ex.uo']
	, coreDeps = ['tt:core', 'tt:components']
	, pageDeps = ['tt:timeTracker'];

angular.module('TimeTracker', ['ngResource', 'ui.router','log.ex.uo', 'tt:components', 'tt:core', 'tt:pages'])
	.config(function ($stateProvider, $urlRouterProvider, logExProvider) {

		// For any unmatched url, send to /route1
		$urlRouterProvider.otherwise("/timetracker");

		$stateProvider
			.state('timeTracker', {
				url          : '/timetracker',
				templateUrl  : 'app/pages/timeTracker/timeTracker.tpl.html',
				controller   : 'TimeTrackerCtrl',
				controllerAs : 'timeTrackerCtrl'
			});

		logExProvider.enableLogging(true);


	});