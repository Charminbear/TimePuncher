'use strict';
/**
 * Created by David on 18.11.14.
 */
angular.module('tt:tagSelector', [])
	.directive('tagSelector', function ($log, Tag) {
		$log = $log.getInstance('tagSelector');

		return {
			restrict : 'E',
			scope    : {
				tagsModel : '='
			},
			template : '<ui-select multiple ng-model="tagModelWrapper.tags">\n\t<ui-select-match placeholder="Select a Tag...">\n\t\t{{$item.name}}\n\t</ui-select-match>\n\t<ui-select-choices repeat="tag in tagsDropdown">{{tag.name}}</ui-select-choices>\n</ui-select>',
			link     : function (scope, attributes, element) {
				scope.tagModelWrapper = {
					tags : scope.tagsModel
				};

				scope.tagsDropdown = [{
					id   : 1,
					name : 'Test'
				}, {
					id   : 2,
					name : 'Test2'
				}];
			}
		}
	});