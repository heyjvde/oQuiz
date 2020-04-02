// le but de ce middleWare est de vérifier si un utilisateur est loggé (donc enregistré dans la session), et si c'est le cas le rendre disponible dans res.locals

const { User } = require("../models/associations");

const userMiddleware = (req, res, next) => {
    if(req.session.user){
        // req.session.user est un objet basique et non une instance de User, on ne peut donc pas accéder aux méthodes de la classe User
        // on va donc créer un User qui contient les infos de la session
        res.locals.user = new User(req.session.user);
    };
    next();
};

module.exports = userMiddleware;