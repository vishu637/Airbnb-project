const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// connect database
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
}

main()
  .then(() => initDB())
  .catch((err) => console.log(err));

// initialize database
const initDB = async () => {

  await Listing.deleteMany({});

  const ownerId = new mongoose.Types.ObjectId("69ace9a2de4a565714ec29b2");

  const newData = initData.data.map((obj) => ({
    ...obj,
    owner: ownerId,
  }));

  await Listing.insertMany(newData);

  console.log("Data was initialized");
};