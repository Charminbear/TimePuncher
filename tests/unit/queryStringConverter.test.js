'use strict';
/**
 * Created by dave on 02.01.15.
 */


const expect  = require('chai').expect;

const queryStringConverter = require('../../server/lib/queryStringConverter');

describe('QueryStringTranslator', function () {
	it('should exist', function () {
		expect(queryStringConverter).to.exist();
	});

	it('should have #convert function', function () {
		expect(queryStringConverter.convert).to.exist();
		expect(queryStringConverter.convert).to.be.a('function');
	});

	it('should convert limitTo-Query', function () {
		var queryString = {limitTo: 1};
		var expectClause = {limit: 1};

		var returnedClause = queryStringConverter.convert(queryString);

		expect(returnedClause).to.deep.equal(expectClause);
	});

	it('should convert offest-Query', function () {
		var queryString = {offset: 1};
		var expectClause = {offset: 1};

		var returnedClause = queryStringConverter.convert(queryString);

		expect(returnedClause).to.deep.equal(expectClause);
	});

	it('should return undefined if no query parameter given', function () {
		var returnValue = queryStringConverter.convert();
		expect(returnValue).to.not.exist();
	});

	it('should throw Error on Invalid Filter', function () {

	});
});