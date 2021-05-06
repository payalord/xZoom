const gulp = require('gulp');
const minify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-js', function () {
  return gulp.src("src/xzoom.js")
    .pipe(minify({output: {comments: /^!|@preserve|@license|@cc_on/i}}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', function () {
	return gulp.src("src/xzoom.css")
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
});

gulp.task('copy-css', function () {
	return gulp.src("src/xzoom.css").pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.series('minify-js', 'minify-css', 'copy-css'));