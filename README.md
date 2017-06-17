## gulp-loop-files

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
