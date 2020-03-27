const Sequelize = require("sequelize");
const client = require("../database");

class Tag extends Sequelize.Model{

};

Tag.init({
    name: Sequelize.TEXT,
    status: Sequelize.INTEGER,
},
{
    Sequelize: client,
    tableName: "tags",
    underscored: true,
});

module.exports = Tag;