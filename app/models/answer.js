const CoreModel = require("./coreModel");

class Answer extends CoreModel{
    description;

    constructor(obj){
        super(obj);
        
        this.description = obj.description;
    };
};

module.exports = Answer;