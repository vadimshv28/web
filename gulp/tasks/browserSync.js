var gulp        = require('gulp'),
		browserSync = require('browser-sync'),
		config      = require('../config');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: config.dist.static.ext
		},
		notify: false
	});
	browserSync.reload;
});