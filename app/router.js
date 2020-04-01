const express = require('express');
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const authController = require('./controllers/authController');

const router = express.Router();

router.get("/", mainController.homePage);
router.get("/quiz/:id", quizController.quizPage);

router.get("/tags", tagController.tagsPage); 
router.get("/tag/:id", tagController.quizzesByTag);

// plutôt que faire deux routes séparées...
router.get("/signup", authController.signupForm);
router.post("/signup", authController.signupAction);

// ...on peut en faire une seule avec deux paramètres
router.route("/login")
    .get(authController.loginForm)
    .post(authController.loginAction);

router.get("/logout", authController.logout);

// en tout dernier, on gère les 404 (on arrivera ici uniquement si aucune route ne correspond à l'url ou qu'un controller appelle next())
//? on utilise router.use() pour que ce soit utilisable à chaque requête
router.use(mainController.notFound);

module.exports = router;