/* eslint no-var: [0] */
/* eslint prefer-arrow-callback: [0] */

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssNested = require('postcss-nested');
var browserSync = require('browser-sync').create();
var history = require('connect-history-api-fallback');

gulp.task('default', ['compile', 'css', 'copy-font']);

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
    .pipe(browserSync.stream());
});

gulp.task('compile', function() {
  return gulp.src(['src/**/*.js', '!src/jspm_packages/**/*.js'])
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(sourcemaps.init({
      loadMaps: 'inline'
    }))
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-react-jsx'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('dev', function() {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: './',
      middleware: [history()]
    }
  });

  gulp.watch('src/**/*.js', ['compile']);
  gulp.watch('src/**/*.css', ['css']);
});
