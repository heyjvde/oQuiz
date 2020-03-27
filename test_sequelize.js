// on require toujours les variables d'environement et les modèles nécessaires
require("dotenv").config();

// const Level = require("./app/models/level");
// const User = require("./app/models/user");
// const Answer = require("./app/models/answer");
// const Question = require("./app/models/question");
// const Quiz = require("./app/models/quiz");
// const Tag = require("./app/models/tag");

// et c'est parti pour faire des requêtes
// https://sequelize.org/master/manual/model-querying-basics.html
// on écrit plus 1 callback avec 2 paramètres, mais 2 callbacks séparés: .then() quand tout va bien, et .catch() en cas d'erreur


// https://sequelize.org/master/manual/eager-loading.html
// plutôt que faire une requête de 68415 lignes, sequelize le fait tout seul
/*
Question.findByPk(1, {include: "possibleAnswers"}).then(myQuestion => {
    console.log(myQuestion.question);

    for(let answer of myQuestion.possibleAnswers){
        console.log(" - "+answer.description);
    }
});
*/

//? avec le fichier d'associations, on peut appeler un seul modèle dans notre module
const { Quiz } = require("./app/models/associations");

Quiz.findByPk(1, {
    include: [
        "author",
        "tags",
        "questions",
    ]
}).then(quiz => {
    console.log(quiz);
});