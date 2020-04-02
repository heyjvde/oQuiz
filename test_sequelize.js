// première chose : charger variables d'environnement
require('dotenv').config();


// Ensuite, on require les modèles qui nous interesse
const Level = require('./app/models/level');

// Et hop, c'est parti, on peut faire des requetes !
// NOTE : Sequelize utilise un concept de Promise (qu'on verra plus tard !!)
// Cela va occasioner un changement dans la syntaxe : on écrit plus le callback en une fois (err, result)
// on en écrit 2 !!! un pour "tout va bien" (dans .then() )
// et un autre pour les erreurs (dans .catch )
// Level.findAll().then( (results) => {
//   // ici, tout va bien, on a des résultats 
//   console.log(results);

// }).catch( err => {
//   // ici, traitement d'erreur
//   console.error(err);
// });

// Level.findByPk(2).then( level => {
//   //console.log(level);
//   level.presentation();


// });

// const monNouveauLevel = new Level({
//   name: "Très difficile",
//   status: 1
// });

// monNouveauLevel.save();

//const Question = require('./app/models/question');

// Question.findByPk(3, {
//   include: "possibleAnswers"
// }).then( myQuestion => {
//   //console.log(question);
//   console.log( myQuestion.question );

//   for(let answer of myQuestion.possibleAnswers) {
//     console.log( ' - '+answer.description);
//   }

// });

const { Quiz } = require('./app/models/associations');

Quiz.findByPk(1, {
  include: [
    "author",
    "tags",
    {association: "questions", include:"possibleAnswers"}
  ]
}).then( quiz => {
  console.log(quiz.title);
  for (let tag of quiz.tags) {
    console.log('TAG : ', tag.name);
  }
  console.log('écrit par :', quiz.author.getFullName() );

  for (let question of quiz.questions) {
    console.log('* ', question.question);
    for (let answer of question.possibleAnswers) {
      console.log( '  - ', answer.description);
    }
  }
});
