'use strict';
/**
 * Created by dave on 08.11.14.
 */

angular.module('tt:3rdParty', []);
angular.module('tt:tagSelector', ['ui.select'])
	.config(function (uiSelectConfig) {
		uiSelectConfig.theme = 'bootstrap';
	});

angular.module('tt:components', ['tt:3rdParty']);