// le but de ce middleWare est de vérifier si un utilisateur est loggé (donc enregistré dans la session), et si c'est le cas le rendre disponible dans res.locals

const userMiddleware = (req, res, next) => {
    if(req.session.user){
        res.locals.user = req.session.user;
    };
    next();
};

module.exports = userMiddleware;