var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant')
var del = require('del');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var handlebars = require('gulp-compile-handlebars');
var ext_replace = require('gulp-ext-replace');

var paths = {
   src: __dirname + 'assets',
   dest: __dirname + 'static',

   css: {
     src: __dirname + '/assets/css/*.css',
     dest: __dirname + '/static/css'
   },
   vendorjs: {
     src: __dirname + '/assets/js/vendor/*.js',
     dest: __dirname + '/static/js'
   },
   userjs: {
     src: __dirname + '/assets/js/*.js',
     dest: __dirname + '/static/js'
   },
   img: {
    src: __dirname + '/assets/img/*',
    dest: __dirname + '/static/img'
    },
    templates: {
        src: __dirname + '/assets/templates/*.handlebars',
        dest: __dirname + '/'
    }
};

// WATCH TASK
gulp.task('watch', ['watchcss', 'watchjs', 'watchimg', 'watchvendor']);

gulp.task('watchvendor', function() {
    watch(paths.vendorjs.src, batch(function(events, done) {
        gulp.start('vendorjs');
        done();
    }))
})

gulp.task('watchcss', function() {
    watch(paths.css.src, batch(function(events, done) {
        gulp.start('css');
        done();
    }));
});

gulp.task('watchjs', function() {
    watch(paths.userjs.src, batch(function(events, done){
        gulp.start('js');
        done();
    }));
});

gulp.task('watchimg', function() {
    watch(paths.img.src, batch(function(events, done) {
        gulp.start('compress');
        del(paths.img.src);
        done();
    }));
});

gulp.task('vendorjs', function() {
    return gulp.src(paths.vendorjs.src)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.vendorjs.dest))
});

gulp.task('js', function() {
    return gulp.src(paths.userjs.src)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.userjs.dest))
});

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src(paths.css.src)
        .pipe(postcss(processors))
        .pipe(gulp.dest(paths.css.dest));

});

gulp.task('compress', function () {
    return gulp.src(paths.img.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('cleancss', function() {
    return del(paths.css.dest, function() {
    });
});

gulp.task('cleanjs', function() {
    return del(paths.userjs.dest, function() {
    });
});

gulp.task('clean', function() {
    del([paths.css.dest, paths.userjs.dest], function() {
    process.exit(0)
    });
});

gulp.task('handlebars', function() {
    var templateData = {
    },
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false 
        batch : ['./src/partials']
    }
 
    return gulp.src(paths.templates.src)
        .pipe(handlebars(templateData, options))
        .pipe(ext_replace('.html'))
        .pipe(gulp.dest(paths.templates.dest));
}

gulp.task('default', ['vendorjs', 'js', 'css', 'watch']);
