const {src, dest, series} = require('gulp');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const minify = require('gulp-minify');
const gulpIf = require('gulp-if');
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const pxToRem = require('gulp-px2rem-converter');

function css() {
  return src(
  	['assets/css/normalize.css',
  	 'assets/css/common.css',
	 'assets/css/home.css'])
    // So use gulp-rename to change the extension
    .pipe(prefixer({
    	overrideBrowserslist: ['last 8 versions'],
			browsers: [
				'Android >= 4',
				'Chrome >= 20',
				'Firefox >= 24',
				'Explorer >= 11',
				'iOS >= 6',
				'Opera >= 12',
				'Safari >= 6',
			],
		}))
		.pipe(clean({compatibility: 'ie11'}) )
		.pipe(concat('main.css'))
		.pipe(rename( function (path) {
			path.basename += '-min';
		}))
    .pipe(dest('assets/css/min/'));
}

// function js() {
// 	return src('assets/js/lesson-check.js')
// 	.pipe(minify({
// 		noSource: true
// 	}))
// 	// .pipe(rename( function (path) {
// 	// 	path.basename += '-min';
// 	// }))
//   .pipe(dest('assets/js/min/'))
// }

//exports.css = css;
exports.default = series(css);