var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-loop-files';

function loopFileSystem(dir, fn) {
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));
      return cb();
    }
    // only work on buffer
    if (file.isBuffer()) {
      file.contents = fn({file: file.contents, directory: dir});
      this.push(file);
      return cb();
    }
    return cb(null, file); //no-op
  });

  return stream;
}

module.exports = loopFileSystem;
