// ici on va vérifier si l'utilisateur est connecté

const userConnectMiddleware = (req, res, next) => {
    if(!req.session.user){
        return res.redirect("/login");
    }else{
        next();
    };
};

module.exports = userConnectMiddleware