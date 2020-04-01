const { User } = require('../models/associations');
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const authController = {
    signupForm: (req, res, next) => {
        res.render("signup");
    },

    // par convention on nomme action une méthode qui découle d'une action de l'utilisateur
    signupAction: (req, res, next) => {
        //? 1. vérifier si tous les champs sont corrects (aucun champ vide, l'email est un email, password = passwordConfirm)
        let errors = []; // on prépare un tableau pour stocker toutes les erreurs éventuelles (et toute les afficher)

        if(!req.body.firstname){
            errors.push("Le prénom doit être renseigné");
        };

        if(!req.body.lastname){
            errors.push("Le nom doit être renseigné");
        };

        // pour l'email on va utiliser une autre technique
        // https://www.npmjs.com/package/email-validator
        if(!emailValidator.validate(req.body.email)){
            errors.push("L'email est invalide");
        };

        if(!req.body.password){
            errors.push("Veuillez entrer un mot de passe");
        };

        if(req.body.passwordConfirm !== req.body.password){
            errors.push("Veuillez confirmer votre mot de passe");
        };

        // si il y a au moins une erreur, on renvoie le tableau des erreurs
        if(errors.length){
            return res.render("signup", {errors});
        }

        //? 2. vérifier qu'il n'y a pas de doublon dans la bdd (via son email)
        User.findOne({
            where: {
                email: req.body.email
            },
        }).then(user => {
            if(user){
                // si on trouve un utilisateur avec cet email
                return res.render("signup", {errors: ["Un utilisateur existe déjà avec cet email"]});
            };

            //? 3. si tout va bien, on enregistre le nouvel utilisateur dans la bdd (et on hash son mot de passe)
            // https://www.npmjs.com/package/bcrypt
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);

            User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword,
            }).then(user => {
                //? 4. on redirige vers /login ou on log directement l'utilisateur et on redirige vers /
                res.redirect("/login");
            });
        }).catch(err => {
            console.trace(err);
            res.render("error", {err});
        });
    },

    loginForm: (req, res, next) => {
        res.render("login");
    },

    loginAction: (req, res, next) => {
        // 1. tenter de récupérer un user via son email
        User.findOne({
            where: {
                email: req.body.email
            },
        }).then(user => {
            if(!user){
                return res.render("login", {error: "Cet email n'existe pas"});
            };

            // 2. comparer le mdp fourni au hash stocké dans la bdd
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!validPassword){
                return res.render("login", {error: "Le mot de passe est incorrect"});
            };

            // 3. si tout va bien (email et mdp corrects)  on enregistre l'utilisateur dans la session
            req.session.user = user;

            // 4. enfin on redirige vers la page d'accueil
            res.redirect("/");
        }).catch(err => {
            console.trace(err);
            res.render("error", {err});
        });
    },

    logout: (req, res, next) => {
        delete req.session.user;
        res.redirect("/");
    },
};

module.exports = authController;