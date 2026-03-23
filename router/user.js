const express = require("express");
const User = require("../models/user");
const warpAsync = require("../util/warpAsync");
const router = express.Router();
const passport = require("passport");
const { saveredirectUrl } = require("../middleware");
const UserControler = require("../controlers/user");


router.route("/signup")
.get((req, res) =>{
    res.render("user/signup.ejs");
})
.post( warpAsync(UserControler.SignUp));



//to write the passport authentication for the login the already regestered user
router.route("/login")
.get((req,res) =>{
    res.render("user/login.ejs");
})
.post( saveredirectUrl, passport.authenticate("local",
{failureRedirect: "/login", failureFlash: true}), UserControler.LogIn);

express.Router
//post request for the login
router.get("/logout", UserControler.LogOut);

module.exports = router;