var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');
    sourcemaps = require('gulp-sourcemaps');

gulp.task('js-vendor', function(){
    return gulp.src(['vendor/file1.js', 'vendor/file2.js', 'vendor/file3.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('vendor.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});
