const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  q: String,
  options: [String],
  answer: Number
});

const QuizSchema = new mongoose.Schema({
  quizTitle: { type: String, required: true, unique: true },
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Quiz', QuizSchema);
