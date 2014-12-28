'use strict';
/**
 * Created by David on 27.12.14.
 */
var supertest = require('co-supertest'),
	chai = require('chai');

var app = require('../../server/server');

var request = supertest.agent(app.listen());

describe('Application', function () {
	var waitForDB = function (callback) {
		app.on('dbReady', callback);
	};
	//before(function *(){
	//	yield waitForApp;
	//});


	describe('GET /', function () {
		it('should return status 200', function *() {
			var res = yield request.get('/').expect(200).end();
		});
	});

	describe('POST /', function () {

	});

	describe('404', function () {
		it('should get a 404 un unkown routes', function *() {
			yield request.get('/unkown/route').expect(404).end();
		});
	});
});