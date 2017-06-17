## gulp-loop-files

[![Greenkeeper badge](https://badges.greenkeeper.io/Cognitip/gulp-loop-files.svg?token=1349c44590128c1247bd6385ebb7a7066c8393221fc80f4913ebd04c09b1e9a3&ts=1497716210154)](https://greenkeeper.io/)

A [Gulp](http://gulpjs.com) task for looping through a gulp project and calling a task on each item. Inspired by gulp-inline-image-html.

### Usage

```javascript
var gulp = require('gulp');
var loop = require('gulp-loop-files');

gulp.task('default', function () {
  gulp.src('src/**/*.html')
    .pipe(loop('src', processTask))  // takes in the directory to use as the root when looking for images
    .pipe(gulp.dest('dest/'));
})
```
