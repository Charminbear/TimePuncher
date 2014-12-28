'use strict';
/**
 * Created by dave on 02.11.14.
 */

angular.module('tt:core')
	.factory('Tag', function ($log, restmod) {
		$log = $log.getInstance('Tag');
		/**
		 * @constructor Tag
		 */
		var Tag = restmod.model('/tag');

		return Tag;
});
