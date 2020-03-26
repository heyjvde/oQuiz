const CoreModel = require("./coreModel");
const client = require("../database");

class User extends CoreModel{
    email;
    password;
    firstname;
    lastname;
    static tableName = "app_users";

    constructor(obj){
        super(obj);
        
        this.email = obj.email;
        this.password = obj.password;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
    };
};

module.exports = User;