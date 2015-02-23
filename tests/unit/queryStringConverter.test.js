'use strict';
/**
 * Created by dave on 02.01.15.
 */


const expect = require('chai').expect,
	util = require('util');

const qsConverter = require('../../server/lib/queryStringConverter'),
	qsConverterInstance = qsConverter.createInstance();

describe('QueryStringConverter', function () {
	it('should exist', function () {
		expect(qsConverter).to.exist();
	});

	it('should have #convertQuery function', function () {
		expect(qsConverterInstance.convertQuery).to.exist();
		expect(qsConverterInstance.convertQuery).to.be.a('function');
	});

	it('should convert "limitTo=1" => {limit:1}', function () {
		var queryString = 'limitTo=1';
		var expectClause = {limit : 1};

		var returnedClause = qsConverterInstance.convertQuery(queryString);
		expect(returnedClause).to.deep.equal(expectClause);
	});

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

	describe('InvalidQueryParameter-Error', function () {
		var InvalidQueryParameter = qsConverter.InvalidQueryParameter;
		it('should have InvalidQueryParameterError', function () {
			expect(InvalidQueryParameter).to.exist();
		});

		it('should be type error', function () {
			expect(util.isError(new InvalidQueryParameter)).to.be.true();
		});

		it('should have message property', function () {
			expect(new InvalidQueryParameter('')).to.have.property('message');
		});

		it('should set message property correctly', function () {
			var myErrorMessage = 'Test-Error-Message';
			var errorInstance = new InvalidQueryParameter(myErrorMessage);
			expect(errorInstance.message).to.equal(myErrorMessage);
		});
	});

	it('should throw "InvalidQueryParameterError" on invalid query Parameter', function () {
		var invalidQuery = 'invalidKey=invalidValue';
		var expectedError = qsConverter.InvalidQueryParameter;
		var funcWrapper = function () {
			qsConverterInstance.convertQuery(invalidQuery);
		};
		expect(funcWrapper).to.throw(expectedError);
	});

});