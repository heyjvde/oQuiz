const { Quiz } = require('../models/associations');

const mainController = {
    homePage: (req, res, next) => {
        Quiz.findAll({
            include: ["author"]
          }).then(quizzes => {
            res.render("index", {quizzes});
          }).catch(err => {
            console.trace(err);
            res.status(500).render("error", {err});
          });
    },

    notFound: (req, res) => {
      res.status(404).render("error", {err: "La page que vous demandez n'existe pas"});
    },
};

module.exports = mainController;