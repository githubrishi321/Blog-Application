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
    } catch (err) {
      // Token is invalid or expired - silently fail and continue without user
      // This allows the request to proceed, but req.user will be undefined
      if (process.env.NODE_ENV === "development") {
        console.log("Token validation failed:", err.message);
      }
    }
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