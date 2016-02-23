'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var files = ['index.js', 'gulpfile.js', './lib/*js', './test/*spec.js', '!node_modules/**', '!*.json'];

gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('mocha', () => {
  return gulp.src('test/*.spec.js')
    .pipe(mocha({ reporter: 'nyan'}));
  });

gulp.task('watch', () => {
  return gulp.watch(files ['lint', 'mocha']);
});
gulp.task('default', ['watch', 'lint', 'mocha']);
