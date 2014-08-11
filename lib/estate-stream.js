var ReadableStream = require('stream').Readable

var estate = require('estate')

module.exports = createEstateStream

function EstateStream(initial) {
  this.estate = estate()

  if(initial) this.estate._state = initial

  this.estate.on('data', this.push.bind(this))
}

EstateStream.prototype = Object.create(ReadableStream.prototype)

EstateStream.prototype.listen = function ES$listen(...listenArguments) {
  this.estate.listen.apply(this.estate, listenArguments)
}

EstateStream.prototype.set = function ES$set(key, value) {
  this.estate._state[key] = value

  this.estate.emit('data', this.estate._state)
}

EstateStream.prototype.remove = function ES$remove(key) {
  delete this.estate._state[key]

  this.estate.emit('data', this.estate._state)
}

function createEstateStream(initial) {
  return new EstateStream(initial)
}
