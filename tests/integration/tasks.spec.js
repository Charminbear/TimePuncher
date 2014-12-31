'use strict';
/**
 * Created by David on 28.12.14.
 */
var supertest = require('co-supertest'),
	expect = require('chai').expect,
	_ = require('lodash');

var app = require('../../server/server'),
	db = require('../../server/db');

var request;

var TASK_LIST_MOCK = require('../_mocks/M_TaskList.json');
// CONNECT TO DB AND INSERT SOME TASKS


describe('Tasks', function () {
	before(prepareDatabase);

	describe('GET /tasks', function () {
		it('route should exist', function* () {
			yield request.get('/tasks').expect(200).end();
		});

		it('should return array', function* () {
			var response = yield request
				.get('/tasks')
				.expect(200)
				.end();
			expect(response).to.have.property('body');
			expect(response.body).to.be.an('array');
		});


		it('should return all Tasks', function* () {
			var allTasks = yield getDataValuesOfAllTasks;
			var response = yield request
				.get('/tasks')
				.expect(200)
				.end();
			expect(response).to.have.property('body');
			expect(response.body.length).to.equal(allTasks.length);
			expect(response.body).to.deep.equal(allTasks);
		});
	});

	xdescribe('POST|PUT /tasks', function () {

	});

	xdescribe('DEL /tasks', function () {

	});

	xdescribe('GET /tasks/{taskId}', function () {
		it('should return correct task', function* () {

		});
	});




	function* prepareDatabase() {
		this.timeout(10000);
		try {
			yield db.sync({force : true});
			yield db.models.Task.bulkCreate(TASK_LIST_MOCK);

			var allTasks = yield db.models.Task.findAll();
			expect(allTasks.length).to.equal(TASK_LIST_MOCK.length);
		} catch (error) {
			console.error('Error while setting up Database: ', error);
		}

		request = supertest.agent(app.listen());
	}

	function* getDataValuesOfAllTasks() {
		var allTasks = yield db.models.Task.findAll();
		// KoA Stringifies the data-values before sending it back. This transforms date-objects into datetime-strings
		// which we also need to be able to do a deep equals
		var stringifiedTasks = JSON.stringify(allTasks);
		return JSON.parse(stringifiedTasks);
	}
});