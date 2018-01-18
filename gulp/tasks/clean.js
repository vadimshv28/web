var gulp   = require('gulp'),
		del    = require('del'),
		config = require('../config');

gulp.task('clean', function () {
	return del.sync([config.dist.static.ext + '*'])
});
