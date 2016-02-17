const gulp = require('gulp');
var eslint = require('gulp-eslint');
const webpack = require('webpack-stream');


var files = ['**/*.js', '!node_modules/**'];


gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/*.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
      .pipe(gulp.dest('build/'));
});

gulp.task('build:dev', ['webpack:dev', 'html:dev']);
gulp.task('default', ['build:dev']);
