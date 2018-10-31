var gulp = require('gulp');
var sass = require('gulp-sass'); 
var sassGlob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');


/* Watch for file changes */
gulp.task('default', function() {
    gulp.watch(['*.scss'], ['styles']);
    gulp.watch(['*.js'], ['scripts']);
});
 
 /* Process styles */
gulp.task('styles', function () {
    return gulp
        .src(['scss/*.scss']) // Find the Sass files
        .pipe(sass.sync().on('error', sass.logError)) // Compile Sass to CSS
        .pipe(autoprefixer({ // Add vendor prefixes to CSS
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cleanCSS()) // Minify CSS
        .pipe(rename({ // Add .min to filename
            suffix: '.min'
        }))
        .pipe(gulp.dest('css')); // Save combined CSS
});

/* Process JS */
gulp.task('scripts', function() {
    // jQuery gets compiled first as every other file depends on it
    // Followed by our app init
	return gulp.src(['src/js/vendor/jquery.min.js','js/*.js','src/js/app/**/*.js','src/js/main.js'])
        .pipe(gulp.dest('dist/js')) // Save combined JS to dist
    	.pipe(uglify()) // Minify JS
        .pipe(rename({ // Add .min to filename
            suffix: '.min'
        }))
    	.pipe(gulp.dest('dist/js')); // Save minified JS
});