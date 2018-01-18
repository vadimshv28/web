var uglify       = require('gulp-uglify'), //минификатор js
		plumber      = require('gulp-plumber'),
		requireDir   = require('require-dir');

requireDir('./gulp/tasks', { recurse: true });