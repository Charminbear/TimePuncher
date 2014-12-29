'use strict';
/**
 * Created by dave on 26.10.14.
 */
var gulp = require('gulp'),
	ps = require('gulp-load-plugins')(),
	mainBowerFiles = require('main-bower-files'),
	server = ps.developServer;

gulp.task('default', function () {
	// place code for your default task here
});

gulp.task('serve', ['index'], function () {
	server.listen({
		path     : './server/server.js',
		env      : {
			PORT     : 3000,
			NODE_ENV : 'development'
		},
		execArgv : ['--harmony']
	}, ps.livereload.listen);


	gulp.watch('./server/**/*{.js,.json}', function () {
		server.restart();
	});
	gulp.watch(['./client/**/*{.js,.css,.html}'], ['index']).on('change', function (file) {
		ps.livereload.changed(file.path);
	});
});

gulp.task('index', function () {
	var jsSources = gulp.src(['./client/app/**/*.js', './client/app/**/*.css'], {read : false}),
		bowerSources = gulp.src(mainBowerFiles(), {read : false});
	return gulp.src('./client/index.html')
		.pipe(ps.inject(jsSources, {relative : true}))
		.pipe(ps.inject(bowerSources, {name : 'bower', relative : true}))
		.pipe(gulp.dest('./client'));
});