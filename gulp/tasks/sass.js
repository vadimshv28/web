var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		browserSync  = require('browser-sync')
		autoprefixer = require('gulp-autoprefixer'),
		minifyCss    = require('gulp-minify-css'),
		config       = require('../config');

gulp.task('sass', function() {
	return gulp.src(config.src.dir + config.sass.srcDir + config.sass.srcFile)
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest(config.dist.static.ext + config.sass.distDir))
	// .pipe(minifyCss())
	// .pipe(gulp.dest('dist/public/css'))
	.pipe(browserSync.reload({stream:true}))
});