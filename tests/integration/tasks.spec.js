'use strict';
/**
 * Created by David on 28.12.14.
 */
var supertest = require('co-supertest'),
	expect = require('chai').expect,
	_ = require('lodash'),
	queryString = require('querystring');

var app = require('../../server/server'),
	db = require('../../server/db');

var request;

var TASK_LIST_MOCK = require('../_mocks/M_TaskList.json');

describe('Tasks', function () {
	before(syncDatabase);
	after(syncDatabase);


	describe('GET /tasks', function () {
		beforeEach(insertTaskMocksToDB);
		it('route should exist', function* () {
			yield sendRequestTo('/tasks');
		});

		it('should return array', function* () {
			var response = yield sendRequestTo('/tasks');
			expect(response).to.have.property('body');
			expect(response.body).to.be.an('array');
		});


		it('should return all Tasks', function* () {
			var allTasks = yield getDataValuesOfAllTasks;
			var response = yield sendRequestTo('/tasks');

			expect(response).to.have.property('body');
			expect(response.body.length).to.equal(allTasks.length);
			expect(response.body).to.deep.equal(allTasks);
		});

		it('should return empty array if no tasks exist', function* () {
			yield db.models.Task.destroy();
			var response = yield sendRequestTo('/tasks');

			expect(response.body.length).to.equal(0);
		});

		it('should limit result to 2 with limitTo query', function* () {
			var query = {limit : 1};
			var response = yield sendRequestTo('/tasks?' + queryString.stringify(query));

			expect(response.body.length).to.equal(1);
		});

		it('should offset result by 1 with query', function* () {

		});

	});

	xdescribe('GET /tasks?QUERY', function () {
		it('it should return single task on id=ID', function* () {
			var query = {}
		});
	});

	xdescribe('POST|PUT /tasks', function () {

	});

	xdescribe('DEL /tasks', function () {

	});

	describe('GET /tasks/{taskId}', function () {
		var singleTask,
			requestUrl;

		beforeEach(function* () {
			yield insertTaskMocksToDB;
			singleTask = yield getDatValueOfSingleTask;
			requestUrl = '/tasks/' + singleTask.id;
		});

		it('route should exist', function* () {
			yield sendRequestTo(requestUrl);
		});

		it('should return correct task', function* () {
			var response = yield sendRequestTo(requestUrl);
			expect(response.body).to.deep.equal(singleTask);
		});

		it('should return 404 if task doesnt exist', function* () {
			yield request
				.get('/tasks/invalidId')
				.expect(404)
				.end();
		});
	});

	function sendRequestTo(URL) {
		return request
			.get(URL)
			.expect(200)
			.end();
	}

	function* syncDatabase() {
		this.timeout(10000);
		try {
			yield db.sync({force : true});
		} catch (error) {
			console.error('Error while setting up Database: ', error);
		}

		request = supertest.agent(app.listen());
	}

	function* insertTaskMocksToDB() {
		yield db.models.Task.destroy();
		yield db.models.Task.bulkCreate(TASK_LIST_MOCK);
		var allTasks = yield db.models.Task.findAll();
		expect(allTasks.length).to.equal(TASK_LIST_MOCK.length);
	}

	function* getDataValuesOfAllTasks() {
		var allTasks = yield db.models.Task.findAll();
		// KoA Stringifies the data-values before sending it back. This transforms date-objects into datetime-strings
		// which we also need to be able to do a deep equals
		var stringifiedTasks = JSON.stringify(allTasks);
		return JSON.parse(stringifiedTasks);
	}

	function* getDatValueOfSingleTask() {
		var singleTask = yield db.models.Task.find({limit : 1});
		var stringifiedTask = JSON.stringify(singleTask);
		return JSON.parse(stringifiedTask);
	}
});