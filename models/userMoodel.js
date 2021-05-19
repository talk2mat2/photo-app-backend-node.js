const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const shortid = require("shortid");

const UserSchema = new Schema({
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  fname: { type: String },
  lname: { type: String },
  mobile: { type: String },
  wallet_transaction_id: { type: String },
  lng: { type: Number },
  lat: { type: Number },
  wallet: { type: Number, default: 0 },
  isAdmin: { type: Boolean },
  // favouriteShoots: String,
  profileImage: String,
  favouriteShoots: String,
  aboutMe: String,
});
//if the confirm 4 payment, you remove yourself from the board
// handleSignup({email,password,fname,lname,mobile})
UserSchema.methods.verifyPassword = async function (Password) {
  const match = await bcrypt.compare(Password, this.Password);

  if (match) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("Users", UserSchema);
