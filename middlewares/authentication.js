const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (err) {}
    next();
  };
}

function isAuthenticated(req, res, next) {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  next();
}

module.exports = { checkForAuthenticationCookie, isAuthenticated };