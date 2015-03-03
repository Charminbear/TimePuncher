'use strict';
/**
 * Created by dave on 28.12.14.
 */

module.exports = function (sequelize, DataTypes) {
	/**
	 * @class Task
	 */
	var User = sequelize.define('User', {
		name: DataTypes.STRING,
		pwHash: DataTypes.STRING
	});

	return User;
};