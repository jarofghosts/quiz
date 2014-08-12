var fs = require('fs')

var events = require('dom-event-stream')
  , values = require('dom-value-stream')
  , through = require('through2').obj
  , extend = require('xtend')

var state = require('./lib/estate-stream')()
  , streamify = require('./lib/streamify')
  , altr = require('./lib/template')

var questions = fs.readFileSync(__dirname + '/data/questions.json', 'utf8')
  , quizEl = document.getElementById('quiz')
  , index = 0

var answerStream
  , nextStream
  , quiz

questions = JSON.parse(questions)

quiz = altr.render('quiz', {}, quizEl)

state.set('index', index)
state.set('questions', questions)

answerStream = events(quizEl.querySelector('[rel=answers]'), 'change')
  .pipe(values())

nextStream = events(quizEl.querySelector('[name=submit]'), 'click')
  .pipe(through(validateNext))

state.listen(answerStream, 'data', ['currentAnswer'])
state.listen(nextStream, 'data', ['index', 'currentAnswer'])

state
  .pipe(through(preProcess))
  .pipe(streamify(quiz.update.bind(quiz)))

function preProcess(data, enc, next) {
  if(!data.questions || !data.hasOwnProperty('index')) return

  var context = extend(data, {currentQuestion: data.questions[data.index]})
  console.log(context)

  this.push(context)
}

function validateNext(data, enc, next) {
  if(data.target.getAttribute('disabled') === 'true') return

  this.push(++index)
}
