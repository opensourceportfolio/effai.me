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
var rjs = require('gulp-requirejs-optimize');
var clean = require('gulp-clean');

require('es6-promise').polyfill();

function hasArg() {
  return process.argv.length > 2;
}

function cleanDep() {
  return hasArg() ? [] : ['clean'];
}

gulp.task('css', ['copy-css', 'build-css']);
gulp.task('js', ['copy-lib', 'compile']);
gulp.task('default', ['css', 'js', 'copy-font']);

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('copy-lib', cleanDep(), function() {
  return gulp.src([
    'node_modules/chartist/dist/chartist.js',
    'node_modules/chartist-plugin-axistitle/dist/chartist-plugin-axistitle.js',
    'node_modules/chartist-plugin-legend/chartist-plugin-legend.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/material-design-lite/dist/material.js',
    'node_modules/ramda/dist/ramda.js',
    'node_modules/react/dist/react.js',
    'node_modules/react-dom/dist/react-dom.js',
    'node_modules/react-redux/dist/react-redux.js',
    'node_modules/react-router/umd/ReactRouter.js',
    'node_modules/redux/dist/redux.js',
    'node_modules/requirejs/require.js',
  ]).pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-css', cleanDep(), function() {
  return gulp.src([
    'node_modules/chartist/dist/chartist.css',
    'node_modules/material-design-lite/dist/material.red-amber.min.css',
  ]).pipe(gulp.dest('dist/css'));
});

gulp.task('copy-font', cleanDep(), function() {
  return gulp.src(['src/font/**/*.*'])
    .pipe(changed('dist/font'))
    .pipe(gulp.dest('dist/font'));
});

gulp.task('build-css', cleanDep(), function() {
  var processors = [
    cssnext,
    cssNested,
  ];

  gulp.src(['src/css/custom/*.css'])
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css/custom'))
    .pipe(browserSync.stream());
});

gulp.task('compile', cleanDep(), function() {
  return gulp.src(['src/**/*.js'])
    .pipe(plumber())
    .pipe(changed('dist'))
    .pipe(sourcemaps.init({
      loadMaps: 'inline',
    }))
    .pipe(babel({
      presets: ['es2015', 'es2016', 'react'],
      plugins: ['transform-es2015-modules-amd'],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('bundle', function() {
  return gulp.src('dist/root.js')
    .pipe(rjs({
      'baseUrl': 'dist',
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', function() {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: './',
      middleware: [history()],
    },
  });

  gulp.watch('src/**/*.js', ['compile']);
  gulp.watch('src/**/*.css', ['css']);
});
