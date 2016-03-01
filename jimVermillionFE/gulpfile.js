const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const babel = require('babel-loader');
const html = require('html-loader');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCSS = require('gulp-minify-css');

// COPY THE HTML TO BUILD FILE
gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

// CSS DEPRICATED I THINK
gulp.task('css:dev', () => {
  gulp.src(__dirname + '/app/css/*.css')
    .pipe(gulp.dest(__dirname + '/build/css'));
});

// JS BUNDLING
gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/build/'));
});

// sassy
gulp.task('sassy', () => {
  gulp.src(__dirname + '/app/sass/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build/css/'));
});

// test
gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      },
      module: {
        loaders: [
          {
            loader: 'babel?presets[]=es2015'
          },
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest(__dirname + '/test/'));
});

// lint
gulp.task('lint', () => {
  return gulp.src(__dirname + '/app/js/client.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// build combo platter
gulp.task('build:dev', ['webpack:dev', 'html:dev', 'css:dev']);

// watchout!
gulp.task('watch', function() {
    gulp.watch(['app/js/client.js', 'app/index.html', 'app/css/style.css'], ['build:dev']);
    gulp.watch(['test/test_entry.js'], ['webpack:test']);
    gulp.watch(['app/scss/*.scss'], ['sassy']);
    // gulp.watch(['app/js/client.js', 'app/index.html'], ['develop']);
});

// default
gulp.task('default', ['build:dev', 'lint', 'webpack:test', 'sassy']);
