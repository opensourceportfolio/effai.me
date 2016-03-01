'use strict';
let gulp = require('gulp');
let changed = require('gulp-changed');
let watch = require('gulp-watch');
let postcss = require('gulp-postcss');
let cssnext = require('cssnext');
let cssNested = require('postcss-nested');

gulp.task('default', ['css', 'copy-font']);

gulp.task('copy-font', () => {
  return gulp.src(['src/font/**/*.*'])
    .pipe(changed('dist/font'))
    .pipe(gulp.dest('dist/font'));
});

gulp.task('css', () => {
  let processors = [
    cssnext,
    cssNested
  ];

  gulp.src(['src/css/**/*.css'])
    .pipe(changed('dist/css'))
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', () => {
  watch('src/**/*.js', ['default']);
});
