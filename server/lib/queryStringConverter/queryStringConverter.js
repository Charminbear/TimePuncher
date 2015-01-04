'use strict';
/**
 * Created by dave on 02.01.15.
 */

	const _ = require('lodash');
// LIMIT

// ORDER

// OFFSET

//GROUP
const queryStringToWhereClauses = {
	limitTo : 'limit',
	offset : 'offset'
};


var QueryStringTranslator = function () {
	this.convert = function (query) {
		if(!query){
			return;
		} else {

		}

	};
	function noQueryOrNoValidParam() {

	}
	function isAcceptedParameter(param) {
		return queryStringToWhereClauses[param];
	}

	function createWhereClauseFrom(queryParams) {

	}

};

module.exports = new QueryStringTranslator();