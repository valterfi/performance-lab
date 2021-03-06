var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rename = require("gulp-rename"),
    cssnano = require("gulp-cssnano"),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify-es').default;


var plumberErrorHandler = {
   errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
   })
};

gulp.task('sass', function() {
   gulp.src('./sass/*.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(cssnano())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest('./build/css'))
});

gulp.task('scripts', function(){
    gulp.src('./js/*.js')
      .pipe(streamify(uglify()))
      .pipe(rename({ extname: ".min.js" }))
      .pipe(gulp.dest('./build/js'))
});

gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });

   gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
   gulp.watch('sass/*.scss', gulp.series('sass'));
   gulp.watch('js/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('watch', 'browser-sync'));
