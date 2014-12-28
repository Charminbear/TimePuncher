'use strict';
/**
 * Created by dave on 28.12.14.
 */

const fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize');

const client = new Sequelize('time_puncher', 'timePuncher', 'timePuncher', {
	dialect : "mysql", // or 'sqlite', 'postgres', 'mariadb'
	port    : 3306 // or 5432 (for postgres)
});

var models = importModels();

module.exports = client;
module.exports.models = models;


function importModels() {
	var models = {};

	fs
		.readdirSync(__dirname + '/model')
		.filter(function (file) {
			return (file.indexOf('.') !== 0) && (file !== 'index.js');
		})
		.forEach(function (file) {
			var model = client.import(path.join(__dirname + '/model', file));
			models[model.name] = model;
		});
	return models;
}
