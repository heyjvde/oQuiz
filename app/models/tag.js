const CoreModel = require("./coreModel");

class Tag extends CoreModel{
    name;
    status;

    constructor(obj){
        super(obj);
        
        this.name = obj.name;
        this.status = obj.status;
    };
};