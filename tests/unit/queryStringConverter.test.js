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

	it('should have #convertQuery function', function () {
		expect(queryStringConverter.convertQuery).to.exist();
		expect(queryStringConverter.convertQuery).to.be.a('function');
	});

	it('should convert "limitTo=1" => limit:1', function () {
		var queryString = 'limitTo=1';
		var expectClause = {limit: 1};

		var returnedClause = queryStringConverter.convertQuery(queryString);
		expect(returnedClause).to.deep.equal(expectClause);
	});

	it('should convert "offset=10" => {offset:10}', function () {
		var queryString = 'offset=10';
		var expectClause = {offset: 10};

		expect(queryStringConverter.convertQuery(queryString)).to.deep.equal(expectClause);
	});

});