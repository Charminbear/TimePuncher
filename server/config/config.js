'use strict';
/**
 * Created by dave on 02.01.15.
 */


const path = require('path'),
	_ = require('lodash');

var config = {
	env     : process.env.NODE_ENV || 'development',
	port    : process.env.PORT || 3000,
	baseDir : path.join(__dirname, '..')
};

var envConfigPath = path.join(__dirname, 'env', config.env + '.config.js');
module.exports = _.extend({},
	config,
	require(envConfigPath));
