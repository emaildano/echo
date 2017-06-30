/* ==============
  SETUP VARIABLES
  =============== */
var devURL      = 'echo.dev';


var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');
var cssnano     = require('gulp-cssnano');
var sourcemaps  = require('gulp-sourcemaps');
var cp          = require('child_process');
var rename      = require('gulp-rename');
var argv        = require('yargs').argv;
var _if         = require('gulp-if');
var sequence    = require('run-sequence');

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


// Sass Task
gulp.task('build_sass', function () {
  return gulp.src('assets/scss/main.scss')
    .pipe( sourcemaps.init() )
      .pipe( sass().on( 'error', sass.logError ) )
      .pipe( cssnano() )
    .pipe( sourcemaps.write('.') )
    .pipe( rename( 'echo-styles.css' ) )
    .pipe( gulp.dest('./assets') )
    .pipe( _if( !production, gulp.dest('./_site/assets') ) )
    .pipe( browserSync.stream() );
});


/**
 * Wait for jekyll-build, then launch the Server
 *
 */
gulp.task('serve', ['build_sass', 'build_jekyll'], function() {
  browserSync.init({
    proxy: devURL
  });

  gulp.watch('assets/scss/**/*.scss', ['build_sass']);
  gulp.watch(['**/*.html'], ['jekyll-rebuild']);

});

gulp.task('default', function() {
  sequence(
    'build_sass',
    'build_jekyll'
  );
});

