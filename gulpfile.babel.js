import del from 'del';
import path from 'path';
import * as isparta from 'isparta';
import babel from 'babel-core';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
const $ = plugins();

const paths = {
  lint: ['./gulpfile.babel.js', './lib/**/*.js', './test/**/*.js'],
  watch: ['./gulpfile.babel.js', './lib/**', './test/**/*.js'],
  tests: ['./test/**/*.js'],
};

gulp.task('lint', () => {
  return gulp.src(paths.lint)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('nsp', function(cb) {
  $.nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', () => {
  return gulp.src(['lib/**/*.js'], {cwd: __dirname})
    // Covering files
    .pipe($.istanbul(
      // supports es6
      {instrumenter: isparta.Instrumenter}))
    // Force `require` to return covered files
    .pipe($.istanbul.hookRequire());
});

gulp.task('test', gulp.series('pre-test', () => {
  return gulp.src(paths.tests, {cwd: __dirname})
    .pipe($.mocha())
    // Creating the reports after tests ran
    .pipe($.istanbul.writeReports());
}));

gulp.task('coveralls', () => {
  return gulp.src('coverage/lcov.info')
    .pipe($.coveralls());
});

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('babel', gulp.series(['clean'], () => {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
}));

gulp.task('prepublish', gulp.series(['nsp', 'babel']));
gulp.task('default', gulp.series(['test', 'lint', 'coveralls']));
