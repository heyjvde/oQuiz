const { Answer, Level, Question, Quiz, Tag, User } = require('../models/associations');

const tagController = {
    getAllTags: (req, res) => {
        Tag.findAll({

        }).then(tags => {
            res.render("tags", {tags});
        }).catch(err => {
            res.status(500).render('error', {err});
        });
    },

    getOneTag: (req, res) => {
        const tagId = req.params.id;
        Tag.findByPk(tagId, {
            include: [{
                association: "quizzes", 
                include: ["tags", "author"]
            }]
        }).then(tag => {
            res.render("tag", {tag});
        }).catch(err => {
            res.status(500).render('error', {err});
        });
    },
};

module.exports = tagController;