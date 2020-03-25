const CoreModel = require("./coreModel");

class Answer extends CoreModel{
    description;
    status;

    constructor(obj){
        super(obj);
        
        this.description = obj.description;
        this.status = obj.status;
    };
};