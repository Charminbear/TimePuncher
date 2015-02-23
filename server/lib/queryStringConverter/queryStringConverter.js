'use strict';
/**
 * Created by dave on 02.01.15.
 */

const _ = require('lodash'),
	queryString = require('querystring');
// LIMIT
// ORDER
// OFFSET
// GROUP
// FIELDS
// FILTER
//	limit   : /[0-9]*/,
//	offset  : /[0-9]*/, // num
//	order   : 'order', // --> -/+field
//	fields  : 'attributes', // --> Comma separated like fields=name,id,createdAt
//	where   : 'where', // --> Comma separated field:values pairs like field1:value1,field2:value2 (flat) - maybe
// allow keywords? include : 'include' // --> model1(fieldName1,fieldName2),model2
var queryMap = {
	limitTo : {
		key: 'limit',
		value : function (value) {
			return parseInt(value);
		}
	},
	offset: {
		key : 'offset',
		value : function (value) {
			return parseInt(value);
		}
	}
};

var QueryStringConverter = function () {
	this.convertQuery = function (query) {
		var parsedQuery = queryString.parse(query);
		var result = {};
		var queryType = queryMap[Object.keys(parsedQuery)[0]];


		if(parsedQuery.limitTo){
			result.limit = parseInt(parsedQuery.limitTo);
		} else if(parsedQuery.offset){
			result.offset = parseInt(parsedQuery.offset);
		}

		return result;
	};
};

module.exports = new QueryStringConverter();
