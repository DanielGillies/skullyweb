var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');
var browserify   = require('browserify');
var buffer       = require('gulp-buffer');
var concat       = require('gulp-concat');
var csswring     = require('csswring');
var del          = require('del');
var extReplace   = require('gulp-ext-replace');
var gulp         = require('gulp');
var handlebars   = require('gulp-compile-handlebars');
var imagemin     = require('gulp-imagemin');
var mqpacker     = require('css-mqpacker');
var notify       = require('gulp-notify');
var path         = require('path');
var pngquant     = require('imagemin-pngquant');
var postcss      = require('gulp-postcss');
var rename       = require('gulp-rename');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');
var watchify     = require('watchify');

var paths = {
  src:  __dirname + 'assets',
  dest: __dirname + 'static',

  css: {
    src:  __dirname + '/assets/css/*.css',
    dest: __dirname + '/static/css'
  },
  mainjs: {
    src:  __dirname + '/assets/js/main.js',
    dest: __dirname + '/static/js'
  },
  indexjs: {
    src:  __dirname + '/assets/js/index.js',
    dest: __dirname + '/static/js'
  },
  vendorjs: {
    src:  __dirname + '/assets/js/vendor/*.js',
    dest: __dirname + '/static/js'
  },
  img: {
    src:  __dirname + '/assets/img/*',
    dest: __dirname + '/static/img'
  },
  templates: {
    src:  __dirname + '/assets/templates',
    dest: __dirname + '/'
  },
  partials: __dirname + '/assets/templates/partials'
};

// BROWSERIFY BUNDLES
function Bundle(src) {
  var browserified = watchify(browserify(src, {
    debug: true,
    cache: {},
    packageCache: {},
    fullpaths: true, // watchify args
  }))

  this.bundle = function() {
    return browserified.bundle()
      .on('error', function(err) {
        // Send error to notification center with gulp-notify
        notify.onError(function(error) {
          return 'Compile Error: ' + err.message
        }).call(this, err)

        // Keep gulp from hanging on this task
        this.emit('end');
      })
      .pipe(source(src))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(rename(path.basename(src)))
  }

  this.on = function(event, cb) {
    browserified.on(event, cb)
  }
}

var mainjs  = new Bundle(paths.mainjs.src)
var indexjs = new Bundle(paths.indexjs.src)

// JS TASK
gulp.task('js',     ['mainjs', 'indexjs', 'vendorjs'])
gulp.task('js:min', ['mainjs:min', 'indexjs:min', 'vendorjs'])

gulp.task('mainjs', function() {
  function build() {
    return mainjs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.mainjs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  mainjs.on('update', build)
  return build()
})

gulp.task('mainjs:min', function() {
  return mainjs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.mainjs.dest))
})

gulp.task('indexjs', function() {
  function build() {
    return indexjs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.indexjs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  indexjs.on('update', build)
  return build()
})

gulp.task('indexjs:min', function() {
  return indexjs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.indexjs.dest))
})

// VENDOR JS TASK
gulp.task('vendorjs', function() {
  return gulp.src(paths.vendorjs.src)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.vendorjs.dest))
});

// CSS TASK
gulp.task('css', function() {
  var processors = [
    autoprefixer({
      browsers: ['last 1 version']
    }),
    mqpacker,
    csswring
  ];
  return gulp.src(paths.css.src)
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.css.dest));

});

// IMG MINIFICATION TASK
gulp.task('img-min', function() {
  return gulp.src(paths.img.src)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.img.dest));
});

// TEMPLATES TASKS
gulp.task('templates', function() {
  var templateData = {},
      options = {
        ignorePartials: true, // ignores the unknown footer2 partial in the handlebars template, defaults to false
        batch: [paths.partials]
      };
  return gulp.src(paths.templates.src + '/*')
    .pipe(handlebars(templateData, options))
    .pipe(extReplace('.html'))
    .pipe(gulp.dest(''));
});

// CLEAN TASK
gulp.task('cleancss', function(cb) {
  return del(paths.css.dest, cb)
});

gulp.task('cleanjs', function(cb) {
  return del(paths.mainjs.dest, cb)
});

gulp.task('clean', ['cleancss', 'cleanjs'])

// BROWSERSYNC TASK
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: __dirname
    }
  });
})

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch(paths.css.src, ['css'])
  gulp.watch(paths.img.src, ['img-min'])
  gulp.watch(paths.partials + '/*', ['templates'])
  gulp.watch(paths.templates.src + '/*', ['templates'])
  gulp.watch(paths.vendorjs.src, ['vendorjs'])
});

gulp.task('default', ['js', 'css', 'templates', 'watch', 'browser-sync']);
gulp.task('build',   ['js:min', 'css', 'templates']);
