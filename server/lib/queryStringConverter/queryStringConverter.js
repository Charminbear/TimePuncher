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

var sequelizeAdapter = {
	limitTo : {
		key   : 'limit',
		getValue : function (value) {
			return parseInt(value);
		}
	},
	offset  : {
		key   : 'offset',
		getValue : function (value) {
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
				let adapterElement = sequelizeAdapter[key];
				result[adapterElement.key] = adapterElement.getValue(value);
			});
		} catch (error) {
			if (error instanceof TypeError) {
				throw new qsErrors.InvalidQueryParameter();
			}
		}

		return result;
	};
};

module.exports = QueryStringConverter;
