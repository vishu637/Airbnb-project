const User = require("../models/user");

module.exports.SignUp = async(req,res) =>{
    try{

    let{username, email, password} = req.body;
    const newUser = new User({username, email});
    const registeredUser = await  User.register(newUser ,password);
    console.log(registeredUser);
    //to implement automatic login
    req.logIn(registeredUser,(err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "welcome to wanderlust");
        res.redirect("/listings");
    })

    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.LogIn =  async(req,res) =>{
    req.flash("success", "Login successful!!welcome to the wanderlust");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


module.exports.LogOut = (req,res,next) =>{
    req.logOut((err) => {
      return next(err);
    });
    req.flash("success","your are logedOut");
    res.redirect("/listings");
}