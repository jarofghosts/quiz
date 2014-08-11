var fs = require('fs')

var through = require('through2').obj

var state = require('./lib/estate-stream')()
  , streamify = require('./lib/streamify')
  , altr = require('./lib/template')

var questions = fs.readFileSync(__dirname + '/data/questions.json', 'utf8')

questions = JSON.parse(questions)

var quiz = altr.render('quiz', {}, document.getElementById('quiz'))

state
  .pipe(through(preProcess))
  .pipe(streamify(quiz.update.bind(quiz)))

state.set('index', 0)
state.set('questions', questions)

function preProcess(data, enc, next) {
  if(!data.questions || !data.hasOwnProperty('index')) return

  this.push(data.questions[data.index])
}
