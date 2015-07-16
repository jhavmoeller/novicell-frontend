var gulp = require('gulp');
var config = require('../config.js');
var plugins = require('gulp-load-plugins')();

gulp.task('watch', function () {
    plugins.livereload.listen();

    gulp.watch(config.watchScripts, ["scripts"]);
    gulp.watch(config.watchStyles, ["styles"]);
    gulp.watch(config.watchImages, ["images"]);
    gulp.watch(config.watchIcons, ["icons"]);
    gulp.watch(config.watchFonts, ["fonts"]);

    gulp.watch(config.livereloadPaths).on('change', plugins.livereload.changed);
});