const Listing = require("./models/listing");
const Review = require("./models/Reviews");

// ================= LOGIN CHECK =================
module.exports.isLoggedIn = (req, res, next) => {

  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }

  next();
};


// ================= SAVE REDIRECT URL =================
module.exports.saveredirectUrl = (req, res, next) => {

  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
  }

  next();
};


// ================= LISTING OWNER CHECK =================
module.exports.isOwner = async (req, res, next) => {

  let { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  if (!listing.owner || !listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You do not have permission to edit this listing.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};


// ================= REVIEW AUTHOR CHECK =================
module.exports.isReviewAuthor = async (req, res, next) => {

  let { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author || !review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};