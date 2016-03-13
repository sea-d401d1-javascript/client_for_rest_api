const gulp = require('gulp');
const webpack = require('webpack-stream');
// const babel = require('babel-loader');
const html = require('html-loader');

var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');

gulp.task('favicon:dev', function(){
  gulp.src(__dirname + '/app/favicon.ico')
    .pipe(gulp.dest('./build'));
});


gulp.task('sass:dev', function(){
  gulp.src(__dirname + '/app/scss/manifest.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(minifyCss)
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass:nominify', function(){
  gulp.src(__dirname + '/app/css/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass:watch', function () {
  gulp.watch(__dirname + '/app/css/')
})

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('css:dev', () => {
  gulp.src(__dirname + '/app/**/*.css')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      // module: {
      //   loaders: [{
      //     loader: 'babel?presets[]=es2015'
      //   }]
      // },
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


gulp.task('build:dev', ['webpack:dev', 'html:dev', 'css:dev', 'sass:dev', 'favicon:dev']);
gulp.task('default', ['build:dev']);
