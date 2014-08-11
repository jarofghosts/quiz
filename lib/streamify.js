var through = require('through2')

module.exports = streamify

function streamify(fn) {
  return through.obj(write)

  function write(data, enc, next) {
    fn(data)

    next()
  }
}
