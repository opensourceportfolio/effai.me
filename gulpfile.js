var gulp = require('gulp');
var changed = require('gulp-changed');
// var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');
var cssNested = require('postcss-nested');

gulp.task('default', ['css', 'copy-font']);

gulp.task('copy-font', function () {
  return gulp.src(['src/font/**/*.*'])
    .pipe(changed('dist/font'))
    .pipe(gulp.dest('dist/font'));
});

gulp.task('css', function () {
  var processors = [
    cssnext,
    cssNested
  ];

  gulp.src(['src/css/**/*.css'])
    .pipe(changed('dist/css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css'));
});

// gulp.task('watch', function () {
//   watch('src/**/*.js', ['default']);
// });
