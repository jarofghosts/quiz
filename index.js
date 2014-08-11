var fs = require('fs')

var state = require('./lib/estate-stream.js')

var questions = fs.readFileSync(__dirname + '/data/questions.json', 'utf8')

questions = JSON.parse(questions)

state.set('questions', questions)
