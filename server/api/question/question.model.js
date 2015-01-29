'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
	answer: String,
	isCorrect: Boolean
});

var QuestionSchema = new Schema({
  language: String,
  level: String,
  context: String,
  question: String,
  author: String,
  answers: [AnswerSchema]
});

module.exports = mongoose.model('Question', QuestionSchema);