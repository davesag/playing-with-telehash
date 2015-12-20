"use strict";

const gulp     = require('gulp-help')(require('gulp'));
const mocha    = require('gulp-mocha');
const eslint   = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const gutil    = require('gulp-util');

gulp.task('default', ['help']);

gulp.task('test', 'Run the unit tests and calculates code coverage.', function(next) {
  process.env.NODE_ENV = 'test';
  // process.env.DEBUG = 'client,server';

  gulp.src(['./lib/**/*.js'])
      .pipe(istanbul())
      .pipe(istanbul.hookRequire())
      .on('finish', function() {
        gulp.src(['./tests/unit/**/*-test.js'], {read: false})
            .pipe(mocha({
              reporter: 'spec',
              ignoreLeaks: false
            }))
            .on('error', gutil.log)
            .pipe(istanbul.writeReports())
            .pipe(istanbul.enforceThresholds({ thresholds: { global: 85 }}))
            .on('end', next);
      }
    );
});

gulp.task('hint', 'Run the ESLinter', function() {
  const LINT_OPTIONS = {
    extends: 'eslint:recommended',
    ecmaFeatures: {
      modules: true
    },
    env: {
      node: true,
      es6: true,
      mocha: true
    }
  };

  return gulp.src(['./lib/**/*.js', './tests/unit/**/*.js'])
             .pipe(eslint(LINT_OPTIONS))
             .pipe(eslint.format())
             .pipe(eslint.failAfterError());
});
