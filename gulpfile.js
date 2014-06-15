var gulp = require('gulp');

var clean = require('gulp-clean');
var tsc = require('gulp-tsc');

gulp.task('default', ['build']);

gulp.task('build', ['clean', 'ts']);

gulp.task('clean', function() {
	return gulp.src(['lib/cli.js'], { read: false })
		.pipe(clean());
});

gulp.task('ts', function() {
	return gulp.src('lib/cli.ts')
		.pipe(tsc({ target: 'es5' }))
		.pipe(gulp.dest('lib'));
});
