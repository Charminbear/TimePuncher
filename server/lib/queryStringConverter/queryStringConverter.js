'use strict';
/**
 * Created by dave on 02.01.15.
 */
// LIMIT

// ORDER

// OFFSET

//GROUP

var QueryStringTranslator = function () {
	this.convert = function (query) {
		if(!query || query === ''){
			return;
		}
		return {
			limit: query.limitTo
		};
	};
};

module.exports = new QueryStringTranslator();