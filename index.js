require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const router = require("./app/router");
const PORT = process.env.PORT || 3030;

const app = express();

app.set("views", path.join("app", "views"));
app.set("view engine", "ejs");

// on préfèrera utiliser __dirname plutôt qu'un chemin relatif
// comme selon l'os le séparateur n'est pas toujours le même, on ne peut pas utiliser "/public", on utilise donc path.join qui utilisera le séparateur approprié
app.use(express.static(path.join(__dirname, "public")));

// AVANT LE ROUTEUR: on active le middleware pour réqupérer les données post dans req.body
app.use(express.urlencoded({extended: true}));

// toujours avant le routeur: on active le middleware qui gère les sessions
app.use(session({
  secret: "oquiz by dragons", // génère des id de session chiffrés
  resave: true, // sauvegarde la session à chaque appel même si rien n'a été modifié
  saveUninitialized: true, // sauvegarde une session même si elle est vide
  cookie: { // les options du cookie
    secure: false, // sans ça on est obligés de passer en https (et c'est dur)
    maxAge: (1000*60*60), // la durée de vie d'un cookie est en ms (1000ms = 1s)
  },
}));

// notre middleware pour transférer les info de session vers locals
const userMiddleware = require("./app/middleware/userMiddleware");
app.use(userMiddleware);

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});