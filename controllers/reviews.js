const Review = require("../models/Reviews");
const Listing = require("../models/listing");

module.exports.CreateReview = async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Successfully created a new review!");

    res.redirect(`/listings/${req.params.id}`);

  }

  module.exports.DestoryReview = async (req, res) => {

    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId }
    });

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Successfully deleted a review!");

    res.redirect(`/listings/${id}`);

  }