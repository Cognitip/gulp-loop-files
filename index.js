var gutil = require('gulp-util');
var through = require('through2');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-loop-files';

function loopFileSystem(dir, fn) {
  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
        // nothing to do
        return cb(null, file);
    }
    if (file.isStream()) {
        // file.contents is a Stream - https://nodejs.org/api/stream.html
        this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

        // or, if you can handle Streams:
        //file.contents = file.contents.pipe(...
        //return callback(null, file);
    }

    // only work on buffer
    if (file.isBuffer()) {
      var self = this

      return fn(file.contents, dir, function(response) {
        file.contents = response
        return cb(null, file);
      })
    }

    return cb(null, file); //no-op
  });

  return stream;
}

module.exports = loopFileSystem;
