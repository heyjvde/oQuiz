const { Quiz } = require('../models');

const quizController = {

  quizPage: (req, res, next) => {
    // on récupère l'id ciblé dans l'url
    const quizId = req.params.id;
    
    // on utilise le model Quiz pour aller chercher le bon quiz
    Quiz.findByPk( quizId, {
      include: [
        'author',
        'tags',
        {association: 'questions', include: ['level', 'possibleAnswers'] }
      ]
    }).then( quiz => {

      if (!quiz) {
        // si on a pas trouvé de résultat => on passe au middleware suivant
        next();
      } else {
        res.render('quiz', {quiz});
      }

    }).catch( err => {
      console.trace(err);
      res.status(500).render("error", {err});
    });

  }

};


module.exports = quizController;