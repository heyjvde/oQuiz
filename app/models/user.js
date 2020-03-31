// const CoreModel = require("./coreModel");
const Sequelize = require("sequelize");
const client = require("../database");

class User extends Sequelize.Model{
    email;
    password;
    firstname;
    lastname;

    getFullName() {
        return this.firstname+" "+this.lastname;
    };
};

User.init({
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    firstname: Sequelize.TEXT,
    lastname: Sequelize.TEXT,
    status: Sequelize.INTEGER,
},
{
    sequelize: client,
    tableName: "app_users",
    underscored: true,
});

module.exports = User;