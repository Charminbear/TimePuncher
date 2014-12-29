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
	var allTasks;
	before(function *() {
		this.timeout(10000);
		try {
			yield db.sync({force : true});
			yield db.models.Task.bulkCreate(TASK_LIST_MOCK);

			allTasks = yield db.models.Task.findAll();
			expect(allTasks.length).to.equal(TASK_LIST_MOCK.length);
		} catch (error) {
			console.error('Error while setting up!', error);
		}

		request = supertest.agent(app.listen());
	});

	describe('GET /tasks', function () {
		it('should exist', function* () {
			yield request
				.get('/tasks')
				.set('Accept', 'application/json')
				.expect(200)
				.end();
		});

		it('should return all tasks', function* () {

		});
	});

	describe('GET /tasks/{taskId}', function () {

	});

	describe('POST|PUT /tasks', function () {

	});

	describe('DEL /tasks', function () {

	});
});