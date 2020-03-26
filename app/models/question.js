const CoreModel = require("./coreModel");

class Question extends CoreModel{
    question;
    anecdote;
    wiki;
    static tableName = "questions";

    constructor(obj){
        super(obj);
        
        this.question = obj.question;
        this.anecdote = obj.anecdote;
        this.wiki = obj.wiki;
    };
};

module.exports = Question;