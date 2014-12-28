'use strict';
/**
 * Simple wrapper for the awesome moment library to use in angular.
 * Created by dave on 02.11.14.
 */
angular.module('tt:3rdParty')
.factory('moment', function ($log) {
		if(!window.moment){
			$log.error('Moment is not defined!');
			return;
		}
		return window.moment;
	});