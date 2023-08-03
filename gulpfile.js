// @ts-nocheck
const { src, dest, series } = require('gulp');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const minify = require('gulp-minify');
const gulpIf = require('gulp-if');
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const pxToRem = require('gulp-px2rem-converter');
const sourcemaps = require('gulp-sourcemaps');

const fileName = 'home';

let swiperCssPath = 'assets/css/min/swiper-bundle.min.css',
	swiperJsPath = 'assets/js/min/swiper-bundle.min.js',
	cssSrc = [],
	jsSrc = [];



/*
CSS
*/

cssSrc.push(
	'assets/css/normalize.css'
);

if (fileName != 'intro') {
	cssSrc.push('assets/css/min/mouse-follower.min.css');
}

if (fileName != 'contact' && fileName != 'policy'
	&& fileName != 'intro') {
	cssSrc.push(swiperCssPath);
}

cssSrc.push(
	'assets/css/common.css',
	`assets/css/${fileName}.css`
);



/*
JS
*/

if (fileName != 'contact' && fileName != 'policy') {
	jsSrc.push(
		swiperJsPath,
		'assets/js/min/parallax.min.js',
	);
}

jsSrc.push(
	'assets/js/min/gsap.min.js',
	'assets/js/smooth-scrollbar.js',
	'assets/js/min/mouse-follower.min.js',
	'assets/js/common.js'
);

jsSrc.push(
	`assets/js/${fileName}.js`
);


function css() {
	return src(cssSrc)
		.pipe(sourcemaps.init())
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
		.pipe(pxToRem())
		.pipe(clean({ compatibility: 'ie11' }))
		.pipe(concat(`${fileName}.css`))
		.pipe(rename(function (path) {
			path.basename += '.min';
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('assets/css/min/'));
}

function js() {
	return src(jsSrc)
		.pipe(sourcemaps.init())
		.pipe(minify({
			noSource: true
		}))
		.pipe(concat(`${fileName}.js`))
		.pipe(rename(function (path) {
			path.basename += '.min';
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('assets/js/min/'));
}

exports.default = series(css, js);