const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack_ct:dev', () => {
  gulp.src(__dirname + '/app/js/ct_client.js')
    .pipe(webpack({
      output: {
          filename: 'bundle_ct.js'
      }
    }))
    .pipe(gulp.dest('build/js/'));
});
gulp.task('webpack_t:dev', () => {
  gulp.src(__dirname + '/app/js/t_client.js')
    .pipe(webpack({
      output: {
          filename: 'bundle_t.js'
      }
    }))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('build:dev', ['webpack_ct:dev', 'webpack_t:dev', 'html:dev']);
gulp.task('default', ['build:dev']);
