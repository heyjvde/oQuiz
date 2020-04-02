
// d'abord les variables d'env
require('dotenv').config();

// ensuite, je require directement les modèles qui m'interessent
const User = require('./app/models/user');
const Question = require('./app/models/question');

// trouver tous les users 
// User.getAll( (err, users) => {
//   console.log(err);
//   console.log(users);
// });

// Trouver la question dont l'id est 3
// Question.getOne(3,(err, question)=>{
//   console.log(err);
//   console.log(question);
// });

// User.findBy( { firstname: "Chuck", id:1},  (err, results) => {
//   console.log(err);
//   console.log(results);
// });

// Question.findBy( { quizzes_id: 4}, (err, results) => {
//   console.log(err);
//   console.log(results);  
// });


User.getOne(1, (err, user) => {
  user.status = 1;
  user.save();
});


const newUser = new User({
  firstname: "Simon",
  lastname:"Martin",
  email:"simon@oclock.io",
  password: 'azerty'
});

newUser.save();
