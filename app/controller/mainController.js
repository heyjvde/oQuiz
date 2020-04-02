const { Quiz, Tag } = require('../models');

const mainController = {

  homePage_OLD_VERSION: (req, res, next) => {
    // console.log(req.session);
    // on va chercher tous les quizzes dans la DB...
    Quiz.findAll({
      include: ['author']
    }).then( quizzes => {
      // ... si tout est ok, je render ma view
      // console.log(quizzes);
      Tag.findAll().then( tags => {
        res.render('index', {quizzes, tags});
      });

    }).catch( err => {
      // ... si j'ai une erreur, on affiche une view "erreur"
      console.trace(err);
      res.status(500).render('error', {err});
    });
  },

  homePage: async (req, res, next) => {
    try {
      const quizzes = await Quiz.findAll({
        include: ['author']
      });
      const tags = await Tag.findAll();

      res.render('index', {quizzes, tags});
      
    } catch (error) {
      console.trace(err);
      res.status(500).render('error', {err});
    }
  },

  notFound: (req, res) => {
    res.status(404).render('error', {
      err: "La page que vous demandez n'existe pas"
    });
  }

};

module.exports = mainController;