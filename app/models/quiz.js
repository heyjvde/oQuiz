const Sequelize = require("sequelize");
const client = require("../database");

class Quiz extends Sequelize.Model{

};

Quiz.init({
    title: Sequelize.TEXT,
    description: Sequelize.TEXT,
    status: Sequelize.INTEGER,
},
{
    sequelize: client,
    tableName: "quizzes",
    underscored: true,
});

module.exports = Quiz;