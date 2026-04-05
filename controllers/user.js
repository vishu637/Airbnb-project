const User = require("../models/user.js");

// RENDER SIGNUP FORM
module.exports.renderSignupForm = (req, res) => {
  res.render("user/signup");
};

// RENDER LOGIN FORM
module.exports.renderLoginForm = (req, res) => {
  res.render("user/login");
};

// SIGNUP
module.exports.SignUp = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    console.log("User created:", registeredUser);

    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });

  } catch (e) {
    console.log("Signup Error:", e);
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// LOGIN
module.exports.LogIn = (req, res) => {
  req.flash("success", "Login successful!");
  res.redirect("/listings");
};

// LOGOUT
module.exports.LogOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);

    req.flash("success", "Logged out successfully");
    res.redirect("/listings");
  });
};