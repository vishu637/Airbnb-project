const express = require("express");
const router = express.Router();

const Listing = require("../models/listing");
const wrapAsync = require("../util/warpAsync");

const { ListingSchema } = require("../util/schema");
const ExpressError = require("../util/ExpressError");

const { isLoggedIn, isOwner } = require("../middleware");
const ListingController = require("../controllers/listing");
//multer for the adding the funactionality of the enctype: multimedia
const multer  = require('multer');
const {storage} = require("../cloudCnfig.js");
const upload = multer({storage });

// ================= VALIDATION MIDDLEWARE =================

const validateListing = (req, res, next) => {
  const { error } = ListingSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  } else {
    next();
  }
};

// ================= INDEX ROUTE ================= & ================= CREATE ROUTE =================
router.route("/")
.get( wrapAsync(ListingController.index))
.post(
  isLoggedIn,
  validateListing,
  upload.single('listing[image]'),
  wrapAsync(ListingController.CreateRoute)
);
// ================= NEW ROUTE =================
router.get("/new", isLoggedIn, ListingController.showpage);


// ================= SHOW ROUTE ================= // ================= UPDATE ROUTE =================// ================= DELETE ROUTE =================
router.route("/:id")
.get(wrapAsync(ListingController.ShowRoute))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(ListingController.UpdateRoute)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.DeleteRoute)
);



// ================= EDIT ROUTE =================
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.EditRoute)
);

module.exports = router;
