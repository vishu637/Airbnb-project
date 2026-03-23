const Listing = require("../models/listing");

// ================= INDEX =================
module.exports.index = async (req, res, next) => {
  try {
    const { category } = req.query;

    let allListings;

    if (category) {
      allListings = await Listing.find({ category });
    } else {
      allListings = await Listing.find({});
    }

    return res.render("listings/index", { allListings });

  } catch (err) {
    return next(err);
  }
};

// ================= NEW PAGE =================
module.exports.showpage = (req, res) => {
  return res.render("listings/new");
};

// ================= CREATE =================
module.exports.CreateRoute = async (req, res, next) => {
  try {
    // 🔥 Prevent crash if no image
    if (!req.file) {
      req.flash("error", "Image is required");
      return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.image = { url, filename };

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "Successfully created a new listing!");

    return res.redirect(`/listings/${newListing._id}`);

  } catch (err) {
    return next(err);
  }
};

// ================= SHOW =================
module.exports.ShowRoute = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "The listing is not available!");
      return res.redirect("/listings");
    }

    return res.render("listings/show", { listing });

  } catch (err) {
    return next(err);
  }
};

// ================= EDIT =================
module.exports.EditRoute = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    return res.render("listings/edit", { listing });

  } catch (err) {
    return next(err);
  }
};

// ================= UPDATE =================
module.exports.UpdateRoute = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true }
    );

    if (!listing) {
      req.flash("error", "The listing is not available!");
      return res.redirect("/listings");
    }

    // ✅ Handle new image upload
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      await listing.save();
    }

    req.flash("success", "Listing updated successfully.");

    return res.redirect(`/listings/${id}`);

  } catch (err) {
    return next(err);
  }
};

// ================= DELETE =================
module.exports.DeleteRoute = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted.");

    return res.redirect("/listings");

  } catch (err) {
    return next(err);
  }
};