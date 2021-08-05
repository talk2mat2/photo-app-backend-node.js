const mongoose = require("mongoose");
const { stringify } = require("uuid");

const { Schema } = mongoose;
const PriceSchema = new Schema({
  tag: { type: String, required: true, unique: true },
  price: { type: Number, default: 80 },
  locationPrice: { type: Number, default: 40 },
});

module.exports = mongoose.model("PriceSchema", PriceSchema);
