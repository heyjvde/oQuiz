const CoreModel = require("./coreModel");

class User extends CoreModel{
    email;
    password;
    firstname;
    lastname;
    status;

    constructor(obj){
        super(obj);
        
        this.email = obj.email;
        this.password = obj.password;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.status = obj.status;
    };
};