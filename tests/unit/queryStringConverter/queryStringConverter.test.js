'use strict';
/**
 * Created by dave on 02.01.15.
 */


const expect = require('chai').expect,
	queryString = require('querystring');

const qsConverter = require('../../../server/lib/queryStringConverter');

describe('QueryStringConverter', function () {
	it('should exist', function () {
		expect(qsConverter).to.exist();
	});

	describe('#convertQuery()', function () {
		var convertQuery,
			qsConverterInstance;

		beforeEach(function () {
			qsConverterInstance = qsConverter.createInstance();
			convertQuery = qsConverterInstance.convertQuery;
		});

		it('should exist', function () {
			expect(convertQuery).to.exist();
			expect(convertQuery).to.be.a('function');
		});
		//	limit   : /[0-9]*/,
		it('should convert "limitTo=1" => {limit:1}', function () {
			var query = 'limitTo=1';
			var expectClause = {limit : 1};

			var returnedClause = convertQuery(query);
			expect(returnedClause).to.deep.equal(expectClause);
		});

		it('should throw InvalidQueryValue Exception if limitTo is not a number', function () {
			var query = 'limitTo=abc';
			expect(convertQuery.bind(qsConverterInstance, query)).to.throw(qsConverter.InvalidQueryValue);
		});

		//	offset  : /[0-9]*/, // num
		it('should convert "offset=10" => {offset:10}', function () {
			var query = 'offset=10';
			var expectClause = {offset : 10};

			expect(convertQuery(query)).to.deep.equal(expectClause);
		});

		it('should throw InvalidQueryValue Exception if offest is not a number', function () {
			var queryString = 'offset=abc';
			expect(convertQuery.bind(qsConverterInstance, queryString)).to.throw(qsConverter.InvalidQueryValue);
		});

		it('should convert "offset=10&limitTo=1" => {offset:10, limit:1}', function () {
			var query = 'offset=10&limitTo=1';
			var expectClause = {offset : 10, limit : 1};
			expect(convertQuery(query)).to.deep.equal(expectClause);
		});

		it('should throw "InvalidQueryParameterError" on invalid query Parameter', function () {
			var invalidQuery = 'invalidKey=invalidValue';
			var expectedError = qsConverter.InvalidQueryParameter;
			expect(convertQuery.bind(qsConverterInstance, invalidQuery)).to.throw(expectedError);
		});

		//	order   : 'order', // --> -/+field
		it('should convert orderBy=+field1 => [["field1", "asc"]]', function () {
			let query = 'orderBy=' + queryString.escape('+field1');
			expect(convertQuery(query)).to.deep.equal({order : [['field1', 'ASC']]});
		});

		it('should convert orderBy without + to ascending field', function () {
			let query ='orderBy=field1';
			expect(convertQuery(query)).to.deep.equal({order: [['field1', 'ASC']]});
		});

		it('should convert orderBy=-field1 => [["field1", "desc"]]"', function () {
			let query = 'orderBy=' + queryString.escape('-field1');
			expect(convertQuery(query)).to.deep.equal({order : [['field1', 'DESC']]});
		});

		it('should convert multiple orderBy-Fields', function () {
			let orderField1 = queryString.escape('-field1');
			let orderField2 = queryString.escape('+field2');
			let query = 'orderBy=' + orderField1 + ',' + orderField2;
			expect(convertQuery(query)).to.deep.equal({order: [['field1', 'DESC'], ['field2', 'ASC']]});
	});
		});

//	fields  : 'attributes', // --> Comma separated like fields=name,id,createdAt
//	where   : 'where', // --> Comma separated field:values pairs like field1:value1,field2:value2 (flat) - maybe
// allow keywords? include : 'include' // --> model1(fieldName1,fieldName2),model2

});
