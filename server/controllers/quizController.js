const Quiz = require('../models/Quiz');

exports.getQuizByTitle = async (req, res) => {
  try {
    const quizTitle = req.params.title;
    const quiz = await Quiz.findOne({ quizTitle });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz.questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
