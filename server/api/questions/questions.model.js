'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
	answer: String,
	isCorrect: Boolean
});

var QuestionsSchema = new Schema({
  language: String,
  level: String,
  context: String,
  question: String,
  answers: [AnswerSchema]
});

module.exports = mongoose.model('Questions', QuestionsSchema);