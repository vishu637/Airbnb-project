if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingsRouter = require("./router/listing.js");
const reviewRouter = require("./router/review.js");
const userRouter = require("./router/user.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;

// ================= DATABASE CONNECTION =================
async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// ================= APP CONFIG =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ================= SESSION STORE =================
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
  crypto: {
    secret: process.env.SESSION_SECRET || "mysupersecreting",
  },
});

store.on("error", (err) => {
  console.log("SESSION STORE ERROR:", err);
});

// ================= SESSION =================
const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET || "mysupersecreting",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ================= PASSPORT =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================= GLOBAL VARIABLES =================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// ================= ROUTES =================

// Root
app.get("/", (req, res) => {
  return res.redirect("/listings");
});

// 🔥 SEARCH ROUTE (FIXED)
app.get("/listings/search", async (req, res, next) => {
  try {
    let { country } = req.query;

    if (!country) {
      req.flash("error", "Enter a country");
      return res.redirect("/listings");
    }

    country = country.trim();

    const listings = await Listing.find({
      country: { $regex: country, $options: "i" },
    });

    if (listings.length === 0) {
      req.flash("error", "No listings found");
      return res.redirect("/listings");
    }

    return res.render("listings/index", { allListings: listings });

  } catch (err) {
    return next(err);
  }
});

// Routers
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  res.status(status).render("error", { err });
});

// ================= SERVER =================
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
