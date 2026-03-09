const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/:title', quizController.getQuizByTitle);

module.exports = router;
