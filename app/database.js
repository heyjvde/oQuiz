// SoC: ici on va gérer la connexion aux bdd

// on require le module pour se connecter, et on instancie un Client qui représente la connection à la bdd

//? première version: 
// const pg = require("pg");
// const client = new Client(process.env.PG_URL);

//? deuxième version:
// on déstructure le module pg pour ne récupérer que la classe Client
const { Client } = require("pg");
const client = new Client(process.env.PG_URL);

// on connecte le client
client.connect();

// on exporte le client déjà connecté
module.exports = client;