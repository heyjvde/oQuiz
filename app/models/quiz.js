const CoreModel = require("./coreModel");

class Quiz extends CoreModel{
    title;
    description;
    status;

    constructor(obj){
        super(obj);
        
        this.title = obj.title;
        this.description = obj.description;
        this.status = obj.status;
    };
};