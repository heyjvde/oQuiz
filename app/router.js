const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');

const router = express.Router();

router.get("/", mainController.homePage );
router.get("/quizz/:id", quizController.quizQuestions);

router.get("/tags", tagController.getAllTags); 
router.get("/tag/:id", tagController.getOneTag); 

module.exports = router;