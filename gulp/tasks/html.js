var gulp   = require('gulp'),
		rigger = require('gulp-rigger'),
		browserSync = require('browser-sync'),
		config = require('../config');

gulp.task('html', function() {
	return gulp.src(config.src.dir + config.html.srcDirPages +'**/*')
	.pipe(rigger())
	.pipe(gulp.dest(config.dist.static.ext))
	.pipe(browserSync.reload({stream: true}))
});