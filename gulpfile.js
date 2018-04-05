const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

gulp.task('html', function() {
    gulp
        .src('./src/index.html')
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp
        .src([
            './src/js/*.js',
            './node_modules/bootstrap/dist/js/bootstrap.js'
        ])
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    gulp
        .src([
            './src/image/**/*.*',
            './src/image/*.*'
        ])
        .pipe(gulp.dest('./build/image/'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    gulp
        .src([
            './node_modules/bootstrap/dist/fonts/*.*'
        ])
        .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('css', function() {
    gulp
        .src([
            './src/styles/main.css',
            './src/styles/**/*.css',
            './node_modules/bootstrap/dist/css/bootstrap.min.css'
        ])
        // .pipe(less())
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions']
        // }))
        // .pipe(concat('main.css'))
        // .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(gulp.dest('./build/styles/'))
        .pipe(browserSync.stream());
    }
);

gulp.task('serve', ['html', 'css', 'js', 'img', 'fonts'], function(){
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task('watch', ['serve'], function () {
    gulp.watch(['./src/styles/**/*.css', './src/styles/**/*.less'], ['css']);
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch(['./src/img/**/*.*', './src/img/*.*'], ['img']);
});
gulp.task('default', ['watch']);
