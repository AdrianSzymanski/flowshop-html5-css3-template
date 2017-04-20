var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');



gulp.task('clean:build', function() {
  return del.sync('app/build');
})

gulp.task('sass', function() {
  return gulp.src('app/resources/sass/master.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
  
/*
  gulp.task('scripts', function() {
  	var path = 'app/resources/js/';

    return gulp.src(
      [
        path+'jquery/jquery-2.1.1.js',
        path+'jquery-ui/jquery-ui.min.js',
        path+'master.js'
      ])
      .pipe(concat('master.min.js'))
      .pipe(gulp.dest('app/build/js'));
  });
*/

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/resources/sass/**/*.scss', ['sass']);
  gulp.watch('app/resources/js/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence('clean:build', ['sass', 'browserSync', 'watch'],
    callback
  )
});