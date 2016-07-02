const gulp = require('gulp');
const webpack = require('webpack-stream');
const babel = require('babel-loader');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('sass:dev', () => {
  gulp.src(__dirname + '/app/scss/manifest.scss')
    .pipe(sass())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/controller.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
  .pipe(webpack({
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: 'html'
        }
      ]
    },
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/'));
});


gulp.task('build:dev', ['webpack:dev', 'html:dev', 'sass:dev']);
gulp.task('default', ['build:dev']);
