// SoC: dans ce fichier on va définir toutes les associations entre les modèles
// https://sequelize.org/v5/manual/associations.html

//? 1. on require tous les modèles
const Level = require("./level");
const User = require("./user");
const Answer = require("./answer");
const Question = require("./question");
const Quiz = require("./quiz");
const Tag = require("./tag");

//? 2. on défini toutes les associations
// comme notre foreignKey ne porte pas le nom de la classe qui l'utilise, on lui donne en option avec un alias

//* quiz <-> user
Quiz.belongsTo(User, {
    foreignKey: "app_users_id",
    as: "author",
});

User.hasMany(Quiz, {
    foreignKey: "app_users_id",
    as: "writtenQuizzes",
});

//* quiz <-> question
Quiz.hasMany(Question, {
    foreignKey: "quizzes_id",
    as: "questions",
});

Question.belongsTo(Quiz, {
    foreignKey: "quizzes_id",
    as: "quiz",
});

//* question <-> level
Question.belongsTo(Level, {
    foreignKey: "levels_id",
    as: "level",
});

Level.hasMany(Question, {
    foreignKey: "levels_id",
    as: "questions",
});

//* question <-> answer (les réponses possibles)
Question.hasMany(Answer, {
    foreignKey: "questions_id",
    as: "possibleAnswers",
});

Answer.belongsTo(Question, {
    foreignKey: "questions_id",
    as: "question",
});

//* question <-> answer (la bonne réponse)
// on va utiliser belongsTo() pour des raisons d'emplacement
Question.belongsTo(Answer, {
    foreignKey: "answers_id",
    as: "goodAnswer",
});

//* quiz <-> tag
// belongsToMany a des paramètres qu'on doit obligatoirement lui donner
Quiz.belongsToMany(Tag, {
    through: "quizzes_has_tags", // on le fait passer par la table de liaison
    foreignKey: "quizzes_id", // la clé source à appeler dans la table de liaison
    otherKey: "tags_id", // la clé cible à appeler dans la table de liaison
    as: "tags",
    timestamps: false, // si on ne le précise pas, sequelize va essayer de mettre des timestamps dans la table de liaison
});

Tag.belongsToMany(Quiz, {
    through: "quizzes_has_tags",
    foreignKey: "tags_id",
    otherKey: "quizzes_id",
    as: "quizzes",
    timestamps: false,
});

//? 3. réexporter tout ça dans un module
module.exports = {
    Level,
    User,
    Answer,
    Question,
    Quiz,
    Tag,
};