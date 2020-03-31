require("dotenv").config();

const express = require("express");
const router = require("./app/router");

const PORT = process.env.PORT || 3030;

const app = express();

app.set("views", "app/views");
app.set("view engine", "ejs");

app.use(router);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ...`);
});