const Joi = require("joi");
module.exports.ListingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    country: Joi.string().required(),
        catagory: Joi.string()
      .valid(
        "Trending",
        "Rooms",
        "Iconic Cities",
        "Catles",
        "Mountains",
        "Camping",
        "Farms",
        "Arctic",
        "Dome",
        "HouseBoat"
      )
      .required(),
    image: Joi.object({
      url: Joi.string().required(),
      filename: Joi.string().required()
    }).optional(),
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional()
  }).required()
});

// ================= REVIEW VALIDATION =================
module.exports.ReviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
