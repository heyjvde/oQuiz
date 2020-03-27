// const CoreModel = require("./coreModel");
const Sequelize = require("sequelize");
const client = require("../database");

class User extends Sequelize.Model{
    email;
    password;
    firstname;
    lastname;

};

User.init({
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    firstname: Sequelize.TEXT,
    lastname: Sequelize.TEXT,
    status: Sequelize.INTEGER,
},
{
    Sequelize: client,
    tableName: "app_users",
    underscored: true,
});

module.exports = User;