var fs = require('fs')

var through = require('through2')
  , altr = require('altr')

var quizTemplate = fs.readFileSync(__dirname + '/templates/quiz.html', 'utf8')

altr.include('quiz', quizTemplate)

module.exports = altr
