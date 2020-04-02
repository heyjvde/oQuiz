
const userConnectedMiddleware = (req, res, next) => {

  // l'utilisateur est-il connecté ?
  // Dit autrement : y a-t-il un user dans la session ?
  if ( ! req.session.user) {
    // sinon => redirige vers "/login"
    return res.redirect('/login');
  } else {
    // - si oui => passe à la suite
    next();
  }

};


module.exports = userConnectedMiddleware;