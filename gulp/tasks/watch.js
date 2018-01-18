var gulp = require('gulp'),
		config = require('../config');

gulp.task('watch', ['fonts', 'img', 'sass', 'html', 'db'], function () {
	gulp.watch(config.src.dir + config.sass.srcDir + '**/*', ['sass']);
	gulp.watch(config.src.dir + config.html.srcDirPages + '**/*', ['html']);
	gulp.watch(config.src.dir + config.html.srcDirTemplates + '**/*', ['html']);
	gulp.watch(config.src.dir + config.img.srcDir + '**/*', ['img']);
	gulp.watch(config.src.dir + config.fonts.srcDir + '**/*', ['fonts']);
	gulp.watch(config.src.dir + config.fonts.srcDir + '**/*', ['db']);
});