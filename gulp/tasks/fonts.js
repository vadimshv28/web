var gulp        = require('gulp'),
		browserSync = require('browser-sync'),
		config      = require('../config');

gulp.task('fonts', function () {
	return gulp.src(config.src.dir + config.fonts.srcDir + '**/*')
	.pipe(gulp.dest(config.dist.static.ext + config.fonts.distDir))
	.pipe(browserSync.reload({stream:true}))
});