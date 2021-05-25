const mongoose = require("mongoose");

const { Schema } = mongoose;
const shortid = require("shortid");

const UserSchema = new Schema({
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
UserSchema.methods.verifyPassword = async function (Password) {
  const match = await bcrypt.compare(Password, this.Password);

  if (match) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("Users", UserSchema);
