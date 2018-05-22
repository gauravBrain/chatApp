const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const minCss = require('gulp-minify-css');




gulp.task('minifyJs', function () {
    gulp.src('public/js/*.js')
        .pipe(concat('build.js'))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('public/build/js'));
})

gulp.task('minifyCss', function () {
    gulp.src('public/css/*.css')
        .pipe(concat('build.css'))
        .pipe(minCss())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('public/build/css'));
})

gulp.task('build',['minifyJs','minifyCss'])


gulp.task('watch',function(){
    gulp.watch('public/js/*.js',['minifyJs']);
    gulp.watch('public/css/*.css',['minifyCss']);
    
})