/* ==============
  SETUP VARIABLES
  =============== */
var devURL      = 'pennretailstyleguide.dev';
var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var cssnano     = require('gulp-cssnano');
var sourcemaps  = require('gulp-sourcemaps');
var cp          = require('child_process');
var rename      = require('gulp-rename');
var argv        = require('yargs').argv;
var _if         = require('gulp-if');
var sequence    = require('run-sequence');
var jshint      = require('gulp-jshint');
var uglify      = require('gulp-uglify');

var production  = argv.production;
var jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages    = {
  jekyllBuild: '<span style ="color: grey">Running:</span> $ jekyll build'
};



/**
 * Build the Jekyll Site
 * https://github.com/shakyShane/jekyll-gulp-sass-browser-sync/blob/master/gulpfile.js
 *
 */
gulp.task('build_jekyll', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( jekyll , ['build'], {stdio: 'inherit'}).on('close', done);
});



/**
 * Rebuild Jekyll & do page reload
 * https://github.com/shakyShane/jekyll-gulp-sass-browser-sync/blob/master/gulpfile.js
 *
 */
gulp.task('jekyll-rebuild', ['build_jekyll'], function () {
  browserSync.reload();
});



/**
 * Sass Theme Task
 *
 */
gulp.task('build_sass_theme', function () {
  return gulp.src('assets/scss/echo-theme-main.scss')
    .pipe( sourcemaps.init() )
      .pipe( sass().on( 'error', sass.logError ) )
      .pipe( cssnano() )
    .pipe( sourcemaps.write('.') )
    .pipe( rename( 'echo-theme.css' ) )
    .pipe( gulp.dest('./assets/css') )
    .pipe( _if( !production, gulp.dest('./_site/assets/css') ) )
    .pipe( browserSync.stream() );
});



/**
 * Sass Main Task
 *
 */
gulp.task('build_sass', function () {
  return gulp.src('assets/scss/style-guide-main.scss')
    .pipe( sourcemaps.init() )
      .pipe( sass().on( 'error', sass.logError ) )
      .pipe( cssnano() )
      .pipe( rename( 'styles.css' ) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./assets/css') )
    .pipe( _if( !production, gulp.dest('./_site/assets/css') ) )
    .pipe( browserSync.stream() );
});



/**
 * JS Hint
 *
 */
gulp.task('jshint', function() {
  return gulp.src('assets/js/*.js')
    .pipe( _if( !production, plumber() ) )
    .pipe( jshint() )
    .pipe( jshint.reporter('jshint-stylish-source') );
});



/**
 * JS Main Task
 *
 */
gulp.task('build_js', ['jshint'], function(){
  return gulp.src('assets/js/*.js')
    .pipe( _if( !production, plumber() ) )
    .pipe( _if( production, uglify() ) )
    .pipe( gulp.dest( './assets/js/build' ) )
    .pipe( _if( !production, gulp.dest('./_site/assets/js/build') ) )
    .pipe( browserSync.reload({stream: true}) );
});

/**
 * JS Watch Task
 *
 */
 gulp.task('watch_js', ['build_js'], browserSync.reload);



/**
 * Wait for jekyll-build, then launch the Server
 *
 */
gulp.task('serve', ['build_sass', 'build_js', 'build_jekyll'], function() {
  browserSync.init({
    proxy: devURL
  });

  gulp.watch('assets/scss/**/*.scss', ['build_sass', 'build_sass_theme']);
  gulp.watch('assets/js/**/*.js', ['build_js']);
  gulp.watch(['**/*.html', '!_site/**/*.html'], ['jekyll-rebuild']);

});

gulp.task('default', function() {
  sequence(
    'build_sass_theme',
    'build_sass',
    'build_js',
    'build_jekyll'
  );
});

