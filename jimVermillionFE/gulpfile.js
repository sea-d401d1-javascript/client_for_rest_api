const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
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
    .pipe(gulp.dest(__dirname + '/build/'));
});


//test
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
          }
        ]
      }
    }))
    .pipe(gulp.dest(__dirname + '/test/'));
});

gulp.task('lint', () => {
  return gulp.src(__dirname + '/app/js/client.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build:dev', ['webpack:dev', 'html:dev']);

gulp.task('watch', function() {
    gulp.watch(['app/js/client.js', 'app/index.html', 'app/css/style.css'], ['build:dev']);
    gulp.watch(['test/test_entry.js'], ['webpack:test']);
    // gulp.watch(['app/js/client.js', 'app/index.html'], ['develop']);
});

gulp.task('default', ['build:dev', 'lint', 'webpack:test', 'watch']);
