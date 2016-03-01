const gulp = require('gulp');
// const eslint = require('gulp-eslint');
// const mocha = require('gulp-mocha');
// require('gulp-util');
const webpack = require('webpack-stream');
const html = require('html-loader');
const babel = require('babel-loader');

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('css:dev', () => {
  gulp.src(__dirname + '/app/**/*.css')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('img:dev', () => {
  gulp.src(__dirname + '/app/**/*.jpg')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:allJS', () => {
  gulp.src(__dirname + '/app/js/**/*.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});


gulp.task('build:dev', ['webpack:dev', 'html:dev', 'css:dev', 'img:dev']);

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      devtool: 'source-map',
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

gulp.task('mocha', function() {
  return gulp.src(['test/**/*test.js'], { read: false })
    .pipe(mocha());
});

gulp.task('watch-mocha', function() {
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!**/node_modules/*', '!**/*bundle*', '!*.map'])
    .pipe(eslint({
      'rules': {
        'indent': [2, 2],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'no-console': 0
      },
      'env': {
        'es6': true,
        'node': true,
        'browser': true,
        'mocha': true,
        'expect': true
      },
      'extends': 'eslint:recommended'
    }))
    .pipe(eslint.format());
});

gulp.task('default', ['lint']);
