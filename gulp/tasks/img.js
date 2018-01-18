var gulp        = require('gulp');
		imagemin    = require('gulp-imagemin'),
		pngquant    = require('imagemin-pngquant'),
		config      = require('../config'),
		browserSync = require('browser-sync');

gulp.task('img', function () {
	return gulp.src(config.src.dir + config.img.srcDir + '**/*')
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins:[{removeViewBox: false}],
		use: [pngquant]}))
	.pipe(gulp.dest(config.dist.static.ext + config.img.distDir))
	.pipe(browserSync.reload({stream:true}))
});