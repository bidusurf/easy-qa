var fs = require('fs');
var transform = require('stream-transform');
var request = require('request');

var output_questions = fs.createWriteStream('info_job_perguntas.csv'/*, {flags: "a"}*/);
output_questions.write('idIdioma;idPergunta;Nivel;Competencia;Pergunta\n');
var output_answers = fs.createWriteStream('info_job_respostas.csv'/*, {flags: "a"}*/);
output_answers.write('idPergunta;idResposta;Certa;Column1\n');
var input = request({ method: 'GET'
    , uri: 'http://localhost:9000/api/questions/'
    , headers: { 'content-type': 'application/json'}
    , json: true});

var transformer = transform(function(response){
  questions = JSON.parse(response.toString());
  var questions_lines = [];
  var answers_lines = [];
  for (var i = 0; i < questions.length; i++) {
    question = questions[i];
    var question_line = [];
    question_line.push(question.language);
    question_line.push(question.info_job_id);
    question_line.push(question.level);
    question_line.push(question.context);
    question_line.push(question.question);
    questions_lines.push(question_line.join(';'));
    var answers = [];
    for (var j = 0; j < question.answers.length; j++) {
      var answer_line = [];
      answer = question.answers[j];
      answer_line.push(question.info_job_id);
      answer_line.push((question.info_job_id -1) * 4 + answer.order);
      answer_line.push(answer.isCorrect ? "Sim" : "Nao");
      answer_line.push(answer.answer);
      answers[answer.order-1] = answer_line.join(';');
    }
    answers_lines.push(answers.join('\n'));
  }
  // console.log(questions_lines);
  output_questions.write(questions_lines.join('\n'));
  output_answers.write(answers_lines.join('\n'));
});

input.pipe(transformer);
// input.pipe(transformer).pipe(process.stdout);
// input.pipe(transformer);
// input.pipe(process.stdout);
