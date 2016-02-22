const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const files = ['test/*.js', '!node_modules//**'];
const babel = require('babel-loader');

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
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

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/test/'));
});

// gulp.task('watch', function() {
//   gulp.watch(['app/js/client.js', 'app/index.html'], ['build:dev']);
//   gulp.watch(['test/test_entry.js'], ['webpack:test']);
// });

gulp.task('build:dev', ['webpack:dev', 'html:dev']);
gulp.task('default', ['build:dev', 'webpack:test']);
