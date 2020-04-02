// ici on va vérifier le rôle de l'utilisateur

const adminMiddleware = (req, res, next) => {
    if(req.session.user.role !== "admin"){
        // si l'utilisateur n'est pas admin, on renvoie une erreur "accès non autorisé"
        return res.status(403).render("error", {err: "Vous n'avez pas les droits nécessaires pour accéder à cette page"});
    }else{
        next();
    };
};

module.exports = adminMiddleware;