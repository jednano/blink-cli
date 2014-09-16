var del = require('del');
var gulp = require('gulp');
var tsc = require('gulp-tsc');

gulp.task('default', ['build']);

gulp.task('build', ['clean', 'ts']);

gulp.task('clean', function(done) {
	del(['lib/cli.js'], done);
});

gulp.task('ts', function() {
	return gulp.src('lib/cli.ts')
		.pipe(tsc({ target: 'es5' }))
		.pipe(gulp.dest('lib'));
});
