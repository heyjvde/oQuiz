const CoreModel = require("./coreModel");
const client = require("../database");

class Level extends CoreModel{
    name;
    static tableName = "levels";

    constructor(obj){
        super(obj);
        
        this.name = obj.name;
    };
};

module.exports = Level;