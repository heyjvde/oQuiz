const CoreModel = require("./coreModel");
const client = require("../database");

class Level extends CoreModel{
    name;
    tableName = "levels";

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

    // maintenant on va récupérer un level
    static getOne(id, callback){
        // créer la requête
        const query = `SELECT * FROM "levels" WHERE "id" = $1`;
        const values = [id];

        // exécuter la requête
        client.query(query, values, (err, result) => {
            if(err){
              callback(err, null);
            }else{
                // transformer la requête
                const level = new Level(result.rows[0]);
                // version longue:
                // const obj = result.rows[0];
                // const level = new Level(obj);

                callback(null, level);
            };
        });
    };

    // on veut pouvoir insérer l'instance qui l'appelle (this) dans la bdd
    insert(callback){
        const query = `INSERT INTO "levels" ("name") VALUES ($1) RETURNING *`; // RETURNING permet de renvoyer la ou les lignes insérées
        const values = [this.name];

        client.query(query, values, (err, result) => {
            if(err){
                callback(err, null);
            }else{
                // grâce à RETURNING on a récupéré les lignes insérées dans result.rows
                // et on va les utiliser pour mettre à jour les informations contenues dans this
                const data = result.rows[0];
                this.id = data.id;
                this.status = data.status;
                this.created_at = data.created_at;
                this.updated_at = data.updated_at;

                // on envoie this dans le callback pour pouvoir utiliser les informations mises à jour
                callback(null, this);
            };
        });
    };

    // on veut pouvoir mettre à jour les données de l'instance courante
    update(callback){
        const query = `UPDATE "levels" SET "name" = $1, "status" = $2, "updated_at" = NOW() WHERE "id" = $3 RETURNING *`;
        const values = [this.name, this.status, this.id];

        client.query(query, values, (err, result) => {
            if(err){
                callback(err, null);
            }else{
                // on récupère les infos grâce à RETURNING
                const data = result.rows[0];
                this.updated_at = data.updated_at;

                callback(null, this);
            };
        });
    };
};

module.exports = Level;