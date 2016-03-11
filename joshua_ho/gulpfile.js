const gulp = require('gulp');
const webpack = require('webpack-stream');
const babel = require('babel-loader');
const html = require('html-loader');


gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('css:dev' , () => {
  gulp.src(__dirname + '/app/css/**/*.css')
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

gulp.task('webpack:test' , () => {
  gulp.src( __dirname + '/test/test_entry.js')
    .pipe(webpack(
      {
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
      }
    ))
    .pipe(gulp.dest('build/'));
});



gulp.task('watch' , () => {
  gulp.watch(__dirname + '/app/js/*.js' , ['webpack:dev']);
  gulp.watch(__dirname + '/app/js/**/*.js' , ['webpack:dev']);
  gulp.watch(__dirname + '/app/js/**/**/*.js' , ['webpack:dev']);

  gulp.watch(__dirname + '/test/*.js' , ['webpack:test']);
  gulp.watch(__dirname + '/test/**/*.js' , ['webpack:test']);

  gulp.watch(__dirname + '/app/css/**/*.css' , ['css:dev']);

  gulp.watch(__dirname + '/app/*.html' , ['html:dev']);
  gulp.watch(__dirname + '/app/templates/*.html' , ['html:dev']);
  gulp.watch(__dirname + '/app/templates/**/**/*.html' , ['html:dev']);
});

gulp.task('build:dev', ['webpack:dev', 'html:dev' , 'css:dev' , 'webpack:test']);
gulp.task('default', ['build:dev','watch']);

//Copied form GitHub - Javascript Week 6
