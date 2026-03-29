const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user");

// SIGNUP
router.post("/signup", userController.SignUp);

// LOGIN
router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  userController.LogIn
);

// LOGOUT
router.get("/logout", userController.LogOut);

module.exports = router;