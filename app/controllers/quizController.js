const { Answer, Level, Question, Quiz, Tag, User } = require('../models/associations');

const quizzController = {
  quizQuestions: (req, res) => {
    const quizId = req.params.id;

    Quiz.findByPk(quizId, {
      include: [
        "author",
        "tags",
        {association: "questions", include:["possibleAnswers", "level"]}
      ]
    }).then(quiz => {
      res.render("quiz", {quiz});
    }).catch(err => {
      res.status(500).render('error', {err});
    });
  },
};

module.exports = quizzController;