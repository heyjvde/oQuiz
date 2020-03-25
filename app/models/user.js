const CoreModel = require("./coreModel");

class User extends CoreModel{
    email;
    password;
    firstname;
    lastname;

    constructor(obj){
        super(obj);
        
        this.email = obj.email;
        this.password = obj.password;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
    };
};

module.exports = User;