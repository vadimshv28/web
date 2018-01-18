var gulp   = require('gulp'),
		config = require('../config');

gulp.task('db', function() {
	return gulp.src(config.src.dir + config.db.srcDir +'**/*')
	.pipe(gulp.dest(config.dist.static.ext + config.db.distDir))
});