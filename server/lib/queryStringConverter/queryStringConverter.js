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
	limit   : /[0-9]*/,
	offset  : /[0-9]*/, // num
	order   : 'order', // --> -/+field
	fields  : 'attributes', // --> Comma separated like fields=name,id,createdAt
	where   : 'where', // --> Comma separated field:values pairs like field1:value1,field2:value2 (flat) - maybe allow keywords?
	include : 'include' // --> model1(fieldName1,fieldName2),model2
};


var QueryStringConverter = function () {

	this.convertAll = function (query) {
		if (!query) {
			return;
		} else {
			// Iterate all possible solutions
			// Validate <--> Throw 400
			// Convert
		}

	};
};

module.exports = new QueryStringConverter();