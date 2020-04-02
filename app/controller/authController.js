const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const { User } = require('../models');

const authController = {

  // Montrer le formulaire d'inscription
  showSignupForm: (req, res, next) => {
    res.render("signup");
  },

  // traiter le submit du formulaire d'inscription
  signupAction: (req, res, next) => {
    // console.log(req.body);
    // 1. vérifier si les champs sont corrects !
    // (tous les champs doivent être non vides, l'email doit être un email, password doit être égal à passwordConfirm)
    let errors = []; // on se prépare un tableau pour stocker TOUTES les erreurs éventuelles (et donc, les afficher toutes en même temps)
    if (!req.body.firstname) {
      errors.push('Le prénom doit être renseigné');
    }
    if (!req.body.lastname) {
      errors.push("Le nom de famille doit être renseigné");
    }
    if (!req.body.password) {
      errors.push("Le mot de passe doit être renseigné");
    }
    if( !emailValidator.validate(req.body.email) ) {
      errors.push("L'email doit être valide");
    }
    if (req.body.password != req.body.passwordConfirm) {
      errors.push("Le mot de passe doit être égal à la confirmation");
    }

    // On vérifie le nombre d'erreus !
    if (errors.length) {
      // et le petit "return" pour arrêter la fonction
      return res.render('signup', {errors});
    }

    // 2. Vérifier si un utilisateur similaire (via son email) existe déjà en bdd (si oui, on redirige avec une erreur)
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then( user => {

      if (user) {
        // si on a trouvé un utilisateur avec cet email
        // (return pour arrêter la fonction)
        return res.render('signup', {
          errors: ['Un utilisateur existe déjà avec cet email']
        });
      }

      // 3. si tout va bien, on enregistre le nouvel utilisateur en BDD (et on va hasher son mot de passe !)
      const hashedPassword = bcrypt.hashSync(req.body.password , 10);

      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
      }).then( user => {
        // console.log(user);
        // 4. soit on redirige vers /login
        res.redirect('/login');

        // 4alt. soit on log directement l'utilisateur et on redirige vers l'accueil
      });

    }).catch( err => {
      console.trace(err);
      res.render('error', {err});
    });
    
  },


  // montrer le formulaire de connexion
  showLoginForm: (req, res, next) => {
    res.render('login');
  },

  // traiter le submit du formulaire de connexion
  loginAction: (req, res, next) => {
    // 1. tenter de récupérer un User via email 
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then( user => {
      //  - si il n'existe pas => erreur
      if (!user) {
        return res.render('login', {
          error : "Cet email n'existe pas"
        });
      }

      // 2. comparer le mot de passe fournie au Hash stocké dans la BDD
      const validPassword = bcrypt.compareSync(req.body.password, user.password);
      //  - si c'est pas bon => erreur
      if (!validPassword) {
        return res.render('login', {
          error : "Le mot de passe n'est pas valide"
        });
      }

      // 3. si tout va bien (email et pwd correct) => on enregistre l'utilisateur dans la session
      req.session.user = user;

      // et pour finir, on redirige vers la page d'acceuil
      res.redirect('/');

    }).catch( err => {
      console.trace(err);
      res.render('error', {err});
    });

  },

  logout: (req, res, next) => {
    delete req.session.user;
    res.redirect('/');
  }

};

module.exports = authController;