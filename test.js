// SoC: ici on va tester dataMapper (et autres?) avant d'implémenter le serveur express

// pour commencer on require les variables d'environnement et le dataMapper
require("dotenv").config();

//? dataMapper (byebye)
/*
const dataMapper = require("./app/dataMapper");

/// et on peut lancer une requête
dataMapper.getAllLevels((err, levels) => {
    console.log(err);
    console.log(levels);
});

dataMapper.getOneLevel(1, (err, level) => {
    console.log({err, level});
});
*/

//? active record
const Level = require("./app/models/level");
const User = require("./app/models/user");
const Answer = require("./app/models/answer");
const Question = require("./app/models/question");
const Quiz = require("./app/models/quiz");
const Tag = require("./app/models/tag");

/*
//* on demande toutes les instances
User.getAll((err, users) => {
    console.log({err, users});
});
*/

/*
//* on demande une instance
Question.getOne(3, (err, question) => {
    console.log({err, question});
});
*/

/*
//* on crée une nouvelle instance
const gordon = new User({
    email: "gordon@oclock.io", 
    password: "azerty123", 
    firstname: "Gordon", 
    lastname: "Zola"
});
/// qu'on va insérer dans la bdd
gordon.insert((err, gordon) => {
    /// avec ma const en paramètre, on peut renvoyer quelque chose en se servant des infos du level qui vient d'être créé et inséré
    console.log(err);
    console.log(gordon);
});
*/

/*
//* on update puis supprime une instance
User.getOne(4, (err, gordon) => {
    if(err){
        console.log(err);
    }else{
        gordon.email = "gordon@zola.com";

        gordon.update((err, gordon) => {
            console.log(err);
            console.log(gordon);
    
            gordon.delete((err, result) => {
                if(err){
                    console.log("l'utilisateur a bien été supprimé");
                }else{
                    console.log("une erreur s'est produite lors de la suppression");
                };
            });
        });
    };
});
*/


User.findBy({firstname: "Chuck", lastname: "Zola"}, (err, results) => {
    console.log(err);
    console.log(results);
});