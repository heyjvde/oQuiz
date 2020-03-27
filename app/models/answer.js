const Sequelize = require("sequelize");
const client = require("../database");

class Answer extends Sequelize.Model{

};

Answer.init({
    description: Sequelize.TEXT,
    status: Sequelize.INTEGER,
    // on ne défini pas ici les attributs qui servent à faire des associations (ici: questions_id)
},
{
    Sequelize: client,
    tableName: "answers",
    underscored: true,
});

module.exports = Answer;