const express = require("express");
const mainController = require("./controllers/mainController");
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const authController = require("./controllers/authController");
const adminController = require("./controllers/adminController");

// on va aussi appeler nos middlewares de vérification de connection et de rôle
const userConnectMiddleware = require("./middleware/userConnectMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
// notre middleware pour transférer les info de session vers locals
const userMiddleware = require("./middleware/userMiddleware");

const router = express.Router();

router.use(userMiddleware);

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

// avant d'appeler le module, on précise les middlewares à utiliser avec!! magie!! (on peut en mettre autant qu'on veut)
router.get("/admin", userConnectMiddleware, adminMiddleware, adminController.adminPage);

// router.get("/profile", userConnectMiddleware, userController.profilePage);

// en tout dernier, on gère les 404 (on arrivera ici uniquement si aucune route ne correspond à l'url ou qu'un controller appelle next())
//? on utilise router.use() pour que ce soit utilisable à chaque requête
router.use(mainController.notFound);

module.exports = router;