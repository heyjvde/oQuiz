// const CoreModel = require("./coreModel");
const Sequelize = require("sequelize");
const client = require("../database");

// on définit une classe qui hérite de la classe Model prédéfinie dans le module Sequelize
class Level extends Sequelize.Model{
    /* avant sequelize
    name;
    static tableName = "levels";

    constructor(obj){
        super(obj);
        
        this.name = obj.name;
    };
    */
};

// on DOIT appeler la méthode .init() qui passe 2 objets
// https://sequelize.org/v5/manual/models-definition.html
Level.init({
    // dans le 1er objet on défini les propriétés du modèle (les colones de la table)
    //* pas besoin de déclarer "id" ni les timestamps "created_at" et "updated_at", sequelize le fait tout seul
    name: Sequelize.STRING, // une propriété "name" qui est du type "string"
    status: Sequelize.INTEGER,
},
{
    // dans le 2ème objet passe les options de connexion (la bdd active, le nom de la table, etc)
    // https://sequelize.org/v5/manual/models-definition.html#configuration
    //* seul paramètre OBLIGATOIRE: la connexion à la bdd
    sequelize: client,

    // si on ne passe rien d'autre, sequelize va déduire les noms de tables, c'est pratique mais ici nos tables ne portent pas exactement les noms de leurs classes
    // https://sequelize.org/master/manual/model-basics.html
    tableName: "levels",

    // les timestamps "created_at" et "updated_at" sont créés automatiquement, mais on les a écrits en snake_case alors que sequelize les écrit en camelCase
    // https://sequelize.org/v5/manual/models-definition.html#timestamps
    underscored: true,
});

module.exports = Level;