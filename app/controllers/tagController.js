const { Tag } = require('../models/associations');

const tagController = {
    tagsPage: (req, res, next) => {
        Tag.findAll().then(tags => {
            res.render("tags", {tags});
        }).catch(err => {
            console.trace(err);
            res.status(500).render('error', {err});
        });
    },

    quizzesByTag: (req, res, next) => {
        const tagId = req.params.id;
        Tag.findByPk(tagId, {
            include: [{
                association: "quizzes", 
                include: ["tags", "author"]
            }]
        }).then(tag => {
            if(!tag){
                next();
            }else{
                res.render("tag", {tag});
            };
        }).catch(err => {
            console.trace(err);
            res.status(500).render('error', {err});
        });
    },
};

module.exports = tagController;