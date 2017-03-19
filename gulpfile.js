var gulp = require('gulp'),
  minify = require('gulp-uglify');
  rename = require('gulp-rename');

gulp.task('minify-js', function () {
  return gulp.src("src/xzoom.js")
    .pipe(minify({output: {comments: /^!|@preserve|@license|@cc_on/i}}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('copy-css', function () {
	return gulp.src("src/xzoom.css").pipe(gulp.dest('dist'))
});

gulp.task('default', ['minify-js', 'copy-css']);