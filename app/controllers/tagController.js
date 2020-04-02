const { Tag } = require("../models");

const tagController = {
    tagsPage: async (req, res, next) => {
        try{
            const tags = await Tag.findAll();
            res.render("tags", {tags});
        }catch(err){
            console.trace(err);
            res.status(500).render('error', {err});
        };
    },

    quizzesByTag: async (req, res, next) => {
        try{
            const tagId = req.params.id;
            const tag = await Tag.findByPk(tagId, {
                include: [{
                    association: "quizzes", 
                    include: ["tags", "author"]
                }]
            });

            res.render("tag", {tag});
        }catch(err){
            console.trace(err);
            res.status(500).render('error', {err});
        };
    },
};

module.exports = tagController;