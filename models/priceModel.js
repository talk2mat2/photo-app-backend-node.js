const mongoose = require("mongoose");
const { stringify } = require("uuid");

const { Schema } = mongoose;
;

const PriceSchema = new Schema({
tag: {type:String, required: true, unique: true}   ,
price:{type:Number,default:500}
});


module.exports = mongoose.model("PriceSchema", PriceSchema);
