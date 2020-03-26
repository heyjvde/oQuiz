const client = require("../database");

class CoreModel{
    id;
    status;
    created_at;
    updated_at;

    static tableName = "!! ERROR !!" // on défini une propriété pour connaître la table visée dans la bdd que chaque classe fille devra modifier avec la table qui correspond

    // plutôt que taper plein de paramètres les uns après les autres à chaque instance, on passe juste un objet
    constructor(obj){
        this.id = obj.status;
        this.status = obj.status;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    //? on ne les utilisera pas ici, mais à savoir: getter et setter
    // les getter et setter ne sont pas obligatoires en js, mais ils nous serviront dans d'autres langages, c'est donc bien de prendre l'habitude de les utiliser
    // ils nous permettent en plus d'ajouter des couches de sécurité (ici par exemple vérifier que id n'est pas null et value est un nombre entier)
    getId(){
        // le getter renvoie la valeur d'une propriété (ici id)
        if(!!this.id){
            return this.id;
        }else{
            return "this object doesn't have any id";
        };
    };

    setId(value){
        // le setter transforme la valeur d'une propriété (ici id)
        if(Number.isInteger(value)){
            return "value must be a number";
        }else{
            this.id = value;
        };
    };

    //! méthodes active record
    delete(callback){
        // pour accéder à la classe d'une instance, on passe par son constructeur
        const query = {
            text: `DELETE FROM "${this.constructor.tableName}" WHERE "id" = $1`,
            value: [this.id]
        };

        client.query(query, (err, result) => {
            if(err){

            }else{

            };
        });
    };

    update(callback){
        // on doit générer la requête de manière dynamique en fonction de l'objet qui appelle la méthode
        let props = []; // les propriétés qui nous intéressent
        let values = []; // les vraies valeurs
        let dollarIndex = 1; // l'index des $x
        
        // on boucle sur toutes les propriétés de l'objet qui appelle la méthode (this)
        for(let prop in this){
            // on doit ignorer les propriétés qui ne doivent pas être modifiées: on le fait avec une condition
            if(["id", "created_at", "updated_at", "tableName"].includes(prop)){
                continue;
            };
            
            // on crée une chaîne de caractère qui contient l'égalité pour chaque propriété d'une instance
            let charString = `"${prop}" = $${dollarIndex}`;
            dollarIndex++;

            // on ajoute la string au tableau props
            props.push(charString);

            // au passage, on peut remplir le tableau values pour être sûr que "props" et "values" seront dans le même ordre
            values.push(this[prop]);
        };

        // une fois les propriétés dynamiques inclues à la requête, on rajoute les propriété qui ne bougent pas
        prop.push(`"updated_at" = NOW()`);

        let text = `UPDATE "${this.constructor.tableName}" SET ${props} WHERE "id" = $${dollarIndex} RETURNING *`;

        // comme on ajoute id = $x à la fin de la requête, il faut qu'on ajoute la valeur correspondante dans values
        values.push(this.id);

        // maintenant qu'on a généré notre requête dynamique on la stock dans une query
        const query = {text, values};

        // et on exécute
        client.query(query, values, (err, result) => {
            if(err){
                callback(err, null);
            }else{
                const data = result.rows[0];
                this.updated_at = data.updated_at;

                callback(null, this);
            };
        });
    };

    insert(callback){
        let props = [];
        let values = [];
        let dollars = [];
        let dollarIndex = 1;

        for(let prop in this){
            if(["id", "created_at", "updated_at", "tableName", "status"].includes(prop)){
                continue;
            };

            props.push(`"${prop}"`);
            dollars.push("$"+dollarIndex);
            values.push(this[prop]);

            dollarIndex++;
        };

        let text = `INSERT INTO "${this.constructor.tableName}" (${props}) VALUES (${dollars} RETURNING *)`;

        const query = {text, values};

        client.query(query, values, (err, result) => {
            if(err){
                callback(err, null);
            }else{
                const data = result.rows[0];
                this.id = data.id;
                this.status = data.status;
                this.created_at = data.created_at;

                callback(null, this);
            };
        });
    };

    static getOne(id, callback){
        const query = `SELECT * FROM "${this.tableName}" WHERE "id" = $1`;
        const values = [id];

        client.query(query, values, (err, result) => {
            if(err){
                callback(err, null);
            }else{
                // this est toujours le contexte de la méthode (ce qui se trouve à gauche du point) donc quand on lance une méthode statique, on fait "this.méthode"
                // this représente directement la classe appelée, on peut donc l'utiliser comme un constructeur: new this
                const entity = new this(result.rows[0]);

                callback(null, entity);
            };
        });
    };

    static getAll(callback){
        const query = `SELECT * FROM "${this.tableName}"`;

        client.query(query, (err, result) => {
            if(err){
                callback(err, null);
            }else{
                const models = [];

                for(let row of result.rows){
                    const model = new this(row);
                    finalResult.push(user);
                };

                callback(null, models);
            };
        });
    };
};

module.exports = CoreModel;