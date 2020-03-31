const { Answer, Level, Question, Quiz, Tag, User } = require('../models/associations');

const mainController = {
    homePage: (req, res) => {
        Quiz.findAll({
            include: ["author"]
          }).then(quizzes => {
            res.render("index", {quizzes});
          }).catch(err => {
            res.status(500).render("error", {err});
          });
    },
};

module.exports = mainController;