// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var connect = require('gulp-connect');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var clean = require('gulp-clean');
var config = {
    SCRIPTS: [
        './app/config/string.config.js',
        './app/common/interceptors/400handlers.config.js',
        './app/common/codePush/LiveDeployService.js',
        //here

        './app/src/**/*.js',

        './app/common/checkToken/CheckTokenResource.js',
        './app/common/checkToken/CheckTokenService.js',
        './app/common/interceptors/400handlers.js',
        './app/common/interceptors/400handlers.service.js',
        './app/common/inputNumberValidator/inputNumberValidator.js',
        './app/common/inputNumberValidator/regexp.config.js',
        './app/common/checkConnection/CheckConnectionService.js',
        './app/common/loader/LoaderService.js',
        './app/common/ionicPopupWrapper/ionicPopupWrapper.service.js',

        './app/app.js'
    ],
    BOWER_SCRIPTS: [
        "./bower_components/angular/angular.js",
        "./bower_components/angular-resource/angular-resource.js",
        "./bower_components/angular-cookies/angular-cookies.js",
        "./bower_components/angular-sanitize/angular-sanitize.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.js",
        "./bower_components/jquery/dist/jquery.js",
        "./bower_components/moment/min/moment-with-locales.js",
        "./bower_components/ionic/js/ionic.bundle.js",
        "./bower_components/angular-local-storage/dist/angular-local-storage.js",
        "./bower_components/ngCordova/dist/ng-cordova.js",
        "./bower_components/ngCordova/dist/ng-cordova-mocks.js",
        "./bower_components/angular-messages/angular-messages.js",
        "./bower_components/ion-autocomplete/dist/ion-autocomplete.js",
        "./bower_components/lodash/dist/lodash.js"
    ],
    BOWER_MIN_SCRIPTS: [
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-resource/angular-resource.min.js",
        "./bower_components/angular-cookies/angular-cookies.min.js",
        "./bower_components/angular-sanitize/angular-sanitize.min.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "./bower_components/jquery/dist/jquery.min.js",
        "./bower_components/moment/min/moment-with-locales.min.js",
        "./bower_components/ionic/js/ionic.bundle.min.js",
        "./bower_components/angular-local-storage/dist/angular-local-storage.min.js",
        "./bower_components/ngCordova/dist/ng-cordova.min.js",
        "./bower_components/ngCordova/dist/ng-cordova-mocks.min.js",
        "./bower_components/angular-messages/angular-messages.min.js",
        "./bower_components/ion-autocomplete/dist/ion-autocomplete.min.js",
        "./bower_components/lodash/dist/lodash.min.js"
    ],
    BOWER_CSS: [
        "./bower_components/ionic/css/ionic.css",
        "./bower_components/ion-autocomplete/dist/ion-autocomplete.css"
    ],
    BOWER_MIN_CSS: [
        "./bower_components/ionic/css/ionic.min.css",
        "./bower_components/ion-autocomplete/dist/ion-autocomplete.min.css"
    ],
    BOWER_FONTS: [
        "./bower_components/ionic/fonts/*.*",
        "./bower_components/material-design-icons/iconfont/*.*"
    ]
};

// Concatenate Files
gulp.task('scripts_loc', function () {
    var src = config.SCRIPTS;
    src.push('./app/config/api/local.config.js');
    return gulp.src(src)
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./www/assets/js'));
});

gulp.task('html', function () {
    return gulp.src(['!./app/index.html',
        './app/**/*.html'])
        .pipe(templateCache('templates.js', {standalone: true}))
        .pipe(gulp.dest('./www/assets/js'));
});
gulp.task('copy_index', function () {
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./www'));
});
gulp.task('copy-config-xml', function () {
    gulp.src('./config.xml')
        .pipe(gulp.dest('./www'));
});
gulp.task('css', function () {
    gulp.src(['./app/**/*.css'])
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./www/assets/css'));
});
gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
        .pipe(gulp.dest('./www/assets/img'));
});

//watch changes and rebuild
gulp.task('watch', function () {
    gulp.watch([
        'www/**/*.html',
        'www/**/*.js',
        'www/**/*.css'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(connect.reload());
    });
    gulp.watch(['./app/**/*.js'], ['scripts_loc']);
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch('./app/index.html', ['copy_index']);
    gulp.watch('./app/**/*.css', ['css']);
});
gulp.task('copy-assets', function () {
    gulp.src('./assets/fonts/**/*.*')
        .pipe(gulp.dest('./www/assets/fonts'));
    gulp.src('./resources/**/*.*')
        .pipe(gulp.dest('./www/'));
    gulp.src('./assets/images/**/*.*')
        .pipe(gulp.dest('./www/assets/images'));
});

gulp.task('BOWER', function () {
    gulp.src(config.BOWER_SCRIPTS)
        .pipe(concat('bower-components.min.js'))
        .pipe(gulp.dest('./www/assets/js'));
    gulp.src(config.BOWER_CSS)
        .pipe(concat('bower-components.min.css'))
        .pipe(gulp.dest('./www/assets/css'));
    gulp.src(config.BOWER_FONTS)
        .pipe(gulp.dest('./www/assets/fonts'));
});

gulp.task('BOWER_MIN', function () {
    gulp.src(config.BOWER_MIN_SCRIPTS)
        .pipe(concat('bower-components.min.js'))
        .pipe(gulp.dest('./www/assets/js'));
    gulp.src(config.BOWER_MIN_CSS)
        .pipe(concat('bower-components.min.css'))
        .pipe(gulp.dest('./www/assets/css'));
    gulp.src(config.BOWER_FONTS)
        .pipe(gulp.dest('./www/assets/fonts'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'www',
        port: 9000,
        livereload: true
    });
});

gulp.task('clean', function () {
    return gulp.src('./www', {read: false})
        .pipe(clean())
});

// Default Task
gulp.task('default', ['connect', 'scripts_loc', 'html', 'copy_index', 'copy-config-xml', 'css', 'images', 'BOWER', 'copy-assets', 'watch']);
gulp.task('production', ['scripts_loc', 'html', 'copy_index', 'copy-config-xml', 'css', 'images', 'BOWER_MIN', 'copy-assets']);
