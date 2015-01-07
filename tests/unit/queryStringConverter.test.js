'use strict';
/**
 * Created by dave on 02.01.15.
 */


const expect  = require('chai').expect;

const queryStringConverter = require('../../server/lib/queryStringConverter');

describe('QueryStringConverter', function () {
	it('should exist', function () {
		expect(queryStringConverter).to.exist();
	});

	it('should have #convertAll function', function () {
		expect(queryStringConverter.convertAll).to.exist();
		expect(queryStringConverter.convertAll).to.be.a('function');
	});

	it('should convertAll limitTo-Query', function () {
		var queryString = {limit: 1};
		var expectClause = {limit: 1};

		var returnedClause = queryStringConverter.convertAll(queryString);

		expect(returnedClause).to.deep.equal(expectClause);
	});

	xit('should convertAll offest-Query', function () {
		var queryString = {offset: 1};
		var expectClause = {offset: 1};

		var returnedClause = queryStringConverter.convertAll(queryString);

		expect(returnedClause).to.deep.equal(expectClause);
	});

	it('should return undefined if no query parameter given', function () {
		var returnValue = queryStringConverter.convertAll();
		expect(returnValue).to.not.exist();
	});

	it('should throw Error on Invalid Filter', function () {

	});
});