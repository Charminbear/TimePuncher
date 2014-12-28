'use strict';
/**
 * Created by dave on 08.11.14.
 */

angular.module('tt:model', []);
angular.module('tt:core', ['restmod', 'tt:model'])
	.config(function (restmodProvider) {
		restmodProvider.rebase('DefaultPacker');
	});