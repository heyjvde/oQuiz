// SoC : dans ce fichier on va tester notre dataMapper (et peut-être d'autres choses?) avant de se lancer dans l'implémentation du serveur express.

// pour commencer, je veux mes variables d'environnement
require('dotenv').config();

/** Rappels DataMapper */

// ensuite je veux mon dataMapper
// const dataMapper = require('./app/dataMapper');

// ça y est, je peux lancer une requete !
// dataMapper.getAllLevels( (error, levels) => {

//   console.log(error);

//   console.log(levels);
//   // for (let level of levels) {
//   //   level.presentation();
//   // }

// });

// dataMapper.getOneLevel(1, (err, level) => {
//   console.log( {err, level} );
// });



/** Active Record */

const Level = require('./app/models/level');

// // Méthodes de Lecture

// Level.getAll( (err, levels) => {
//   console.log( {err, levels});
// });

// Level.getOne(1, (err, level) => {
//   console.log( {err, level});
// });


// // Méthode de Creation

// // pour créer un level, je veux pouvoir faire ça :
// const monLevel = new Level( {name: "Méga dur"} );

// monLevel.insert( (err, monLevel) => {

//   console.log(err);
//   console.log(monLevel);
// }); // et c'est tout! cet appel doit insérer mon nouveau level dans la BDD !



// // Méthode de mise à jour
// Level.getOne( 5, (err, monlevel) => {
//   if (err) {
//     console.error(err);
//   };

//   // level est donc une instance de la classe Level, qui représente celui avec l'id 5

//   // changeons son nom
//   monlevel.name = "Méga ouffissime";

//   // je veux mettre à jour level dans la BDD...
//   monlevel.update( (err, monlevel) => {
//     // ...et ici, level devrait être à jour
//     console.error(err);

//     console.log(monlevel);

//   });

// });



// // Méthode de suppression
// Level.getOne(5, (err, monlevel) => {

//   monlevel.delete( (err, result) => {
//     if (result) {
//       console.log("le level a bien été supprimé !");
//     } else {
//       console.log("une erreur s'est produite lors de la suppression !");
//     }
//   });

// });

/** Deuxième tournée de test : le modèle User */
const User = require('./app/models/user');

// User.getAll( (err, users) => {
//   console.log(err);
//   console.log(users);
// });

// const gordon = new User({
//   email: "gordon@oclock.io",
//   password: "azerty123",
//   firstname: "Gordon",
//   lastname: "Zola"
// });

// gordon.insert( (err, gordon) => {
//   console.log(err);
//   console.log(gordon);
// });


// Exo rapide en autonomie. En utilisant les méthodes AR de User :
// - récupérer l'utilisateur Gordon (qu'on vient de créer) via on id
// - modifier son email => "gordon@zola.com"
// - sauvegarder le tout et afficher Gordon mis à jour
// - puis, finalement, le supprimer !

// User.getOne(4, (err, gordon) => { // récupérer gordon
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Gordon avant le changement : ", gordon);

//     gordon.email = "gordon@zola.com"; // changer l'email

//     gordon.update( (err, gordon) => { // sauvegarder le changement
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Gordon après le changement : ", gordon); // afficher gordon après mise à jour

//         gordon.delete( (err, success) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log("Gordon a été supprimé !");
//           }
//         });

//       }
//     });
//   }
// });


const Tag = require('./app/models/tag');

// Tag.getOne(1, (err, tag) => {
//   console.log(err);
//   console.log(tag);
// });

Tag.getAll( (err, tags) => {
  console.log(err);
  console.log(tags);
});