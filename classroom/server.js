const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
 const sessionOptions = {
     secret : "mysupersecreting" ,
     resave: false, 
     saveUninitialized: true
}

// set up session and flash before any routes or middleware that uses them
app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next) =>{
      res.locals.success = req.flash("success");
      res.locals.error = req.flash("error");
      next();

})

    // app.get("/reqcount",(req,res) =>{
    //     if(req.session.count){
    //         req.session.count++;
    //     }else{
    //         req.session.count = 1;
    //     }      
    //     res.send(`the request count is ${req.session.count}`);
    // });

    app.get("/register",(req,res) =>{
        let{name = "anonymous"} = req.query;
        req.session.name = name;
        if(name === "anonymous"){
            req.flash("error","something error is occured");
        }else{
             req.flash("success", "Registration successful!");
        }
       
        res.redirect("/hello");
    });
    app.get("/hello",(req,res) =>{
        res.render("page.ejs", {name : req.session.name } );
    });

app.get("/test", (req,res) =>{
    res.send("the test is sucessful");
})

app.listen(3000, () =>{
    console.log("the app is listning on the port");
})