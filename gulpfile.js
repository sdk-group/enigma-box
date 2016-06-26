var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('default', function () {
	gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('mocha', function () {
	return gulp.src(['test/*.js'], {
			read: false
		})
		.pipe(mocha({
			globals: {
				_: require('lodash'),
				Promise: require('bluebird'),
				Couchbird: require('Couchbird')
			}
		}))
		.on('error', gutil.log);
});