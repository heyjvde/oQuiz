//! on a renommé notre fichier associations (dans models) en index.js, comme ça on a juste à require le dossier models, et node cherchera directement l'index
// la nouvelle convention est de l'appeler du même nom que son dossier (pas recommandé pour le moment parce que pas supporté par la majorité des nodes)
const { Quiz, Tag } = require("../models");

const mainController = {
  // version sans promise
  homePage_OLD: (req, res, next) => {
        Quiz.findAll({
            include: ["author"]
          }).then(quizzes => {
            res.render("index", {quizzes});
          }).catch(err => {
            console.trace(err);
            res.status(500).render("error", {err});
          });
    },

    // on recode la méthode homePage avec une promise
    homePage: async (req, res, next) => {
      try{
        const quizzes = await Quiz.findAll({
        include: ["author"]
        });

        // on ajoute les tags à notre homePage, facile!
        const tags = await Tag.findAll();

        res.render("index", {quizzes, tags});
      }catch(err){
        console.trace(err);
        res.status(500).render("error", {err});
      };
    },

    notFound: (req, res) => {
      res.status(404).render("error", {err: "La page que vous demandez n'existe pas"});
    },
};

module.exports = mainController;