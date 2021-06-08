const mongoose = require("mongoose");

const { Schema } = mongoose;
const shortid = require("shortid");

const HomepageModel = new Schema({
  tag: { type: String, required: true, unique: true },
  fammilyImg: { type: String },
  productImg: { type: String },
  eventsImg: { type: String },
  portraitImg: { type: String },
  realestateImg: { type: String },
  graduationImg: { type: String },
  studioPrice: { type: String },
  weddingPrice: { type: String },
  personalPrice: { type: String },
  weddingPrice: { type: String },
  topPhotographers: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "photographerSchema",
  },
  latestWorks: [{ imgUrl: String }],
});
//if the confirm 4 payment, you remove yourself from the board
// handleSignup({email,password,fname,lname,mobile})

module.exports = mongoose.model("HomepageModel", HomepageModel);
