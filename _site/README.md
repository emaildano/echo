# Echo: The Style Guide Sherpa
This Style Guide is built with Jekyll and has development workflows built with Gulp.


## Files

### Build Files
Build files are located in `./_site`

### Development Files
Files are divided by their section types and prepended with `_echo-` (i.e. - elements from the Module section are in `_echo-modules`).

### Asset Files
Sass files are named in similar fashion and organization to corresponding `.html` files. All `.scss` files relevant to the style guide are located in `./assets/scss/style-guide`. Files are compiled to `./assets/css/styles.css`.

The style guide js file can be found at `./assets/js/main.js` and compiles to `./assets/js/build/main.js`.

Images can be found in `./assets/img`, and svg files can be found in `_includes/_svg`.


## Local Development

Install [Jekyll](https://jekyllrb.com/) (`gem install jekyll bundler`). Install [Gulp](https://gulpjs.com/) globally (install NPM if needed first, then run `npm install gulp-cli -g`).
Run `npm install` in the base directory of this project.

To spin up a local server:
- Setup local server to point to `./_site`
- Edit the `devURL` to match the local development domain (if a proxy is not needed, delete line 66: `proxy: devURL` in gulpfile.js to run on localhost:3000).
- Run `gulp serve` and BrowserSync and watch tasks will run.

The default `gulp` task can be ran with a production flag to uglify js and minify css: `gulp --production`.

## Questions?
Contact sbaer@j2made.com