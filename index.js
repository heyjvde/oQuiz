require("dotenv").config();

const path = require("path");
const express = require("express");
const router = require("./app/router");
const PORT = process.env.PORT || 3030;

const app = express();

app.set("views", path.join("app", "views"));
app.set("view engine", "ejs");

// on préfèrera utiliser __dirname plutôt qu'un chemin relatif
// comme selon l'os le séparateur n'est pas toujours le même, on ne peut pas utiliser "/public", on utilise donc path.join qui utilisera le séparateur approprié
app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});