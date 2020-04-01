const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');

const router = express.Router();

router.get("/", mainController.homePage);
router.get("/quiz/:id", quizController.quizPage);

router.get("/tags", tagController.tagsPage); 
router.get("/tag/:id", tagController.quizzesByTag);

// en tout dernier, on gère les 404 (on arrivera ici uniquement si aucune route ne correspond à l'url ou qu'un controller appelle next())
//? on utilise router.use() pour que ce soit utilisable à chaque requête
router.use(mainController.notFound);

module.exports = router;