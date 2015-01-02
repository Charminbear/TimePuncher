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

	it('should convert simple query', function () {
	});

	it('should convert complex query', function () {

	});

	it('should return undefined if no query parameter given', function () {
		var returnValue = queryStringConverter.convert();
		expect(returnValue).to.not.exist();
	});

	it('should return undefined if filter param not present', function () {
		var queryWithoutFilter = {
			paramKey: 'paramValue',
			paramKey2: 'paramValue2'
		};
		var returnValue = queryStringConverter.convert(queryWithoutFilter);
		expect(returnValue).to.not.exist();
	});

	it('should throw Error on Invalid Filter', function () {

	});
});