const { Client } = require("pg");
const client = new Client("postgresql://oquiz:oquiz@localhost:5432/oquiz");

client.connect();