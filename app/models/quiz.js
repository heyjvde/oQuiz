const CoreModel = require("./coreModel");

class Quiz extends CoreModel{
    title;
    description;

    constructor(obj){
        super(obj);
        
        this.title = obj.title;
        this.description = obj.description;
    };
};

module.exports = Quiz;