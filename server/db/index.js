'use strict';
/**
 * Created by dave on 28.12.14.
 */

const fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize');

const DB_CONFIG = require('../config/config').db;

const client = new Sequelize(DB_CONFIG.database, DB_CONFIG.user, DB_CONFIG.password, {
	dialect : "mysql", // or 'sqlite', 'postgres', 'mariadb'
	host    : DB_CONFIG.host,
	port    : DB_CONFIG.port // or 5432 (for postgres)
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
