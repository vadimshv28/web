var browserify = require('browserify'),
		watchify   = require('watchify'),
		source     = require('vinyl-source-stream'),
		gulp       = require('gulp'),
		config     = require('../config'),
		browserSync = require('browser-sync');

gulp.task('js', function() {
	
	var bundler = watchify(browserify(config.src.dir + config.js.srcDir + config.js.srcFile, {
		cache: {},
		packageCache: {},
		fullPaths: false,
		debug: true
	}));

	function rebundle() {
		return bundler.bundle().on('error', function(err){console.log('Ошибка: ' + err.message);})
		.pipe(source(config.js.distFile))
		.pipe(gulp.dest(config.dist.static.ext + config.js.distDir))
		.pipe(browserSync.reload({stream:true}));
	}

	bundler.on('update', rebundle);

	return rebundle();
});
