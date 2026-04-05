const express = require("express");
const router = express.Router({ mergeParams: true });

const ExpressError = require("../util/ExpressError");
const { ReviewSchema } = require("../util/schema");

const wrapAsync = require("../util/warpAsync");

const Listing = require("../models/listing");
const Review = require("../models/Reviews");
const ReviewControler = require("../controllers/reviews");

const { isLoggedIn, isReviewAuthor } = require("../middleware");


// ================= VALIDATION =================
const validateReview = (req, res, next) => {
  const { error } = ReviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }

  next();
};


// ================= CREATE REVIEW =================
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(ReviewControler.CreateReview)
);


// ================= DELETE REVIEW =================
router.delete(
  "/:reviewId",
  isReviewAuthor,
  wrapAsync(ReviewControler.DestroyReview)
);


module.exports = router;