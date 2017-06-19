var cheerio = require('cheerio')
var path = require('path')
var url = require('url')
var sharp = require('sharp')
var through = require('through2')

var gutil = require('gulp-util')
var PluginError = gutil.PluginError

var self = this;

const contentTypes = {
  ".png": "image/png",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
}

function inliner(html, base, res) {
  let dom = cheerio.load(String(html)) // Convert input html into a cheerio object
  let promises = []
  let imgs = dom('img')

  imgs.each(function(_idx, el) {
    el = dom(el) // Convert string 'el' to cheerio object
    var src = el.attr('src') // select the src of image
    if (src && isLocal(src)) {
      promises.push(encodeImage(src, el, base))
    }
  })

  Promise.all(promises).then(data => {
  })
  .catch(err => {
    console.error('Promise all inliner: ('+err+') .');
  })
  .then(data => {
    res(new Buffer(dom.html({decodeEntities: false})))
  })

}

function encodeImage(src, el, base) {
  base = base || process.cwd()
  const loc = path.join(base, src)
  const extension = path.extname(loc)
  const dir = path.dirname(src)

  return new Promise(function (resolve, reject) {
    return resizeImage(loc)
      .then(function(small) {
        return toBase64(extension, small)
      })
      .then(function(base64) {
        resolve(
          replaceImage(el, base64, src)
        )
      })
      .catch(function(err) {
        console.error('Encode image error: ('+err+') .')
      })
  })
}

function resizeImage(src) {
  console.log(src)
  var image = sharp(src)

  return new Promise(function (resolve, reject) {
      return image
        .metadata()
        .then(function(metadata) {
          return image
            .resize(14) // resize to 16px width and auto height
            .toBuffer()
        })
        .then(function(image) {
          resolve(image)
        })
        .catch(function(err) {
          console.error('Resize image error: ('+err+') .')
        })
  })
}

function toBase64(extension, data) {
  return 'data:' + contentTypes[extension] + ';base64,' + data.toString('base64');
}

function isLocal(href) {
  return href && !url.parse(href).hostname;
}

function replaceImage(el, base64, src) {
  el.attr('src', base64)
  el.attr('data-CogitipLoad-src', src)
}

module.exports = inliner;
