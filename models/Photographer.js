const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;


const photographerSchema = new Schema({
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  fname:{type:String},
  lname:{type:String},
  mobile:{type:String},
  isPhotographer:{type:Boolean,default:true},
  lng:{type:Number},
  lat:{type:Number},
  locationName:{type:String},
  distance:{type:Number}

});
//if the confirm 4 payment, you remove yourself from the board
// handleSignup({email,password,fname,lname,mobile})
photographerSchema.methods.verifyPassword = async function (Password) {
  const match = await bcrypt.compare(Password, this.Password);

  if (match) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("photographerSchema", photographerSchema);
