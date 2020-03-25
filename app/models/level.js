const CoreModel = require("./coreModel");

class Level extends CoreModel{
    name;
    status;

    constructor(obj){
        super(obj);
        
        this.name = obj.name;
        this.status = obj.status;
    };
};