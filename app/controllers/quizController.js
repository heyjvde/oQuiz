const { Quiz } = require('../models/associations');

const quizzController = {
  quizPage: (req, res, next) => {
    const quizId = req.params.id;

    Quiz.findByPk(quizId, {
      include: [
        "author",
        "tags",
        {association: "questions", include:["possibleAnswers", "level"]}
      ]
    }).then(quiz => {
      // pour sequelize un id inconnu n'est pas une erreur, on doit donc ajouter une condition dans le cas où on irait à la page d'un quiz inexistant
      if(!quiz){
        next();
      }else{
        res.render("quiz", {quiz});
      };
    }).catch(err => {
      console.trace(err);
      res.status(500).render('error', {err});
    });
  },
};

module.exports = quizzController;