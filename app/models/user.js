const CoreModel = require("./coreModel");
const client = require("../database");

class User extends CoreModel{
    email;
    password;
    firstname;
    lastname;
    tableName = "app_users";

    constructor(obj){
        super(obj);
        
        this.email = obj.email;
        this.password = obj.password;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
    };

    //? méthodes active record

    // on récupère tous les users
    static getAll(callback){
        const query = `SELECT * FROM "app_users"`;

        client.query(query, (err, result) => {
            if(err){
                callback(err, null);
            }else{
                const users = [];

                for(let row of result.rows){
                    const user = new User(row);
                    finalResult.push(user);
                };

                callback(null, users);
            };
        });
    };

    // on récupère un user
    static getOne(id, callback){
        const query = `SELECT * FROM "app_users" WHERE "id" = $1`;
        const values = [id];

        client.query(query, values, (err, result) => {
            if(err){
                callback(err, null);
            }else{
                const user = new User(result.rows[0]);

                callback(null, user);
            };
        });
    };

    // on insère un user
    insert(callback){
        const query = `INSERT INTO "app_users" ("email", "password", "firstname", "lastname") VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [this.email, this.password, this.firstname, this.lastname];

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

    // on update un user
    update(callback){
        const query = `UPDATE "app_users" SET "email" = $1, "password" = $2, "firstname" = $3, "lastname" = $4, "status" = $5, "updated_at" = NOW() WHERE "id" = $6 RETURNING *`;
        const values = [this.email, this.password, this.firstname, this.lastname, this.status, this.id];

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
};

module.exports = User;