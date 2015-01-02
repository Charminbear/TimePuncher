'use strict';
/**
 * Created by dave on 02.01.15.
 */


const env = process.env.NODE_ENV;

const path = require('path'),
	_ = require('lodash');

var config = {
	env     : env,
	baseDir : path.join(__dirname, '..')
};

var envConfigPath = path.join(__dirname, 'env', env + '.config.js');
module.exports = _.extend({},
	config,
	require(envConfigPath));
