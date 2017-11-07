'use strict';
 
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    autoprefixer = require('autoprefixer'),
    postcss      = require('gulp-postcss'),
    sourcemaps      = require('gulp-sourcemaps'),
    rigger          = require('gulp-rigger'),
    notify          = require('gulp-notify'),
    imagemin        = require('gulp-imagemin');
 
    
var path = {
  dev : {
    output : './dev/',
    outputHtml : './dev/templates/*.html',
    outputSass : './dev/assets/sass/**/*.scss',
    outputStyles : './dev/assets/css',
    outputImages: './dev/assets/img/*'
  },
  release : {
    output  : './release/',
    outputStyles : './release/assets/css',
    outputImages: './release/assets/img'
  }
}
    

gulp.task('html', function () {
    return gulp.src(path.dev.outputHtml)
        .pipe(rigger())
        .pipe(gulp.dest(path.release.output))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function () {
  return gulp.src(path.dev.outputSass)
    // .pipe(sourcemaps.init())
    .pipe(sass())
      .on('error', notify.onError())
    .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.release.outputStyles))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('imagemin', function () {
  gulp.src(path.dev.outputImages)
      .pipe(imagemin())
      .pipe(gulp.dest(path.release.outputImages))
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: path.release.output
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});
 
gulp.task('default', ['html','sass', 'imagemin', 'browser-sync'], function () {
  gulp.watch('./dev/assets/sass/**/*.scss', ['sass']);
  gulp.watch('./dev/templates/**/*.html', ['html']);
});