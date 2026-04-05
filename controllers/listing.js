const Listing = require("../models/listing");

// ================= INDEX =================
module.exports.index = async (req, res) => {
  const { category } = req.query;
  let filter = {};
  if (category) {
    filter.category = category;
  }
  const allListings = await Listing.find(filter);
  res.render("listings/index", { allListings });
};

// ================= NEW FORM =================
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

// ================= SEARCH =================
module.exports.search = async (req, res) => {
  const { country } = req.query;
  if (!country) {
    req.flash("error", "Please enter a country to search");
    return res.redirect("/listings");
  }
  const allListings = await Listing.find({ country: new RegExp(country, 'i') });
  res.render("listings/index", { allListings });
};

// ================= SHOW =================
module.exports.show = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate('owner')
    .populate({ path: 'reviews', populate: { path: 'author' } });

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

// ================= CREATE =================
module.exports.create = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }
  await newListing.save();

  req.flash("success", "Listing created!");
  res.redirect("/listings");
};

// ================= EDIT FORM =================
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/edit", { listing });
};

// ================= UPDATE =================
module.exports.update = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

// ================= DELETE =================
module.exports.destroy = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};