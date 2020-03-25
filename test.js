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

//* on demande tous les levels
Level.getAll((err, levels) => {
    console.log({err, levels});
});

//* on demande un level
Level.getOne((err, level) => {
    console.log({err, level});
});

//* on crée un nouveau level
const monLevel = new Level({name: "Extrême"});
/// qu'on va insérer dans la bdd
monLevel.insert((err, monLevel) => {
    /// avec monLevel en paramètre, on peut renvoyer quelque chose en se servant des infos du level qui vient d'être créé et inséré
    console.log(err);
    console.log(monLevel);
});

//* on met à jour un level
Level.getOne(3, (err, level) => {
    if(err){
        console.log(err);
    };

    // level est une instance de la classe Level, qui représente celui avec l'id 3
    // on change son nom
    level.name = "Expert";

    // et on le met à jour dans la bdd
    level.update((err, level) => {
        // level doit être à jour
        console.log(err);
        console.log(level);
    });
});

//* on supprime un level
Level.getOne(4, (err, level) => {
    level.delete((err, result) => {
        if(result){
            console.log("le level a bien été supprimé");
        }else{
            console.log("une erreur s'est produite lors de la suppression");
        };
    });
});