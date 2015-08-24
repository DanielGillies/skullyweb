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


var paths = {
   css: {
     src: __dirname + '/assets/css/*.css',
     dest: __dirname + '/static/css',
   },
   vendorjs: {
     src: __dirname + '/assets/js/vendor/*.js',
     dest: __dirname + '/static/js',
   },
   userjs: {
     src: __dirname + '/assets/js/*.js',
     dest: __dirname + '/static/js',
   },
   img: {
    src: __dirname + '/assets/img/*',
    dest: __dirname + '/static/img'
 }
};

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
        autoprefixer({browsers: ['last 3 versions']}),
        mqpacker,
        csswring
    ];
    return gulp.src([paths.css.src, '!'+paths.usercss.src])
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

gulp.task('clean', function() {
    del([paths.css.dest, paths.userjs.dest], function() {
    process.exit(0)
    });
});

gulp.task('default', function() {
    gulp.run('vendorjs');
    gulp.run('js');
    gulp.run('css');
});


// var autoprefixer = require('autoprefixer-core');
// var browserSync = require('browser-sync');
// var browserify = require('browserify');
// var buffer = require('gulp-buffer');
// var csswring = require('csswring');
// var del = require('del');
// var exec = require('executive');
// var gulp = require('gulp');
// var imagemin = require('gulp-imagemin');
// var mqpacker = require('css-mqpacker');
// var notify = require('gulp-notify');
// var postcss = require('gulp-postcss');
// var rename = require('gulp-rename');
// var source = require('vinyl-source-stream')
// var sourcemaps = require('gulp-sourcemaps');
// var stylus = require('gulp-stylus');
// var uglify = require('gulp-uglify');
// var watchify = require('watchify');

// var paths = {
//   css: {
//     src: __dirname + '/assets/css/bellabeat.styl',
//     dest: __dirname + '/static/css',
//   },
//   preorderjs: {
//     src: __dirname + '/assets/js/bellabeat.js',
//     dest: __dirname + '/static/js',
//   },
//   userjs: {
//     src: __dirname + '/assets/js/user.js',
//     dest: __dirname + '/static/js',
//   },
//   img: __dirname + '/static/img/**'
// }

// function error() {
//   var args = Array.prototype.slice.call(arguments)

//   // Send error to notification center with gulp-notify
//   notify.onError({
//     title: 'Compile Error',
//     message: '<%= error %>'
//   }).apply(this, args);

//   // Keep gulp from hanging on this task
//   this.emit('end');
// }

// // JAVASCRIPT TASKS
// var preorderbrowserified = watchify(browserify(paths.preorderjs.src, {
//   transform: ['coffeeify', 'riotify'],
//   extensions: ['.coffee', '.tag'],
//   debug: true,
//   cache: {},
//   packageCache: {},
//   fullpaths: true, // watchify args
// }))

// var userbrowserified = watchify(browserify(paths.userjs.src, {
//   transform: ['coffeeify', 'riotify'],
//   extensions: ['.coffee', '.tag'],
//   debug: true,
//   cache: {},
//   packageCache: {},
//   fullpaths: true, // watchify args
// }))

// function preorderbundle() {
//   return preorderbrowserified.bundle()
//       .on('error', error)
//       .pipe(source(paths.preorderjs.src))
//       .pipe(buffer())
//       .pipe(rename('bellabeat.js'))
// }

// function userbundle() {
//   return userbrowserified.bundle()
//       .on('error', error)
//       .pipe(source(paths.userjs.src))
//       .pipe(buffer())
//       .pipe(rename('user.js'))
// }

// function preorderjs() {
//   return preorderbundle()
//   .pipe(gulp.dest(paths.preorderjs.dest))
//       .pipe(browserSync.reload({
//         stream: true
//       }))
// }

// function userjs() {
//   return userbundle()
//       .pipe(gulp.dest(paths.userjs.dest))
//       .pipe(browserSync.reload({
//         stream: true
//       }))
// }

// // Build JS during development, re-bundling on change
// gulp.task('js', function() {
//   // Rebuild bundle on update
//   preorderbrowserified.on('update', preorderjs)
//   userbrowserified.on('update', userjs)
//   preorderjs()
//   userjs()
// })

// // Build minified JS.
// gulp.task('preorderjs-min', function() {
//   return preorderbundle()
//       .pipe(uglify())
//       .pipe(gulp.dest(paths.preorderjs.dest))
// })

// gulp.task('userjs-min', function() {
//   return userbundle()
//       .pipe(uglify())
//       .pipe(gulp.dest(paths.userjs.dest))
// })

// // CSS TASKS
// function css() {
//   // Configure stylus options
//   var style = stylus({
//    'include css': true,
//    // linenos: true,
//     use: function(style) {
//       style.include(__dirname + '/assets/css');
//       style.include(__dirname + '/node_modules');
//       style.include(__dirname + '/node_modules/bootstrap-styl');
//       style.set('sourcemap', {
//         comment: true,
//         inline: true,
//         sourceRoot: '',
//         basePath: __dirname,
//       })
//     }
//   })

//   return gulp.src(paths.css.src)
//     .pipe(sourcemaps.init())
//     .pipe(style)
//     .on('error', error)
// }

// gulp.task('css', function() {
//   return css()
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(paths.css.dest))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
// })

// gulp.task('css-min', function() {
//   // Postprocessor options
//   var processors = [
//       autoprefixer({browsers: ['last 10 versions']}),
//       mqpacker,
//       csswring,
//   ];

//   return css()
//     .pipe(postcss(processors))
//     // .pipe(csso())
//     .pipe(gulp.dest(paths.css.dest))
// })

// // IMAGE TASK
// gulp.task('img-min', function(cb) {
//   // Not used by default as it's quite slow
//   return gulp.src(paths.img)
//     .pipe(imagemin())
//     .on('end', function() {
//       process.exit(0)
//     })
// })

// // BROWSERSYNC TASK
// gulp.task('browser-sync', function() {
//   browserSync({
//     server: {
//       baseDir: __dirname
//     }
//   });
// })

// // WATCH TASK
// gulp.task('watch', function() {
//   gulp.watch(paths.css.src, ['css']);
//   gulp.watch(paths.preorderjs.src, ['js']);
//   gulp.watch(paths.userjs.src, ['js']);
// });

// // BUILD TASK
// gulp.task('build', ['css-min', 'preorderjs-min', 'userjs-min'], function(cb) {
//   cb()
//   process.exit(0)
// });

// // CLEAN TASK
// gulp.task('clean', function() {
//   del(['static/css', 'static/js'], function() {
//     process.exit(0)
//   });
// });

// // DEPLOY
// gulp.task('deploy', function(cb) {
//   exec('git status --porcelain', function(err, stdout, stderr) {
//     if (stdout !== '') {
//       console.log('Please commit all of your changes before deploying.')
//       process.exit(1)
//     }

//     var env = process.env.ENV || 'staging';

//     exec.quiet('git rev-parse master', function(err, rev) {
//       console.log('Deploying master to ' + env)
//       exec('git update-ref -m "deploy" refs/heads/' + env + ' ' + rev, function() {
//         exec('git push origin ' + env + ':' + env, function() {
//           process.exit(0)
//         })
//       })
//     })
//   })
// });

// // DEFAULT
// gulp.task('default', ['css', 'js', 'browser-sync', 'watch']);
