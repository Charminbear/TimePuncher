'use strict';
/**
 * Created by dave on 28.12.14.
 */

module.exports = function (sequelize, DataTypes) {
	/**
	 * @class Task
	 */
	var Task = sequelize.define('Task', {
		name: DataTypes.STRING,
		startedAt: DataTypes.DATE,
		stoppedAt: DataTypes.DATE
	});

	return Task;
};