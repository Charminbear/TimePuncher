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

	describe('#convertQuery()', function () {
		var convertQuery;


		beforeEach(function () {
			convertQuery = qsConverterInstance.convertQuery;
		});

		it('should exist', function () {
			expect(convertQuery).to.exist();
			expect(convertQuery).to.be.a('function');
		});
//	limit   : /[0-9]*/,
		it('should convert "limitTo=1" => {limit:1}', function () {
			var queryString = 'limitTo=1';
			var expectClause = {limit : 1};

			var returnedClause = convertQuery(queryString);
			expect(returnedClause).to.deep.equal(expectClause);
		});

		it('should throw InvalidArgument Exception if limitTo is not a number', function () {
			var queryString = 'limitTo=abc';
			expect(convertQuery.bind(qsConverterInstance, queryString)).to.throw(qsConverter.InvalidArgument);
		});

		//	offset  : /[0-9]*/, // num
		it('should convert "offset=10" => {offset:10}', function () {
			var queryString = 'offset=10';
			var expectClause = {offset : 10};

			expect(convertQuery(queryString)).to.deep.equal(expectClause);
		});


		it('should throw InvalidArgument Exception if offest is not a number', function () {
			var queryString = 'offset=abc';
			expect(convertQuery.bind(qsConverterInstance, queryString)).to.throw(qsConverter.InvalidArgument);
		});

		it('should convert "offset=10&limitTo=1" => {offset:10, limit:1}', function () {
			var queryString = 'offset=10&limitTo=1';
			var expectClause = {offset : 10, limit : 1};
			expect(convertQuery(queryString)).to.deep.equal(expectClause);
		});

		it('should throw "InvalidQueryParameterError" on invalid query Parameter', function () {
			var invalidQuery = 'invalidKey=invalidValue';
			var expectedError = qsConverter.InvalidQueryParameter;
			expect(convertQuery.bind(qsConverterInstance, invalidQuery)).to.throw(expectedError);
		});

//	order   : 'order', // --> -/+field
//	fields  : 'attributes', // --> Comma separated like fields=name,id,createdAt
//	where   : 'where', // --> Comma separated field:values pairs like field1:value1,field2:value2 (flat) - maybe
// allow keywords? include : 'include' // --> model1(fieldName1,fieldName2),model2
	});

});
