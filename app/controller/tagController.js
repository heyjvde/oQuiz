const { Tag } = require('../models');

const tagController = {

  tagsPage: (req, res, next) => {
    // je récupère tous mes tags grâce à mon model Sequelize
    Tag.findAll().then( tags => {

      // et je passe les résultats à ma view
      res.render('tags', {tags});

    }).catch( err => {
      console.trace(err);
      res.status(500).render('error', {err});
    });
  },

  quizzesByTag: (req, res, next) => {
    // on récupère le paramètre dans l'url
    const tagId = req.params.id;

    // on cherche le tag via cet ID
    Tag.findByPk(tagId,{
      include: [
        {association: "quizzes", include: [ "author" ] }
      ]
    }).then( tag => {

      // si j'ai bien un tag, je l'affiche
      if (tag) {
        res.render('tag', {tag});
      } else {
        // sinon, 404
        next();
      }

    }).catch(err => {
      console.trace(err);
      res.status(500).render('error', {err});
    });

  }

};

module.exports = tagController;