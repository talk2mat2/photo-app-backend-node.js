const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const shortid = require("shortid");
const PriceSchema= require('./priceModel')




const PhotoSession = new Schema({
  bookedById: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  photographerId: {type: mongoose.Schema.Types.ObjectId, ref: 'photographerSchema'},
  bookingDate: { type: Date, default: Date.now },
  completed:{type:Boolean, default: false},
timeStart:{ type: Date },
timeEnd:{ type: Date},
sessionDuration:{type:Number},
  accepted:{ type: Boolean, default: false },
  pricePerMinutes:{ type:Number}
});


module.exports = mongoose.model("PhotoSession", PhotoSession);
