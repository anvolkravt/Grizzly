const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  svgSprite = require('gulp-svg-sprite'),
  svgMin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace'),
  imagemin = require('gulp-imagemin'),
  pug = require('gulp-pug'),
  autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('sass', function() {
  return gulp
    .src('./app/static/css/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/static/css'));
});

gulp.task('pug', function() {
  return gulp
    .src('./app/html/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('./dist/html'));
});

gulp.task('images', () => {
  return gulp
    .src('./app/static/images/**/*.+(png|jpg|jpeg)')
    .pipe(
      imagemin([
        imagemin.mozjpeg({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 })
      ])
    )
    .pipe(gulp.dest('./dist/static/images'));
});

gulp.task('svg', () => {
  return gulp
    .src('./app/static/svg/**/*.svg')
    .pipe(
      svgMin({
        js2svg: {
          pretty: true
        }
      })
    )
    .pipe(
      cheerio({
        run: function($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg',
            render: {
              scss: {
                dest: '../../../css/_sprite.scss',
                template: './app/static/css/templates/_sprite_template.scss'
              }
            }
          }
        }
      })
    )
    .pipe(gulp.dest('./app/static/images/svg_sprite'));
});

gulp.task('svg-sprite-to-dist', () => {
  return gulp
    .src('./app/static/images/svg_sprite/**/*.+(svg)')
    .pipe(gulp.dest('./dist/static/images/svg_sprite'));
});

gulp.task('svg-sprite-to-dist', () => {
  return gulp
    .src('./app/static/images/svg_sprite/**/*.+(svg)')
    .pipe(gulp.dest('./dist/static/images/svg_sprite'));
});

gulp.task('svg-inline', () => {
  return gulp
    .src('./app/static/svg/inline/*.svg')
    .pipe(gulp.dest('./dist/static/images/svg_inline'));
});

gulp.task('fonts', () => {
  return gulp
    .src('./app/static/fonts/**/*.+(woff|woff2)')
    .pipe(gulp.dest('./dist/static/fonts'));
});

gulp.task('js', () => {
  return gulp
    .src('./app/static/js/**/*.js')
    .pipe(gulp.dest('./dist/static/js'));
});

gulp.task('watch', function() {
  gulp.watch('./app/static/css/*.scss', gulp.series('sass'));
  gulp.watch('./app/html/*.pug', gulp.series('pug'));
  gulp.watch('./app/static/images/**/*.+(png|jpg|jpeg)', gulp.series('images'));
  gulp.watch('./app/static/svg/**/*.svg', gulp.series('svg'));
  gulp.watch('./app/static/svg/inline/*.svg', gulp.series('svg-inline'));
  gulp.watch(
    './app/static/images/svg_sprite/**/*.+(svg)',
    gulp.series('svg-sprite-to-dist')
  );
  gulp.watch('./app/static/fonts/**/*.+(woff|woff2)', gulp.series('fonts'));
  gulp.watch('./app/static/js/**/*.js', gulp.series('js'));
});

gulp.task(
  'default',
  gulp.parallel(
    'sass',
    'pug',
    'images',
    'svg',
    'svg-sprite-to-dist',
    'svg-inline',
    'fonts',
    'js',
    'watch'
  )
);
