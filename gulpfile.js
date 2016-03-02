'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

var spa = require("browser-sync-spa");

var reload = browserSync.reload;

var paths = {
    styles: {
        app: ['src/app/styles/app.scss'],
        watch: ['src/app/**/*.scss'],
        dist: 'dist/styles'
    },
    javascript: {
        app: ['src/app/**/*.js'],
        watch: ['src/app/**/*.js'],
        dist: 'dist/js'
    },
    vendor: {
        watch: ['bower_components/**/*'],
        dist: 'dist/js/libs'
    },
    images: {
        app: ['src/app/images/**/*'],
        watch: ['src/app/images/**/*'],
        dist: 'dist/images'
    },
    fonts: {
        app: ['src/app/fonts/**/*'],
        watch: ['src/app/fonts/**/*'],
        dist: 'dist/fonts'
    },
    index: {
        app: ['src/app/index.html'],
        watch: ['src/app/index.html'],
        dist: 'dist'
    },
    templates: {
        app: ['src/app/**/*.html','!app/*.html'],
        watch: ['src/app/**/*.html','!app/*.html'],
        dist: 'dist/js'
    }
};

var postProcessor = [
    require('autoprefixer')({browsers: ['last 4 version']})
];

gulp.task('scripts:lint', function () {
    return gulp.src(paths.javascript.app)
        .pipe($.eslint())
        .pipe($.eslint.format())
});

gulp.task('copy', function () {
    return gulp.src([
            'app/*',
            '!app/*.html'
        ], {dot: true})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return del(['./dist/**/*']);
});

gulp.task('styles', function () {
    return gulp.src(paths.styles.app)
        .pipe($.sourcemaps.init())
        .pipe($.plumber())
        .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
        .pipe($.postcss(postProcessor))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dist));
});

gulp.task('styles:lint', function () {
    return gulp.src(paths.styles.watch)
        .pipe($.plumber())
        .pipe($.postcss([
            require('stylelint')(),
            require('postcss-reporter')({clearMessages: true, throwError: true})
        ], {syntax: require('postcss-scss')}));
});

gulp.task('index', function () {
    return gulp.src(paths.index.app)
        .pipe(gulp.dest(paths.index.dist))
});

gulp.task('templates', function () {
    return gulp.src(paths.templates.app)
        .pipe($.plumber())
        .pipe($.angularTemplatecache({
          module: 'app',
          root: 'app'
        }))
        .pipe(gulp.dest(paths.templates.dist));
});

gulp.task('javascript', function () {
    return gulp.src(paths.javascript.app)
        .pipe($.plumber())
        .pipe($.angularFilesort())
        .pipe($.sourcemaps.init())
        .pipe($.concat('app.js'))
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(paths.javascript.dist));
});

gulp.task('vendor', function () {
    return gulp.src(mainBowerFiles())
        .pipe($.plumber())
        .pipe($.filter('**/**.js'))
        .pipe($.sourcemaps.init())
        .pipe($.concat('lib.js'))
        //.pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(paths.vendor.dist));
});

gulp.task('images', function () {
    return gulp.src(paths.images.app)
        .pipe($.plumber())
        .pipe(gulp.dest(paths.images.dist));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts.app)
        .pipe($.plumber())
        .pipe(gulp.dest(paths.fonts.dist));
});

gulp.task('watch', function () {
    browserSync.use(spa({

        selector: "[ng-app]",

        history: {
            index: '/index.html'
        }
    }));

    browserSync({
        notify: false,
        server: ['dist']
    });

    gulp.watch(paths.javascript.watch, ['javascript', reload]);
    gulp.watch(paths.vendor.watch, ['javascript', reload]);
    gulp.watch(paths.styles.watch, ['styles', reload]);
    gulp.watch(paths.templates.watch, ['templates', reload]);
    gulp.watch(paths.index.watch, ['index', reload]);
    gulp.watch(paths.images.watch, ['images', reload]);
    gulp.watch(paths.fonts.watch, ['fonts', reload]);
});

gulp.task('build', ['copy', 'index', 'templates', 'javascript', 'vendor', 'fonts', 'styles', 'images']);

gulp.task('serve', function (cb) {
    runSequence('clean',
        ['copy', 'index', 'templates', 'javascript', 'vendor', 'fonts', 'styles', 'images'],
        'watch',
        cb);
});

gulp.task('default', ['serve']);
