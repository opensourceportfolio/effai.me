var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');
var cssNested = require('postcss-nested');

gulp.task('default', ['compile', 'css', 'copy-lib', 'copy-font']);

gulp.task('copy-lib', function() {
  return gulp.src(['src/lib/**/*'])
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-font', function() {
  return gulp.src(['src/font/**/*.*'])
    .pipe(gulp.dest('dist/font'));
});

gulp.task('css', function() {
  var processors = [
    cssnext,
    cssNested
  ];

  gulp.src(['src/css/**/*.css'])
    .pipe(postcss(processors))
    .pipe(gulp.dest("dist/css"))
});

gulp.task('compile', function() {
  return gulp.src(['src/**/*.js', '!src/lib/**/*.js'])
    .pipe(sourcemaps.init({
      loadMaps: 'inline'
    }))
    .pipe(babel({'modules': 'amd'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  watch('src/**/*.js', ['default']);
});
