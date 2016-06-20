var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var browserify   = require('browserify');
var buffer       = require('gulp-buffer');
var concat       = require('gulp-concat');
var csswring     = require('csswring');
var del          = require('del');
var extReplace   = require('gulp-ext-replace');
var gulp         = require('gulp');
var handlebars   = require('gulp-compile-handlebars');
var imagemin     = require('gulp-imagemin');
var merge        = require('merge-stream');
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
var htmlmin      = require('gulp-htmlmin');

var paths = {
  src:  './assets',
  dest: './static',

  sharedcss: {
    src:  [
      './assets/css/style.css',
      './assets/css/themify-icons.css',
      './assets/css/budicon.css',
      './assets/css/custom-icons.css',
      './assets/css/fa-custom-embedded.css'
    ],
    dest: './static/css'
  },
  additionalcss: {
    src:  [
      './assets/css/tufte.css',
      './assets/css/youmax_blue_custom.css',
      './assets/css/shopify.css'
    ],
    dest: './static/css'
  },
  mainjs: {
    src:  './assets/js/main.js',
    dest: './static/js'
  },
  indexjs: {
    src:  './assets/js/index.js',
    dest: './static/js'
  },
  videosjs: {
    src:  './assets/js/videos.js',
    dest: './static/js'
  },
  aboutusjs: {
    src: './assets/js/aboutus.js',
    dest: './static/js'
  },
  pressjs: {
    src: './assets/js/press.js',
    dest: './static/js'
  },
  storejs: {
    src: './assets/js/store.js',
    dest: './static/js'
  },
  careersjs: {
    src: './assets/js/careers.js',
    dest: './static/js'
  },
  faqjs: {
    src: './assets/js/faq.js',
    dest: './static/js'
  },
  shopifyjs: {
    src: './assets/js/shopify.js',
    dest: './static/js'
  },
  vendorjs: {
    src:  [
      './assets/js/vendor/jquery.min.js',
      './assets/js/vendor/bootstrap.min.js',
      './assets/js/vendor/E-v1.js',
      './assets/js/vendor/TweenMax.min.js',
      './assets/js/vendor/jquery.flexslider.js',
      './assets/js/vendor/jquery.imagesloaded.js',
      './assets/js/vendor/jquery.touchSwipe.min.js',
      './assets/js/vendor/jquery.wookmark.js',
      './assets/js/vendor/jquery.youmax.js',
      './assets/js/vendor/lightbox.min.js',
      './assets/js/vendor/magnific_popup_iframe_gallery.js',
      './assets/js/vendor/modernizr.js',
      './assets/js/vendor/parallax.js',
      './assets/js/vendor/share.js',
      './assets/js/vendor/spectragram.min.js',
      './assets/js/vendor/tabletop.js',
      './assets/js/vendor/twitterfetcher.min.js',
      './assets/js/vendor/velocity.min.js',
      './assets/js/vendor/ytplayer.min.js',
      './assets/js/vendor/canvid.js'
    ],
    dest: './static/js'
  },
  img: {
    src:  './assets/img/*',
    dest: './static/img'
  },
  templates: {
    src:  './assets/templates',
    dest: './'
  },
  partials: './assets/templates/partials'
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
var videosjs = new Bundle(paths.videosjs.src)
var aboutusjs = new Bundle(paths.aboutusjs.src)
var pressjs = new Bundle(paths.pressjs.src)
var storejs = new Bundle(paths.storejs.src)
var careersjs = new Bundle(paths.careersjs.src)
var faqjs = new Bundle(paths.faqjs.src)
var shopifyjs = new Bundle(paths.shopifyjs.src);

// JS TASK
gulp.task('js',     ['mainjs', 'indexjs', 'videosjs', 'aboutusjs', 'pressjs', 'storejs', 'careersjs', 'faqjs', 'shopifyjs', 'vendorjs'])
gulp.task('js:min', ['mainjs:min', 'indexjs:min', 'videosjs:min', 'aboutusjs:min', 'pressjs:min', 'careersjs:min', 'faqjs:min', 'storejs:min', 'shopifyjs:min', 'vendorjs'])

// MAIN JS BUILD
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

// INDEX JS BUILD
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

// VIDEOS JS BUILD
gulp.task('videosjs', function() {
  function build() {
    return videosjs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.videosjs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  videosjs.on('update', build)
  return build()
})

gulp.task('videosjs:min', function() {
  return videosjs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.videosjs.dest))
})

// ABOUTUS JS BUILD
gulp.task('aboutusjs', function() {
  function build() {
    return aboutusjs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.aboutusjs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  aboutusjs.on('update', build)
  return build()
})

gulp.task('aboutusjs:min', function() {
  return aboutusjs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.aboutusjs.dest))
})

// PRESS JS BUILD
gulp.task('pressjs', function() {
  function build() {
    return pressjs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.pressjs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  pressjs.on('update', build)
  return build()
})

gulp.task('pressjs:min', function() {
  return pressjs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.pressjs.dest))
})

// STORE JS BUILD
gulp.task('storejs', function() {
  function build() {
    return storejs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.storejs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  storejs.on('update', build)
  return build()
})

gulp.task('storejs:min', function() {
  return storejs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.storejs.dest))
})

// CAREERS JS BUILD
gulp.task('careersjs', function() {
  function build() {
    return careersjs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.careersjs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  careersjs.on('update', build)
  return build()
})

gulp.task('careersjs:min', function() {
  return careersjs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.careersjs.dest))
})

// SUPPORT JS BUILD
gulp.task('faqjs', function() {
  function build() {
    return faqjs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.faqjs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  faqjs.on('update', build)
  return build()
})

gulp.task('faqjs:min', function() {
  return faqjs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.faqjs.dest))
})

// STORE JS BUILD
gulp.task('shopifyjs', function() {
  function build() {
    return shopifyjs.bundle()
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.shopifyjs.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
  }

  faqjs.on('update', build)
  return build()
})

gulp.task('shopifyjs:min', function() {
  return shopifyjs.bundle()
    .pipe(uglify())
    .pipe(gulp.dest(paths.shopifyjs.dest))
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

  var sharedCSS = gulp.src(paths.sharedcss.src)
    .pipe(postcss(processors))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(paths.sharedcss.dest))
    .pipe(browserSync.stream());

  var additionalCSS = gulp.src(paths.additionalcss.src)
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.additionalcss.dest))
    .pipe(browserSync.stream());

  return merge(sharedCSS, additionalCSS);

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
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(''))
//    .pipe(extReplace('', '', true))
//    .pipe(gulp.dest(''));
});

// CLEAN TASK
gulp.task('cleancss', function(cb) {
  return del(paths.sharedcss.dest, cb)
});

gulp.task('cleanjs', function(cb) {
  return del(paths.mainjs.dest, cb)
});

gulp.task('clean', ['cleancss', 'cleanjs'])

// BROWSERSYNC / WATCH TASK
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: __dirname
    }
  });

  gulp.watch(paths.sharedcss.src, ['css']);
  gulp.watch(paths.additionalcss.src, ['css']);
  gulp.watch(paths.img.src, ['img-min']);
  gulp.watch(paths.partials + '/*', ['templates']);
  gulp.watch(paths.templates.src + '/*', ['templates']);
  gulp.watch(paths.vendorjs.src, ['vendorjs']);

  // since the templates task touches all html files, we can just watch one for reload
  gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('default', ['js', 'css', 'templates', 'serve']);
gulp.task('build',   ['js:min', 'css', 'templates'], process.exit);
