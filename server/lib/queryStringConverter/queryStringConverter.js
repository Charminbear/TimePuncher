'use strict';
/**
 * Created by dave on 02.01.15.
 */

const _ = require('lodash'),
	util = require('util'),
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
		key   : 'limit',
		value : function (value) {
			return parseInt(value);
		}
	},
	offset  : {
		key   : 'offset',
		value : function (value) {
			return parseInt(value);
		}
	}
};

var QueryStringConverter = function () {
	this.convertQuery = function (query) {
		var parsedQuery = queryString.parse(query);
		var result = {};
		try {
			_.each(parsedQuery, function (value, key) {
				var queryMapObject = queryMap[key];
				result[queryMapObject.key] = queryMapObject.value(value);
			});
		} catch (error) {
			if (error instanceof TypeError) {
				throw new InvalidQueryParameter();
			}
		}

		return result;
	};
};

var InvalidQueryParameter = function (message) {
	Error.call(this);
	this.message = message;
};

util.inherits(InvalidQueryParameter, Error);

var API = {
	createInstance        : function () {
		return new QueryStringConverter();
	},
	InvalidQueryParameter : InvalidQueryParameter
};
module.exports = API;
