var del = require('del');
var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', ['build']);

gulp.task('build', ['clean', 'scripts']);

gulp.task('clean', function(done) {
	del(['lib/cli.js'], done);
});

gulp.task('scripts', function() {
	var tsResult = gulp.src('lib/cli.ts')
		.pipe(ts({
			target: 'es5',
			module: 'commonjs'
		}));
	return tsResult.js.pipe(gulp.dest('lib'));
});
