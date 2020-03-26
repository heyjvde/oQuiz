const CoreModel = require("./coreModel");
const client = require("../database");

class Level extends CoreModel{
    name;
    static tableName = "levels";

    constructor(obj){
        super(obj);
        
        this.name = obj.name;
    };

    // première requête toute simple: on récupère tous les levels
    //! on fait de getAll une méthode statique pour pouvoir l'appeler sans avoir à créer d'instance
    static getAll(callback){
        // 1. construire la requête sql
        const query = `SELECT * FROM "levels"`;

        // 2. exécuter la requête et passer les résultats au callback
        client.query(query, (err, result) => {
            if(err){
                // en cas d'erreur on la renvoie au callback
                // un callback a toujours 2 paramètres: l'erreur en premier, puis quelque chose. comme on n'a rien à lui faire passer, on met null
                callback(err, null);
            }else{
                // sinon...
            
                // on renvoie la liste des résultats au callback
                // callback(null, result.rows);

                //? mais on veut transformer le résultat brut en une liste de levels
                // on prépare le contenant de la liste
                const finalResult = [];
                
                for (let row of result.rows){
                    // pour chaque ligne de la liste de résultat, on va créer un level (une instance de la classe Levels) avec cette ligne
                    const level = new Level(row);
                    // et on ajoute ce nouveau level dans la liste
                    finalResult.push(level);
                };

                // une fois tous les résultats transformés, on transmet la "vraie" liste de résultats au callback
                // null indique au callback qu'il n'y a pas d'erreur
                callback(null, finalResult);
            };
        });
    };
};

module.exports = Level;