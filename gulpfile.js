const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('gulp-clean');

function buildLibsJS() {
  console.log('build js');
  return gulp.src([
      'src/libs/jquery/dist/jquery.min.js',
      'src/libs/slick-carousel/slick/slick.js',
      'src/libs/wow/dist/wow.js',
      'src/libs/jquery-lazy/jquery.lazy.js',
      'src/libs/fancybox/dist/jquery.fancybox.js'
      ], { allowEmpty: true })
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('src/js'));
};

function builsLibsCss() {
  console.log('build css');
  return gulp.src([
      //'src/libs/normalize-css/normalize.css',
      'src/libs/bootstrap/dist/css/bootstrap-grid.css',
      'src/libs/animate.css/animate.css',
      'src/libs/slick-carousel/slick/slick.css',
      'src/libs/slick-carousel/slick/slick-theme.css',
      'src/libs/fancybox/dist/jquery.fancybox.css'
      ], { allowEmpty: true })
      .pipe(concat('libs.css'))
      .pipe(cssnano())
      .pipe(gulp.dest('src/css'));
};

function serve (cb) {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch('src/pug/*.pug', goPug);
  gulp.watch('src/sass/*.sass', goSass);
  gulp.watch("src/*.html").on('change', browserSync.reload);
  cb();
}

function goSass () {
  return gulp.src('src/sass/style.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8']))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
}

function goPug () {
  return gulp.src('src/pug/index.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('src'))
  .pipe(browserSync.stream());
}

function cleanDist () {
  return gulp.src('dist/', {read: false})
         .pipe(del());
}

function buldDist (cb) {
  gulp.src([
    'src/css/style.css',
    'src/css/libs.css'
    ])
  .pipe(gulp.dest('dist/css'))

  gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))

  gulp.src('src/js/**/*')
  .pipe(gulp.dest('dist/js'))

  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'));

  cb();
}

exports.go = gulp.series(gulp.parallel(builsLibsCss, buildLibsJS, goPug, goSass), serve);
exports.dist = gulp.series(cleanDist, buldDist);