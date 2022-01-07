function authLoggedtMiddleware(req, res, next) {
  if (
    req.session.clientFound !== undefined ||
    req.session.profFound !== undefined
  ) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = authLoggedtMiddleware;
