const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const html = require('html-loader');

const jsFiles = ['./*.js', 'app/**/*.js', '!node_modules/**'];
const clientScripts = ['app/**/*.js'];
const staticFiles = ['app/**/*.html'];
const cssFiles = ['app/**/*.css'];

gulp.task('html:dev', () => {
  gulp.src(staticFiles)
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('css:dev', () => {
  gulp.src(cssFiles)
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  gulp.src(clientScripts)
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('lint', () => {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel?presets[]=es2015'
          },
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      }
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('watch', () => {
  gulp.watch([jsFiles, staticFiles, cssFiles], ['build:dev']);
});

gulp.task('build:dev', ['watch', 'lint', 'html:dev', 'webpack:dev', 'css:dev']);
gulp.task('default', ['build:dev']);
