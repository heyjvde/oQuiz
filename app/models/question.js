const Sequelize = require("sequelize");
const client = require("../database");

class Question extends Sequelize.Model{

};

Question.init({
    question: Sequelize.TEXT,
    anecdote: Sequelize.TEXT,
    wiki: Sequelize.TEXT,
    status: Sequelize.INTEGER,
},
{
    Sequelize: client,
    tableName: "questions",
    underscored: true,
});

module.exports = Question;