  var gulp = require('gulp'),
    concat = require('gulp-concat'),
 minifyCSS = require('gulp-minify-css');


gulp.task('default', function() {
	// CSS-MINIFY
	gulp.watch(['*.html', 'css/*.css', '!css/g.css'], function(){
		console.log('compress CSS start...');
		gulp.src(['**/*.css'])
		.pipe(minifyCSS())
		.pipe(concat('g.css'))
		.pipe(gulp.dest('css'));
		console.log('compress CSS finish...');
	});
});