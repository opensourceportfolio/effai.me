var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

gulp.task('default', ['compile', 'copy-lib', 'copy-font']);

gulp.task('copy-lib', function() {
  return gulp.src(['src/lib/**/*'])
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-font', function() {
  return gulp.src(['src/font/**/*.*'])
    .pipe(gulp.dest('dist/font'));
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
  gulp.watch('src/*.js', ['default']);
});
