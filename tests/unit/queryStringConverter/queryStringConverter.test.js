'use strict';
/**
 * Created by dave on 02.01.15.
 */


const expect = require('chai').expect,
	util = require('util');

const qsConverter = require('../../../server/lib/queryStringConverter/index'),
	qsConverterInstance = qsConverter.createInstance();

describe('QueryStringConverter', function () {
	it('should exist', function () {
		expect(qsConverter).to.exist();
	});

	it('should have #convertQuery function', function () {
		expect(qsConverterInstance.convertQuery).to.exist();
		expect(qsConverterInstance.convertQuery).to.be.a('function');
	});
//	limit   : /[0-9]*/,
	it('should convert "limitTo=1" => {limit:1}', function () {
		var queryString = 'limitTo=1';
		var expectClause = {limit : 1};

		var returnedClause = qsConverterInstance.convertQuery(queryString);
		expect(returnedClause).to.deep.equal(expectClause);
	});
//	offset  : /[0-9]*/, // num
	it('should convert "offset=10" => {offset:10}', function () {
		var queryString = 'offset=10';
		var expectClause = {offset : 10};

		expect(qsConverterInstance.convertQuery(queryString)).to.deep.equal(expectClause);
	});


	it('should convert "offset=10&limitTo=1" => {offset:10, limit:1}', function () {
		var queryString = 'offset=10&limitTo=1';
		var expectClause = {offset : 10, limit : 1};

		expect(qsConverterInstance.convertQuery(queryString)).to.deep.equal(expectClause);
	});

	it('should throw "InvalidQueryParameterError" on invalid query Parameter', function () {
		var invalidQuery = 'invalidKey=invalidValue';
		var expectedError = qsConverter.InvalidQueryParameter;
		var funcWrapper = function () {
			qsConverterInstance.convertQuery(invalidQuery);
		};
		expect(funcWrapper).to.throw(expectedError);
	});

//	order   : 'order', // --> -/+field
//	fields  : 'attributes', // --> Comma separated like fields=name,id,createdAt
//	where   : 'where', // --> Comma separated field:values pairs like field1:value1,field2:value2 (flat) - maybe
// allow keywords? include : 'include' // --> model1(fieldName1,fieldName2),model2

});