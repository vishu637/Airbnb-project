const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Reviews.js");  // make sure filename matches exactly
const { required } = require("joi");

const listingSchema = new Schema({
  title: String,
  description: String,
image: {
  url: {
    type: String,
    default: "https://via.placeholder.com/300"
  },
  filename: {
    type: String,
    default: "default"
  },
},
  price: Number,
  location: String,
  latitude: Number,
 longitude: Number,
  country: String,

  catagory: {
    type : String,
    enum : ["Trending","Rooms","Iconic Cities",
      "Catles", "Mountains","Camping",
    "Farms","Arctic","Dome","HouseBoat",],
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"
  }
});

// ✅ CASCADE DELETE MIDDLEWARE
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews },
    });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;