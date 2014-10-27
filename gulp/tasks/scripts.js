var gulp = require('gulp');
var uglify = require('gulp-uglify');
var lib = require('../lib.js');
var config = require('../../gulp-config.json');
var resolveDependencies = require('gulp-resolve-dependencies');
var rename = require('gulp-rename');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var resources = require('../resources.json');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var newer = require('gulp-newer');
var util = require('util');
var gulpif = require('gulp-if');
var path = require('path');

var taskName = "Scripts task";

var notifySuccess = lib.notifySuccess(taskName);
var notifyError = lib.notifyError(taskName);
var errorHandler = lib.createErrorHandler(notifyError);

var compile = function (p, name, successMessage) {
    var paths = p.map(function (z) {
        return path.join(config.path, z);
    });

    return gulp.src(paths)
        .pipe(plumber(errorHandler))
        .pipe(resolveDependencies({ pattern: /\* @require [\s-]*(.*?\.js)/g }))
        .pipe(jshint())
        .pipe(jscs())
        .pipe(sourcemaps.init())
        .pipe(concat(name))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename({ suffix: '.min.js' }))
        .pipe(gulp.dest(config.scripts.dist))
        .pipe(gulpif(config.notifyOnSuccess, notifySuccess(successMessage)));
};

gulp.task('compile-js', function () {
    return config.bundles.filter(function (b) {
        return b.scripts != null;
    }).map(function (b) {
        return compile(b.scripts, b.name, "");
    });
});

gulp.task('scripts', ['compile-js']);