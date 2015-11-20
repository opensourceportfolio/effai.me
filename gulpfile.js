var gulp = require('gulp');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');
var cssNested = require('postcss-nested');

gulp.task('default', ['compile', 'css', 'copy-lib', 'copy-font']);

gulp.task('copy-lib', function() {
  return gulp.src(['src/lib/**/*'])
    .pipe(changed('dist/lib'))
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-font', function() {
  return gulp.src(['src/font/**/*.*'])
    .pipe(changed('dist/font'))
    .pipe(gulp.dest('dist/font'));
});

gulp.task('css', function() {
  var processors = [
    cssnext,
    cssNested
  ];

  gulp.src(['src/css/**/*.css'])
    .pipe(changed('dist/css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('compile', function() {
  return gulp.src(['src/**/*.js', '!src/lib/**/*.js'])
    .pipe(changed('dist'))
    .pipe(sourcemaps.init({
      loadMaps: 'inline'
    }))
    .pipe(babel({
      'modules': 'amd'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  watch('src/**/*.js', ['default']);
});
