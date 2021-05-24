const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const EditPhotoRequest = new Schema({
  Edited: { type: Boolean, default: false },
  jobcompleted: { type: Boolean, default: false },
  Request_Photos: [{ imgUri: String }],
  Edited_Photos: [{ imgUri: String }],
  photographerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "photographerSchema",
  },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  Date_submited: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EditPhotoRequest", EditPhotoRequest);
