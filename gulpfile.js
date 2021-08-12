'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const cleanCSS = require('gulp-clean-css');
const server = browserSync.create();

function minifycss(){
  return gulp.src('./src/styles/*.css')
    .pipe(cleanCSS({compatibility: '*'}))
    .pipe(gulp.dest('dist'));
}

const webpackConfig = require('./webpack.config.js');

// browser sync watching files

const allWatch = () =>  gulp.watch(['*.html', 'src/scripts/*.js', 'src/styles/*.css'], reload);
const watchJS = () =>  gulp.watch('src/**/*.js', webpackTasks);


//server reload
function reload(done) {
    server.reload();
    done();
}

// Static server
function serve(done) {
    server.init({
      server: {
        baseDir: "./"
      },
    });
    done();
}

// webpack tasks
function webpackTasks(done) {
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // error output options
    }));
  });
    done();
}

const dev = gulp.series(
    serve,
    webpackTasks,
    minifycss,
    gulp.parallel(allWatch, watchJS)
);

exports.default = dev;
