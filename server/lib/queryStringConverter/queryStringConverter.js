'use strict';
/**
 * Created by dave on 02.01.15.
 */

const _ = require('lodash'),
	util = require('util'),
	queryString = require('querystring'),
	qsErrors = require('./errors');

// LIMIT
// ORDER
// OFFSET
// GROUP
// FIELDS
// FILTER
const numberRegex = /^[0-9]*$/;
var sequelizeAdapter = {
	limitTo : {
		key      : 'limit',
		getValue : function (value) {
			return parseInt(value);
		}
	},
	offset  : {
		key      : 'offset',
		getValue : function (value) {
			return parseInt(value);
		}
	}
};

var QueryStringConverter = function () {
	this.convertQuery = function (query) {
		var parsedQuery = queryString.parse(query);
		var result = {};

		_.each(parsedQuery, function (value, key) {
			let adapterElement = sequelizeAdapter[key];
			if (!adapterElement) {
				throw new qsErrors.InvalidQueryParameter();
			}
			if (!value.match(numberRegex)) {
				throw new qsErrors.InvalidArgument('Invalid value "' + value + '" for key "' + key + '"');
			}
			result[adapterElement.key] = adapterElement.getValue(value);
		});

		return result;
	};
};

module.exports = QueryStringConverter;
