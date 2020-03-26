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

/*
//* on demande toutes les instances
Level.getAll((err, levels) => {
    console.log({err, levels});
});
*/

/*
//* on demande une instance
User.getOne(3, (err, user) => {
    console.log({err, user});
});
*/

/*
//* on crée une nouvelle instance
const gordon = new User({email: "gordon@oclock.io", password: "azerty123", firstname: "Gordon", lastname: "Zola"});
/// qu'on va insérer dans la bdd
gordon.insert((err, gordon) => {
    /// avec ma const en paramètre, on peut renvoyer quelque chose en se servant des infos du level qui vient d'être créé et inséré
    console.log(err);
    console.log(gordon);
});
*/

/*
//* on met à jour une instance
Level.getOne(4, (err, level) => {
    if(err){
        console.log(err);
    };

    /// level est une instance de la classe Level, qui représente celui avec l'id 3
    /// on change son nom
    level.name = "Méga dur";

    /// et on le met à jour dans la bdd
    level.update((err, level) => {
        /// level doit être à jour
        console.log(err);
        console.log(level);
    });
});
*/

/*
//* on supprime une instance
Level.getOne(0, (err, level) => {
    level.delete((err, result) => {
        if(result){
            console.log("le level a bien été supprimé");
        }else{
            console.log("une erreur s'est produite lors de la suppression");
        };
    });
});
*/

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