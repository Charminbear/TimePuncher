'use strict';
/**
 * Created by David on 01.03.15.
 */


const expect = require('chai').expect,
	util = require('util');

const qsErrors = require('../../../server/lib/queryStringConverter/errors');

describe('InvalidQueryParameter-Error', function () {
	var InvalidQueryParameter = qsErrors.InvalidQueryParameter;
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

	it('should have name property', function () {
		expect(new InvalidQueryParameter()).to.have.property('name');
		expect(new InvalidQueryParameter().name).to.equal('InvalidQueryParameter');
	});

	it('should have statusCode property', function () {
		expect(new InvalidQueryParameter()).to.have.property('statusCode');
	});

	it('should have 400 as statusCode property', function () {
		expect(new InvalidQueryParameter().statusCode).to.equal(400);
	});
});
