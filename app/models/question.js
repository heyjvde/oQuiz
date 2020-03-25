const CoreModel = require("./coreModel");

class Question extends CoreModel{
    question;
    anecdote;
    wiki;
    status;

    constructor(obj){
        super(obj);
        
        this.question = obj.question;
        this.anecdote = obj.anecdote;
        this.wiki = obj.wiki;
        this.status = obj.status;
    };
};