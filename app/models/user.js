// const CoreModel = require("./coreModel");
const Sequelize = require("sequelize");
const client = require("../database");

class User extends Sequelize.Model{
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
    role: Sequelize.TEXT,
},
{
    sequelize: client,
    tableName: "app_users",
    underscored: true,
});

module.exports = User;