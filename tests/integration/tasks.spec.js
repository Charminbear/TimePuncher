'use strict';
/**
 * Created by David on 28.12.14.
 */
var supertest = require('co-supertest'),
	expect = require('chai').expect;

var app = require('../../server/server'),
	db = require('../../server/db');

var request;

var TASK_LIST_MOCK = require('../_mocks/M_TaskList.json');
// CONNECT TO DB AND INSERT SOME TASKS


describe('Tasks', function () {
	before(prepareDatabase);

	describe('GET /tasks', function () {
		it('route should exist', function* () {
			yield request
				.get('/tasks')
				.set('Accept', 'application/json')
				.expect(200)
				.end();
		});

		it('should return all tasks', function* () {

		});
	});

	xdescribe('GET /tasks/{taskId}', function () {
		it('should return correct task', function* () {

		});
	});

	xdescribe('POST|PUT /tasks', function () {

	});

	xdescribe('DEL /tasks', function () {

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
});