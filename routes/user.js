const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/signin", (req, res) => {
  return res.render("signin", { user: req.user });
});

router.get("/signup", (req, res) => {
  return res.render("signup", { user: req.user });
});

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    if (!fullName || !email || !password) {
      return res.render("signup", {
        user: req.user,
        error: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.render("signup", {
        user: req.user,
        error: "Password must be at least 6 characters long"
      });
    }

    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/user/signin");
  } catch (error) {
    console.error("Signup error:", error);
    let errorMessage = "Error creating account";
    
    if (error.code === 11000) {
      errorMessage = "Email already exists";
    }
    
    return res.render("signup", {
      user: req.user,
      error: errorMessage
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.render("signin", {
        user: req.user,
        error: "Email and password are required"
      });
    }
    
    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    console.error("Signin error:", error);
    return res.render("signin", {
      user: req.user,
      error: "Incorrect Email or Password",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
});

module.exports = router;