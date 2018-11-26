var gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		sass = require('gulp-sass'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber');

gulp.task('copy', function() {
	gulp.src('./app/index.html')
			.pipe(gulp.dest('./dist'));
});

gulp.task('server', ['sass'], function() {
	browserSync.init({
		server: {
			baseDir: './app/'
		}
	});
	gulp.watch(['./app/**/*.html']).on('change', browserSync.reload);
	gulp.watch('./app/sass/**/*.sass', ['sass']);
});

gulp.task('sass', function() {
	return gulp.src('./app/sass/**/*.sass')
						 .pipe(plumber({
						 	errorHandler: notify.onError(function(err) {
						 		return {
						 			title: 'Styles',
						 			message: err.message
						 		}
						 	})
						 }))
						 .pipe(sass({
						 		outputStyle: 'expanded'
						 	}))
						 .pipe(gulp.dest('./app/css'))
						 .pipe(browserSync.stream());
});

gulp.task('default', ['server']);