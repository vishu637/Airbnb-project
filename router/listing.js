const express = require("express");
const router = express.Router();

const wrapAsync = require("../util/warpAsync");
const { ListingSchema } = require("../util/schema");
const ExpressError = require("../util/ExpressError");

const { isLoggedIn, isOwner } = require("../middleware");
const ListingController = require("../controllers/listing");

// multer
const multer = require("multer");
const { storage } = require("../cloudConfig"); // check file name
const upload = multer({ storage });

// ================= VALIDATION =================
const validateListing = (req, res, next) => {
  const { error } = ListingSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }
  next();
};

// ================= INDEX + CREATE =================
router.route("/")
  .get(wrapAsync(ListingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.create)
  );

// ================= NEW =================
router.get("/new", isLoggedIn, ListingController.renderNewForm);

// ================= SEARCH =================
router.get("/search", wrapAsync(ListingController.search));

// ================= SHOW + UPDATE + DELETE =================
router.route("/:id")
  .get(wrapAsync(ListingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.update)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(ListingController.destroy)
  );

// ================= EDIT =================
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditForm)
);

module.exports = router;