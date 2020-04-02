const { Quiz } = require("../models");

const quizzController = {
  quizPage: async (req, res, next) => {
    try{
      const quizId = req.params.id;
      const quiz = await Quiz.findByPk(quizId, {
        include: [
          "author",
          "tags",
          {association: "questions", include:["possibleAnswers", "level"]}
        ]
      });

      res.render("quiz", {quiz});
    }catch(err){
      console.trace(err);
      res.status(500).render('error', {err});
    };
  },
};

module.exports = quizzController;