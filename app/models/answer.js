const CoreModel = require("./coreModel");

class Answer extends CoreModel{
    description;
    static tableName = "answers";

    constructor(obj){
        super(obj);
        
        this.description = obj.description;
    };
};

module.exports = Answer;