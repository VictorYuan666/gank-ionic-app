var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var run = require('gulp-run');
var del = require('del');
var runSequence = require('gulp-run-sequence');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('deleteApk', function(cb) {
  del(['android-release-unsigned.apk']);
  cb();
});

gulp.task('packAndroid',['deleteApk'], function(cb) {
run('cordova build --release android').exec(cb);



});

gulp.task('copyUnsignedApk',['packAndroid'], function () {
  var stream = gulp.src('./platforms/android/build/outputs/apk/android-release-unsigned.apk')
    .pipe(gulp.dest('./'));
    return stream;
});

gulp.task('signAndroid',['copyUnsignedApk'], function(cb) {
  run('jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name -storepass qaz8650060').exec(cb);
});
gulp.task('prod', function(cb) {
    runSequence('deleteApk', 'packAndroid', 'copyUnsignedApk', 'signAndroid', cb);
});
